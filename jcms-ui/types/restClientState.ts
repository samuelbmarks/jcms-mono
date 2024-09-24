export interface RestClientState {
    method: string;
    endpoint: string;
    segment: string;
    mediaType: string;
    requestBody: string;
    authType: string;
    bearerToken: string;
    basicAuthUsername: string; 
    basicAuthPassword: string;
    headers: { header: string; value: string }[];
    response: string;
};