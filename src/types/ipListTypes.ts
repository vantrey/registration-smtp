/*export interface IIpData {
  ip: string;
  action: {
    [Key: string]: {
      //endpoint
      attemptCount: number;
      requestDate: Date;
      bannedData: Date | null;
    };
  };
}*/

export interface IIpData {
  ip: string;
  endpoint: string;
  relativeAttemptCount: number;
  requestDate: Date;
  bannedDate: Date | null;
}

export interface IUpdateIpData {
  ip: string;
  endpoint: string;
}
