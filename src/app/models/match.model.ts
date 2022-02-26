import { Score } from "./score.model";

export interface Match {
    awayTeam: {
        id: number,
        name: string
    },
    homeTeam: {
        id: number,
        name: string
    },
    score: Score,
    status: string,
    utcDate: string
}