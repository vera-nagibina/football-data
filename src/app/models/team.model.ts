import { Area } from "./area.model";

export interface Team {
    address: string,
    area: Area,
    clubColors: string,
    crestUrl: string,
    email: string,
    founded: number,    
    id: number,
    lastUpdated: string,
    name: string,
    phone: string,    
    shortName: string,
    tla: string,
    venue: string,
    website: string  
}