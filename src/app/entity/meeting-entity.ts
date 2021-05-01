import { Guest } from './invite-entity';

export interface Meeting {
    id: string | undefined;
    name: string;
    date: string;
    startHour: string;
    endHour: string;
    guests: Guest[];
    private: boolean;
    status: string;
}
