import React, { useCallback, useEffect } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
import "./Game.css";
import { useDispatch, useSelector } from 'react-redux';
import { setEcoScore } from './redux/slice';
import { RootState } from './redux/store';
import { ReactUnityEventParameter } from 'react-unity-webgl/distribution/types/react-unity-event-parameters';

const Game = () => {
    const ecoScore = useSelector((state: RootState) => state.layout.ecoScore);
    const dispatch = useDispatch();
    const { unityProvider, sendMessage, addEventListener, removeEventListener, isLoaded } = useUnityContext({
        loaderUrl: "build/build.loader.js",
        dataUrl: "build/build.data",
        frameworkUrl: "build/build.framework.js",
        codeUrl: "build/build.wasm",
    });

    const handleSetScore = useCallback((score: ReactUnityEventParameter[]) => {
        const firstParam = score[0]; // or find the correct index/key you're expecting
        const value = firstParam;

        const numericScore = typeof value === 'number' ? value : Number(value);

        if (!isNaN(numericScore)) {
            dispatch(setEcoScore(numericScore));
        } else {
            console.warn('Received non-numeric value:', value);
        }
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
        sendMessage("GameManager", "SendScore", ecoScore);
    }, [ecoScore, sendMessage, isLoaded]);

    useEffect(() => {
        handleScoreChange();
    }, [handleScoreChange]);

    useEffect(() => {
        addEventListener("SendScore", handleSetScore);
        return () => {
            removeEventListener("SendScore", handleSetScore);
        };
    }, [addEventListener, removeEventListener, handleSetScore]);

    return <Unity unityProvider={unityProvider} className="game"/>;
}

export default Game;