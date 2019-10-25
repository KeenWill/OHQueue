export interface Question {
    id?: string;
    uid: string;
    uName: string;
    queueId: string;
    title: string;  
    desc: string;
    timestamp: number;
    served: boolean;
    servedTime?: number;
    taAnswererUid?: string;
}