import Alpine from 'alpinejs'
 
window.Alpine = Alpine
 
Alpine.data('CalendarData', () => ({
    today: new Date(),
    year: null,
    month: null,
    firstDayOfWeek: null,
    lastDay: null,
    totalGrid: 35,
    weeks: ['一', '二', '三', '四', '五', '六', '日'],
    init(){
        this.year = this.today.getFullYear();
        this.month = this.today.getMonth();
        
        let firstDay = new Date(this.year, this.month, 1);
        this.firstDayOfWeek = firstDay.getDay() === 0 ? 7 : firstDay.getDay();
        this.lastDay = new Date(this.year, this.month + 1, 0).getDate();
    },
    days: function(){
        let arr = [];
        let day = 0;
        console.log(this.lastDay);
        for(let i = 1; i <= this.totalGrid; i++){
            if(i >= this.firstDayOfWeek && i <= this.lastDay +1){
                day += 1;
                arr.push(day);
            }else{
                arr.push('');
            }
        }
        return arr;
    },
}))

Alpine.start()

