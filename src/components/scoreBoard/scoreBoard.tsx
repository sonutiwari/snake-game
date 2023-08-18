import { useEffect, useState } from "react";

const ScoreBoard = ({ score }: { score: number }) => {
    const [highestScore, setHighestScore] = useState<number>(0)
    useEffect(() => {
        const highestScore = Number.parseInt(localStorage.getItem('highestScore') || '0')
        setHighestScore(highestScore)
        return () => {
            if (score > highestScore) {
                localStorage.setItem('highestScore', score.toString());
            }
        }
    }, [score])
    return (
        <h2>Current Score: {score} | Highest Score: {Math.max(score, highestScore)}</h2>
    );
}

export default ScoreBoard;