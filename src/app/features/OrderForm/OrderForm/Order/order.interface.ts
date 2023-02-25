import { Ticket } from 'src/app/features/tickets/tickets-initial';

export interface Order {
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userPhoneNumber: string;
  movieTitle: string;
  hall: number;
  hour: string;
  //   tickets:Ticket[]
}
export const initialOrder = {
  userFirstName: '',
  userLastName: '',
  userEmail: '',
  userPhoneNumber: '',
  movieTitle: '',
  hall: 0,
  hour: '',
};

export interface SingleOrder {
  id: number;
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userPhoneNumber: string;
  movieTitle: string;
  hall: number;
  hour: string;
  ticket: Ticket[];
}

export const initialSingleOrder = {
  id: 0,
  userFirstName: '',
  userLastName: '',
  userEmail: '',
  userPhoneNumber: '',
  movieTitle: '',
  hall: 0,
  hour: '',
  tickets: [],
};
