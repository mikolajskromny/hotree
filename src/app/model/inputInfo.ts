export interface InputInfo {
    title: string;
    description: string;
    category_id?: number;
    paid_event: boolean;
    event_fee?: number;
    reward?: number;
    date: string; // format: YYYY-MM-DDTHH:mm (example: 2018-01-19T15:15)
    duration?: number; // in seconds
    coordinator: {
        email?: string;
        id: string;
    };
}
