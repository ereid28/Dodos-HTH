import React, { useCallback, useEffect } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
import "./Game.css";
import { useDispatch, useSelector } from 'react-redux';
import { incrementEcoScore } from './redux/slice';
import { RootState } from './redux/store';

const Game = () => {
    const ecoScore = useSelector((state: RootState) => state.layout.ecoScore);
    const dispatch = useDispatch();
    const { unityProvider, sendMessage, addEventListener, removeEventListener, isLoaded } = useUnityContext({
        loaderUrl: "build/build.loader.js",
        dataUrl: "build/build.data",
        frameworkUrl: "build/build.framework.js",
        codeUrl: "build/build.wasm",
    });

    const handleUpScore = useCallback(() => {
        dispatch(incrementEcoScore());
    }, [dispatch]);  // Add dispatch as a dependency

    const handleScoreChange = useCallback(async () => {
        const waitUntilLoaded = () =>
            new Promise<void>((resolve) => {
                const check = () => {
                    if (isLoaded) resolve();
                    else setTimeout(check, 10);
                };
                check();
            });
    
        await waitUntilLoaded();
        sendMessage("GameManager", "ChangeScore", ecoScore);
    }, [ecoScore, sendMessage, isLoaded]);

    useEffect(() => {
        handleScoreChange();
    }, [handleScoreChange]);

    useEffect(() => {
        addEventListener("SendScore", handleUpScore);
        return () => {
            removeEventListener("SendScore", handleUpScore);
        };
    }, [addEventListener, removeEventListener, handleUpScore]);

    return <Unity unityProvider={unityProvider} className="game"/>;
}

export default Game;