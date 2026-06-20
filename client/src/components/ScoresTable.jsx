import { useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import { getBestScores } from "../api/scores"
import "../styles/ScoresTable.css"

/**
 * Component that shows the ranking
 * of the players with the respective best scores
 * @param {*} props 
 * @returns The scores table
 */
function ScoresTable(props) {
    const [bestScores, setbestScores] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => { getBestScores().then(res => {setbestScores(res)}).finally(() => {setIsLoading(false)}) }, [])

    if (isLoading) {
        return <div className="scores-table-state">Loading leaderboard...</div>
    }

    return (
        <>
            <Table className="scores-table" borderless hover>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Player</th>
                        <th className="scores-table-score-header">Best score</th>
                    </tr>
                </thead>

                <tbody>
                    {bestScores.map((s) => (
                        <ScoreRow key={s.ranking_position} position={s.ranking_position} username={s.username} bestScore={s.best_score}/>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

function ScoreRow(props) {
    return (
        <tr className={`score-row score-row-${props.position}`}>
            <td className="score-position">{props.position}</td>
            <td className="score-username">{props.username}</td>
            <td className="score-best-score">{props.bestScore}</td>
        </tr>
    )
}

export default ScoresTable