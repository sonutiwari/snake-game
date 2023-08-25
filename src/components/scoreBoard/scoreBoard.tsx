import { useContext, useEffect, useState } from "react";
import GlobalContext from "../../context";
import { TRANSLATIONS } from "../../lang";

const HIGHEST_SCORE_STORAGE_KEY = 'highestScore';

const ScoreBoard = ({ score }: { score: number }) => {
    const [highestScore, setHighestScore] = useState<number>(0)
    const language = useContext(GlobalContext)
    const scoreboardTranslation = TRANSLATIONS[language].scoreboardPageTranslation
    useEffect(() => {
        const highestScore = Number.parseInt(localStorage.getItem(HIGHEST_SCORE_STORAGE_KEY) || '0')
        setHighestScore(highestScore)
        return () => {
            if (score > highestScore) {
                localStorage.setItem(HIGHEST_SCORE_STORAGE_KEY, score.toString());
            }
        }
    }, [score])
    return (
        <h2>{scoreboardTranslation.CURRENT_SCORE}: {score} | {scoreboardTranslation.HIGHEST_SCORE}: {Math.max(score, highestScore)}</h2>
    );
}

export default ScoreBoard;