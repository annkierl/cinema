let displayThatManyDays = 6;
// let objectDate: Date = new Date();
// let todayDay = new Date();
export let dateMock = ['02/28/23', '03/01/23', '03/02/23', '03/03/23', '03/04/23', '03/05/23', '03/06/23'];
export let date: Date[] = [];
export let dateForAdmin: Date[] = [];
export function prepairCalendar() {
  let objectDate: Date = new Date();
  let todayDay = new Date();
  for (let i = 0; i <= displayThatManyDays; i++) {
    let nextday = new Date(todayDay.setDate(objectDate.getDate() + i));
    date.push(nextday);
  }
  return dateMock;
}

// export function prepairCalendarForAdmin() {
//   for (let i = 0; i <= displayThatManyDays; i++) {
//     let newObjDate: Date = new Date();
//     let nextday = new Date(todayDay.setDate(newObjDate.getDate() + i));
//     // console.log(new Date(todayDay.setDate(newObjDate.getDate() + )));
//     dateForAdmin.push(nextday);
//   }
//   dateForAdmin.shift();
//   return dateForAdmin;
// }
