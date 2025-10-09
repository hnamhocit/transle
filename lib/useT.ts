import { useMemo } from "react";
import { useI18nStore } from "./store.ts";

interface TranslateOptions {
  format?: (key: string, value: string) => string;
}

export function useT() {
  const lang = useI18nStore((s) => s.lang);
  const flat = useI18nStore((s) => s.flattenTranslations);
  const getLangs = useI18nStore((s) => s.getLangs);
  const langs = useMemo(() => getLangs(), [getLangs]);

  // --- plural ---
  const parsePlural = (text: string, count: number) => {
    const pluralMatch = text.match(/\{count,\s*plural,\s*(.+)\}/);
    if (!pluralMatch) return text;
    const rules = pluralMatch[1];
    const oneMatch = rules.match(/one\s*\{([^}]+)\}/);
    const otherMatch = rules.match(/other\s*\{([^}]+)\}/);
    const selected =
      count === 1
        ? oneMatch?.[1]?.replace("#", String(count))
        : otherMatch?.[1]?.replace("#", String(count));
    return selected || text;
  };

  // --- truy cập biến lồng nhau ---
  const deepGet = (obj: any, path: string): any => {
    const parts = path.split(".");
    let value = obj;
    for (const p of parts) {
      if (value && typeof value === "object" && p in value) value = value[p];
      else return undefined;
    }
    return value;
  };

  // --- tìm key gần đúng nhất (Levenshtein distance đơn giản) ---
  const closestMatch = (word: string, keys: string[]): string | null => {
    let min = Infinity;
    let best: string | null = null;
    for (const k of keys) {
      const dist = levenshtein(word, k);
      if (dist < min) {
        min = dist;
        best = k;
      }
    }
    return min <= 2 ? best : null;
  };

  // --- thuật toán Levenshtein ---
  const levenshtein = (a: string, b: string) => {
    const dp = Array.from({ length: a.length + 1 }, () =>
      Array(b.length + 1).fill(0),
    );
    for (let i = 0; i <= a.length; i++) dp[i][0] = i;
    for (let j = 0; j <= b.length; j++) dp[0][j] = j;
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        dp[i][j] =
          a[i - 1] === b[j - 1]
            ? dp[i - 1][j - 1]
            : Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1;
      }
    }
    return dp[a.length][b.length];
  };

  // --- kiểm tra missing key ở các ngôn ngữ khác ---
  const checkMissingInOtherLangs = (key: string) => {
    const missing: string[] = [];
    for (const l of langs) {
      if (!flat[`${l}.${key}`]) missing.push(l);
    }
    return missing.length > 0 ? missing : null;
  };

  // --- hàm chính ---
  return (
    key: string,
    vars?: Record<string, any>,
    options?: TranslateOptions,
  ): string => {
    const fullKey = `${lang}.${key}`;
    let text = flat[fullKey] || flat[key];

    // Kiểm tra key không tồn tại
    if (!text) {
      const missing = checkMissingInOtherLangs(key);
      if (missing)
        return `Key "${key}" missing in ${missing.join(", ")} languages.`;
      return `Missing translation for "${key}".`;
    }

    // --- xử lý plural ---
    if (vars?.count !== undefined) {
      text = parsePlural(text, Number(vars.count));
    }

    // --- xử lý nội suy ---
    if (vars) {
      text = text.replace(/\{([^}]+)\}/g, (_match, name) => {
        const keyPath = name.trim();
        const value = deepGet(vars, keyPath);
        if (value !== undefined) {
          let val = String(value);
          if (options?.format) val = options.format(keyPath, val);
          return val;
        } else {
          const hint = closestMatch(keyPath, Object.keys(vars));
          return `Missing "{${keyPath}}"${
            hint ? ` — Did you mean "{${hint}}"?` : "!"
          }`;
        }
      });
    }

    return text;
  };
}
