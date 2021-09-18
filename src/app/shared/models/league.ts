import { Team } from 'src/app/shared/models/teams';
export interface League {
    id?: string;
    name?: string;
    image?: string;
    teams?: Team[];
}