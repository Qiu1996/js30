import Alpine from 'alpinejs'
 
window.Alpine = Alpine
 
Alpine.data('CalendarData', () => ({
    today: new Date(),
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    firstDayOfWeek: null,
    lastDay: null,
    weeks: ['一', '二', '三', '四', '五', '六', '日'],
    get title(){
        let str = `${this.year} 年 ${this.month + 1} 月`;
        return str;
    },
    get days(){
        return this.getDays();
    },
    getDays(){
        let firstDay = new Date(this.year, this.month, 1);
        this.firstDayOfWeek = firstDay.getDay() === 0 ? 7 : firstDay.getDay();
        this.lastDay = new Date(this.year, this.month + 1, 0).getDate();
        
        let arr = [];
        let day = 0;
        for(let i = 1; day < this.lastDay; i++){
            if(i >= this.firstDayOfWeek){
                day += 1;
                arr.push(day);
            }else{
                arr.push('');
            }
        }
        return arr;
    },
    prev(){
        this.month -= 1;
        if(this.month < 0){
            this.year -= 1;
            this.month = 11;
        };
    },
    next(){
        this.month += 1;
        if(this.month > 11){
            this.year += 1;
            this.month = 0;
        };
    },
    backBegin(){
        this.month = new Date().getMonth();
        this.year = new Date().getFullYear();
    }

}))

Alpine.start()

