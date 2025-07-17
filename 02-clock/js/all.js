const hour = document.querySelector('.hour');
const minute = document.querySelector('.minute');
const second = document.querySelector('.second');


setInterval(() => {
    const seconds = new Date().getSeconds();
    const minutes = new Date().getMinutes();
    const hours = new Date().getHours() < 12 ? new Date().getHours() : new Date().getHours() - 12;
    
    const todayTotalSeconds = seconds + minutes*60 + hours*3600;

    const hourDeg = todayTotalSeconds * (360 / 43200);
    const minuteDeg = todayTotalSeconds * (360 / 3600);
    const secondDeg = todayTotalSeconds * (360 / 60);
    
    
    hour.style.transform = `rotate(${hourDeg - 90}deg)`;
    minute.style.transform = `rotate(${minuteDeg - 90}deg)`;
    second.style.transform = `rotate(${secondDeg - 90}deg)`;    
}, 10)

// 12 = 60 * 60 * 12 = 43200秒
// 一秒，時針轉動 360 / 43200 = 0.008333333333333333度
// 一秒，分針轉動 360 / 3600 = 
// 一秒，秒針轉動 360 / 60 = 
// 現在秒數 + 現在分鐘 * 60 + 現在時間 * 3600 = 度過的總秒數 * 0.008333333333333333









// console.log(hourDeg);

// console.log(today.getSeconds() + today.getMinutes() * 60 + today.getHours() * 3600);
