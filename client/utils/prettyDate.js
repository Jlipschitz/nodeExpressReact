// adds slashes to date
export default {
  prettyDate(input) {
    let tempDate = new Date(input);
    return tempDate.getMonth() + 1 + '/' + tempDate.getDate() + '/' + tempDate.getFullYear().toString().slice(2);
  },
  prettyTime(input) {
    let tempDate = new Date(input);
    let hours = tempDate.getHours() < 10 ?  '0' + tempDate.getHours()  : tempDate.getHours();
    let minutes = tempDate.getMinutes() < 10 ? '0' + tempDate.getMinutes() : tempDate.getMinutes();

    return hours + ':' + minutes;
  }
}