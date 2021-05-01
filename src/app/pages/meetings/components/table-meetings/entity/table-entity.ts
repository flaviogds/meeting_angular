export interface TableModel {
    id: string;
    status: string;
    name: string;
    date: string;
    startHour: string;
    endHour: string;
    guests: string;
    list: () => string[];
}
