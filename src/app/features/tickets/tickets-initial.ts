export interface Ticket {
  row: number;
  column: number;
  colIndexPrintOnScreen: number;
  type: string;
  value: number;
}
export interface Seat {
  colIndexPrintOnScreen: number;
  col: number;
  row: number;
}

export const InitialTicket = {
  row: 0,
  column: 0,
  colIndexPrintOnScreen: 0,
  type: 'Normalny',
  value: 30,
};
