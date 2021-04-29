import { Rooms } from '../entity/room-entity';

export function createRoomEntityList(response: any): Rooms[]{
    return response.map((data: any) => createRoomEntity(data));
}

const timeFormat = /^([0-9]{2}:[0-9]{2}$)/gm;
const dateFormat = /([Z]$)/gm;

export function createRoomEntity(room: any): Rooms{
    return {
        id: room.id,
        name: room.name,
        date: new Date(room.date).toJSON().replace(dateFormat, ''),
        startHour: `${room.startHour}`.replace(timeFormat, '$1:00'),
        endHour: `${room.endHour}`.replace(timeFormat, '$1:00'),
        invited: room.invited.map((invite: any) =>
        ({
            id: invite.id,
            name: invite.name,
            email: invite.email
        })),
        private: false
    };
}
