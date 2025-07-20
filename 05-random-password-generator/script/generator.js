const Generator = () => {
    return{
        upperToggle: true,
        lowerToggle: true,
        symbolToggle: true,
        numberToggle: true,
        password: () => {
            return '123';
        },
        uppercase(){
            this.upperToggle = this.upperToggle ? false : true;
            console.log(`大寫開關：${this.upperToggle}`);
        },
        lowercase(){
            this.lowerToggle = this.lowerToggle ? false : true;
            console.log(`小寫開關：${this.lowerToggle}`);
        },
        symbol(){
            this.symbolToggle = this.symbolToggle ? false : true;
            console.log(`符號開關：${this.symbolToggle}`);
        },
        number(){
            this.numberToggle = this.numberToggle ? false : true;
            console.log(`數字開關：${this.numberToggle}`);
        }
    }
}


export { Generator }