import { useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import { getBestScores } from "../api/scores"

/**
 * Component that shows the ranking
 * of the players with the respective best scores
 * @param {*} props 
 * @returns The scores table
 */
function ScoresTable(props) {
    const [bestScores, setbestScores] = useState([])
    useEffect(() => { getBestScores().then(res => {setbestScores(res)}) }, [])

    return (
        <>
            <Table>
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
        <tr>
            <td>{props.position}</td>
            <td>{props.username}</td>
            <td>{props.bestScore}</td>
        </tr>
    )
}

export default ScoresTable