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

    const handleSetScore = useCallback((...parameters: ReactUnityEventParameter[]) => {
        const firstParam = parameters[0];
        const value = firstParam;

        const numericScore = typeof value === 'number' ? value : Number(value);

        if (!isNaN(numericScore)) {
            dispatch(setEcoScore(numericScore));
        } else {
            console.warn('Received non-numeric value:', value);
        }
    }, [dispatch]);

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
        sendMessage("GameManager", "UnitySetScore", ecoScore);
    }, [ecoScore, sendMessage, isLoaded]);

    // every time ecoscore is updated in react, mirror it in unity
    useEffect(() => {
        handleScoreChange();
    }, [handleScoreChange]);

    // set ecoScore to the score received from unity
    useEffect(() => {
        addEventListener("SendScoreToReact", handleSetScore);
        return () => {
            removeEventListener("SendScoreToReact", handleSetScore);
        };
    }, [addEventListener, removeEventListener, handleSetScore]);

    return <Unity unityProvider={unityProvider} className="game"/>;
}

export default Game;