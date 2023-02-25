let displayThatManyDays = 6;
let objectDate: Date = new Date();
let todayDay = new Date();
export let date: Date[] = [];
export let dateForAdmin: Date[] = [];
export function prepairCalendar() {
  for (let i = 0; i <= displayThatManyDays; i++) {
    let nextday = new Date(todayDay.setDate(objectDate.getDate() + i));
    date.push(nextday);
  }
  return date;
}

export function prepairCalendarForAdmin() {
  for (let i = 0; i <= displayThatManyDays; i++) {
    let nextday = new Date(todayDay.setDate(objectDate.getDate() + i));
    dateForAdmin.push(nextday);
  }
  dateForAdmin.shift();
  return dateForAdmin;
}
