import { Player } from './players';
export interface Team {
    name?: string;
    description?: string;
    id?: string;
    logo?: string;
    league?: string;
    players?: Player[];
}