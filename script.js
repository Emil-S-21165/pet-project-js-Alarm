const content = document.querySelector('.content'),
      selectMenu = document.querySelectorAll('select'),
      currentTime = document.querySelector('h1'),
      setAlarmBtn = document.querySelector('button');

let alarmTime, 
    isAlarmSet,
    ringtone = new Audio("./files/ring.mp3");

for (let i = 12; i > 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
    let amPm = i == 1 ? 'AM' : 'PM';
    let option = `<option value="${amPm}">${amPm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
    let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    amPm = 'AM';

    if (h >= 12) {
        h = h - 12;
        amPm = 'PM';
    }

    h = h == 0 ? h = 12: h;

    h = h < 10 ? '0' + h: h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;

    currentTime.innerText = `${h}:${m}:${s} ${amPm}`;

    if (alarmTime === `${h}:${m} ${amPm}`) {
        ringtone.play();
        ringtone.loop = true;
    }

});

function setAlarm() {
    if (isAlarmSet) {
        alarmTime = '';
        ringtone.pause();
        content.classList.remove('disable');
        setAlarmBtn.innerText = 'Set alarm';
        return isAlarmSet = false;
    }

    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;

    if (time.includes('Hour') || time.includes('Minute') || time.includes('AM/PM')) {
        return alert('Please select correct time');
    }
    isAlarmSet = true;
    alarmTime = time;
    content.classList.add('disable');
    setAlarmBtn.innerText = 'Clear alarm';
}

setAlarmBtn.addEventListener('click', setAlarm);