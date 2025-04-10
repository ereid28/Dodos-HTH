import React, { useCallback, useEffect } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
import "./Game.css";
import { useDispatch } from 'react-redux';
import { incrementEcoScore } from './redux/slice';

const Game = () => {
    const dispatch = useDispatch();
    const { unityProvider, addEventListener, removeEventListener } = useUnityContext({
        loaderUrl: "build/build.loader.js",
        dataUrl: "build/build.data",
        frameworkUrl: "build/build.framework.js",
        codeUrl: "build/build.wasm",
    });

    const handleUpScore = useCallback(() => {
        dispatch(incrementEcoScore());
    }, [dispatch]);  // Add dispatch as a dependency

    useEffect(() => {
        addEventListener("SendScore", handleUpScore);
        return () => {
            removeEventListener("SendScore", handleUpScore);
        };
    }, [addEventListener, removeEventListener, handleUpScore]);

    return <Unity unityProvider={unityProvider} className="game"/>;
}

export default Game;