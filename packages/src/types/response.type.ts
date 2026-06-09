export type CommonSuccessResponse = {
    message : string;
    status :  string;
    correlation_id: string;
    data : any;
};

export type CommonFailedResponse = {
    message : string;
    status :  string;
    correlation_id: string;
    error : any;
};