import {useI18nStore} from "../../../../lib/main";

import {useMemo, useState} from "react";
import {AnimatePresence, motion} from 'motion/react'
import clsx from "clsx";
import langmap from "langmap";
import {ChevronDown} from "lucide-react";

function langToCountry(lang: string) {
    try {
        const locale = new Intl.Locale(lang);
        if (locale.region) return locale.region;

        const fallback: Record<string, string> = {
            en: "US",
            fr: "FR",
            vi: "VN",
            ja: "JP",
            zh: "CN",
            ko: "KR",
            de: "DE",
            es: "ES",
            it: "IT"
        };
        return fallback[locale.language.toLowerCase()] || "US";
    } catch {
        return "US";
    }
}

export default function LanguageSelector() {
    const {lang, setLang, getLangs} = useI18nStore();
    const [isOpen, setIsOpen] = useState(false);

    const toggleIsOpen = () => setIsOpen(!isOpen);
    const langs = useMemo(() => getLangs(), [getLangs]);

    return (
        <div className="relative">
            <motion.button whileTap={{scale: 0.95}} whileHover={{
                scale: 1.05
            }} onClick={toggleIsOpen} className="flex items-center gap-3 py-2 px-3 rounded-md bg-white shadow">
                <img width={24} height={20} src={`https://flagsapi.com/${langToCountry(lang)}/flat/64.png`}/>

                <div>
                    {lang}
                </div>

                <ChevronDown className={clsx("transition-all", isOpen && "rotate-180")}/>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div animate={{
                        y: 12,
                        opacity: 1
                    }} exit={{
                        y: -12,
                        opacity: 0
                    }} className="absolute top-full bg-white right-0 w-64 p-4 min-h-40 rounded-2xl shadow-2xl">
                        {langs.map(l => <div onClick={() => setLang(l)} key={l}
                                             className={clsx("cursor-pointer flex items-center gap-3 py-2 px-3 rounded-md transition-all", l === lang && 'font-bold text-white bg-neutral-900')}>
                            <img width={24} height={20} src={`https://flagsapi.com/${langToCountry(l)}/flat/64.png`}/>

                            <div>
                                {langmap[l].nativeName}
                            </div>
                        </div>)}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
