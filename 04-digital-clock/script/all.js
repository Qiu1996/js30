const data = {
    // 今天
    today: null,
    // 日期顯示格式
    lang: 'en-US',
    dateFormat: {
        year: 'numeric',
        month: 'long',  // 在 month: 'long' 的設置下，會顯示 年月日
        day: '2-digit',
        style: 'short',
        timeZoneName: 'short',
    },
    hourFormat: {
        hour: 'numeric',
        hourCycle: 'h23',
    },
    minuteFormat: {
        minute: '2-digit',
    },
    secundFormat: {
        second: '2-digit',
    },
    ampm: 'AM',
    
    init(){  
        this.today = new Date();
        this.showDate();
        this.showTime();
        data.showAMPM();
    },
    // 日期時間格式化處理
    format(d){
        return new Intl.DateTimeFormat(this.lang, d).format(this.today);
    },
    // 顯示日期
    showDate(){
        const TODAY_P = document.querySelector('.today p');
        const DATE = this.format(this.dateFormat);
        TODAY_P.innerText = DATE;
    },
    // 顯示時間
    showTime(){
        const HOUR = this.format(this.hourFormat);
        const MINUTE = this.format(this.minuteFormat);
        const SECOND = this.format(this.secundFormat);
        document.querySelector('.hour p').innerText = HOUR;
        document.querySelector('.minute p').innerText = MINUTE;
        document.querySelector('.second p').innerText = SECOND;
    },
    // AMPM 顯示
    showAMPM(){
        if(new Date().getHours() > 12){
            this.ampm = 'PM'
        }
        document.querySelector('.ampm p').innerText = this.ampm;
    }
    


}

setInterval(() => {
    data.init();
}, 1000)