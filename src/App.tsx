import {useI18nStore, useT} from "../lib/main";
import CodeBlock from "./components/CodeBlock";
import {CopyIcon} from 'lucide-react'
import {Button} from 'antd'
import Header from "./components/Header";

import vi from '../public/locales/vi.json'
import en from '../public/locales/en.json'
import fr from '../public/locales/fr.json'

const App = () => {
    const {translations, flattenTranslations} = useI18nStore()
    const t = useT();

    return (

        <div className="min-h-screen w-full relative">
            <Header/>

            <div
                className="absolute inset-0 -z-10"
                style={{
                    background: `
         radial-gradient(ellipse 80% 60% at 5% 40%, rgba(175, 109, 255, 0.48), transparent 67%),
        radial-gradient(ellipse 70% 60% at 45% 45%, rgba(255, 100, 180, 0.41), transparent 67%),
        radial-gradient(ellipse 62% 52% at 83% 76%, rgba(255, 235, 170, 0.44), transparent 63%),
        radial-gradient(ellipse 60% 48% at 75% 20%, rgba(120, 190, 255, 0.36), transparent 66%),
        linear-gradient(45deg, #f7eaff 0%, #fde2ea 100%)
      `,
                }}
            />

            <div className="py-12 min-h-[calc(100vh-80px)] container mx-auto px-4 flex flex-col gap-12">
                <div className="text-center flex flex-col items-center gap-4">
                    <div className="text-5xl font-bold">TRANSLE</div>

                    <div className="font-semibold text-2xl">
                        {t("hero.slogan")}
                    </div>

                    <div className="flex items-center w-fit gap-3 py-2 px-3 rounded-xl bg-neutral-900 text-white">
                        <div className="google-sans-code">
                            npm i transle
                        </div>

                        <Button color="primary" shape="circle" icon={
                            <CopyIcon size={18}/>
                        }/>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="text-2xl font-bold">
                        1. {t("guide.create")}
                    </div>

                    <div className="google-sans-code flex items-center gap-3">
                        <div className="bg-white p-2 rounded-md">
                            en.json
                        </div>
                        <div className="bg-white p-2 rounded-md">vi.json</div>
                        <div className="bg-white p-2 rounded-md">fr.json</div>
                    </div>

                    <div className="flex items-center gap-3">
                        <CodeBlock value={en}/>
                        <CodeBlock value={vi}/>
                        <CodeBlock value={fr}/>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="text-2xl font-semibold">
                        2. {t("guide.step2")}
                    </div>

                    <img src="/demo.png" alt="Demo code"/>

                    <div>As you can see, this is flatten translations progress to make it easier to use</div>

                    <div className="flex gap-3">
                        <CodeBlock value={translations}/>

                        <CodeBlock value={flattenTranslations}/>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="text-2xl font-semibold">3. {t("guide.enjoy")} 😍</div>

                    <div className="google-sans-code">{'import {useT, useI18nStore} from "transle"'}</div>

                    <div className="flex flex-col gap-3 google-sans-code">
                        <div className="font-medium underline">useI18nStore</div>

                        <div className="flex flex-col gap-1 pl-6">
                            <div>lang: string</div>
                            <div>setLang: (lang: string) ={'>'} void</div>
                            <div>getLangs: () ={'>'} string[]</div>
                            <div>translations</div>
                            <div>flattenTranslations</div>
                        </div>

                        <div className="font-medium underline">useT</div>

                        <div className="flex flex-col gap-1 pl-6">
                            <div>
                                const t = useT()
                            </div>

                            <div>{'<div>'}{'{'}t("header.welcome"){'}'}{'</div>'}</div>
                        </div>
                    </div>
                </div>

                <div className="text-center text-lg max-w-2xl text-neutral-700 mx-auto leading-relaxed">
                    {t("footer.intro")}
                </div>
            </div>
        </div>

    );
};

export default App;