"use strict";

class Clock {
  constructor() {
    setInterval(() => {
      this.theTime();
    }, 1000);
  }

  theTime() {
    let date = new Date(),
      hrsAmPm = addZero(
        date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
      ),
      hrs = addZero(date.getHours()),
      min = addZero(date.getMinutes()),
      sec = addZero(date.getSeconds()),
      ampm = hrs > 12 ? "PM" : "AM",
      msg = `${hrsAmPm}:${min}:${sec} ${ampm}`;

    function addZero(num) {
      return num < 10 ? "0" + num : num;
    }
    console.log(msg);
  }
}

module.exports = Clock;
