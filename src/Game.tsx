import React, { useEffect } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
import "./Game.css";

const Game = () => {
    const { unityProvider } = useUnityContext({
        loaderUrl: "build/build.loader.js",
        dataUrl: "build/build.data",
        frameworkUrl: "build/build.framework.js",
        codeUrl: "build/build.wasm",
    });

    useEffect(() => {console.log("hello")}, []);

    return <Unity unityProvider={unityProvider} className="game"/>;
}

export default Game;