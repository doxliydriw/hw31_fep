// Реалізувати електронний годинник із зображеннями для кожної цифри та оновлення в DOM лише тих елементів,
// значення для яких змінені - інші повинні залишитися недоторканими.
// const moment = require("moment/moment");

let day = document.getElementById("day");
let hour = document.getElementById("hour");
let minute = document.getElementById("minute");
let second = document.getElementById("second");

// Function for update of digits
function updateClock() {
    let date = moment(new Date());
    let d = date.format('dddd');
    let h = date.hour();
    let m = date.minutes();
    let s = date.second();

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    day.textContent = d;
    hour.textContent = h;
    minute.textContent = m;
    second.textContent = s;
}


setInterval(updateClock, 1000);
