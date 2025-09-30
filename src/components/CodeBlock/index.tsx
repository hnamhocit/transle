import type {FC} from "react";
import JsonView from '@uiw/react-json-view';
import {githubDarkTheme} from '@uiw/react-json-view/githubDark';

interface CodeBlockProps {
    value: object;
}

const CodeBlock: FC<CodeBlockProps> = ({value}) => {
    return (
        <JsonView value={value} style={githubDarkTheme}/>
    );
};

export default CodeBlock;