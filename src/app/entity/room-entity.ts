import { Invite } from './invite-entity';

export interface Rooms {
    id: string | undefined;
    name: string;
    date: string;
    startHour: string;
    endHour: string;
    invited: Invite[];
    private: boolean;
}
