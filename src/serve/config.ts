export const StatusCheckURL = '/__codedoc_dev_status';
export const StatusBuildingResponse = 'BUILDING';
export const StatusReadyResponse = 'READY';
export const StatusErrorResponse = 'ERROR';
export type Status = typeof StatusBuildingResponse | 
                     typeof StatusReadyResponse |
                     typeof StatusErrorResponse;