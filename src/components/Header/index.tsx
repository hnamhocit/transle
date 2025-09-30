import LanguageSelector from "./LanguageSelector";
import {useT} from "../../../lib/main";

const Header = () => {
    const t = useT()

    return (
        <div className="sticky left-0 top-0 pt-4 px-4 w-full h-20 z-20">
            <div
                className="container mx-auto px-4 h-full flex items-center shadow bg-white rounded-2xl justify-between">
                <div className="flex items-center gap-3">
                    <img src="/logo.png" alt="Logo" width={40} height={40}/>
                    <div className="hidden sm:block">{t("header.welcome")}</div>
                </div>

                <div className="flex items-center gap-3">

                    <a className="select-none" href="https://www.facebook.com/hnamhocit" target="_blank"
                       rel="noopener noreferrer">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/500px-Facebook_Logo_%282019%29.png"
                            alt="Facebook" width={28} height={28}/>
                    </a>

                    <a className="select-none" href="https://github.com/hnamhocit" target="_blank"
                       rel="noopener noreferrer">
                        <img
                            className="object-cover object-center rounded-full"
                            src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"
                            alt="Facebook" width={32} height={32}/>
                    </a>

                    <LanguageSelector/>
                </div>
            </div>
        </div>
    );
};

export default Header;