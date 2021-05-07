import { Meeting } from '../entity/meeting-entity';

export function createMeetingEntityList(response: any): Meeting[]{
    return response.map((data: any) => createMeetingEntity(data));
}

const timeFormat = /^([0-9]{2}:[0-9]{2}$)/gm;
const dateFormat = /T.*Z$/gm;

export function createMeetingEntity(meeting: any): Meeting{
    return {
        id: meeting.id,
        name: meeting.name,
        date: `${meeting.date}`.replace(dateFormat, ''),
        startHour: `${meeting.startHour}`.replace(timeFormat, '$1:00'),
        endHour: `${meeting.endHour}`.replace(timeFormat, '$1:00'),
        guests: meeting.guests.map((guest: any) => ({ ...guest })),
        status: meeting.status,
        private: false
    };
}
