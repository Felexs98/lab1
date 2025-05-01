export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  createdBy: string;
}

export interface Participant {
  id: string;
  username: string;
  email: string;
}
