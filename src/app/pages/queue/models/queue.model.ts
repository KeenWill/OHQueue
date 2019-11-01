export interface Queue {
    id?: string;
    isOpen: boolean;
    name: string;
    desc: string;
    allowGrouping: boolean;
    containsUserQuestion?: boolean;
}
