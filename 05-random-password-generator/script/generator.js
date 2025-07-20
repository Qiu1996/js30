const Generator = () => {
    return{
        setLength: 20,
        upperToggle: true,
        lowerToggle: true,
        symbolToggle: true,
        numberToggle: true,
        upperChars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowerChars: 'abcdefghijklmnopqrstuvwxyz',
        symbolChars: '!@#$%^&*',
        numberChars: '0123456789',
        refreshPassword: false,
        copyStatus: '複製密碼',
        get getPassword(){
            this.refreshPassword;
            let char = '';
            let str = '';
            if(this.upperToggle)char += this.upperChars;
            if(this.lowerToggle)char += this.lowerChars;
            if(this.symbolToggle)char += this.symbolChars;
            if(this.numberToggle)char += this.numberChars;
            
            for(let i = 0; i < this.setLength; i++){
                const index = Math.floor(Math.random() * char.length);
                str += char.charAt(index);
                // 移除已選擇的字元
            }
            return str;
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
        },
        refresh(){
            this.refreshPassword = true;
            setTimeout(() => {
                this.refreshPassword = false;
            }, 1000);
            console.log('刷新密碼');
        },
        copy(){
            navigator.clipboard.writeText(this.getPassword);
            this.copyStatus = '複製成功';
            setTimeout(() => {
                this.copyStatus = '複製密碼';
            }, 1000);
            console.log('複製成功');
        }
    }
}


export { Generator }