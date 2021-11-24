export interface Record {
  date: Date;
  status: 'OKAY' | 'DOWN';
}

export interface iMonitor {
  _id: string;
  userId: string;
  name: string;
  url: string;
  message: string;
  records: [Record];
}
