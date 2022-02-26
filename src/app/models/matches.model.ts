import { Competition } from "./competition.model";
import { Match } from "./match.model";

export interface Matches {
    competition?: Competition,
    matches: Match[]
}