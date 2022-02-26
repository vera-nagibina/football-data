import { Area } from "./area.model";
import { Season } from "./season.model";

export interface Competition {
    id: number,
    area: Area,
    name: string,
    code: string,
    plan?: string,
    currentSeason?: Season,
    seasons?: Season[],
    lastUpdated?: string  
}