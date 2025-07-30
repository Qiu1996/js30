const date = {
    boardNumber: 510,
    colors: ['#CF90C1', '#AACBE0', '#EC5F5E', '#A8C7B3', '#FCD6B3'],
    init(){
        this.boardCtrl();
        this.renderBoard();
    },
    boardCtrl(){
        const boardCtrl_el = document.querySelector('#boardCtrl');
        boardCtrl_el.value = boardCtrl_el.min;
        boardCtrl_el.addEventListener('change', (e) => {
            e.target.value = e.target.value <= Number(e.target.min) ? e.target.min : e.target.value;
            e.target.value = e.target.value >= Number(e.target.max) ? e.target.max : e.target.value;
            
            this.boardNumber = e.target.value;
            this.renderBoard();
        })
    },
    renderBoard(){
        const container_el = document.querySelector('.container');
        container_el.innerHTML = '';
        for(let i = 0; i < this.boardNumber; i++){
            const board_el = document.createElement('li');
            board_el.classList.add('board');
            container_el.appendChild(board_el);
            board_el.addEventListener('mouseover', (e) => this.highLight(e.target));
            board_el.addEventListener('mouseout', (e) => this.rmHighLight(e.target));
        }
    },
    highLight(element){
        const color = this.getColor();
        element.style.backgroundColor = color;
        element.style.boxShadow = `0px 0px 5px 3px ${color}`;
    },
    rmHighLight(element){
        setTimeout(() => {
            element.style.backgroundColor = "#1a1722";
            element.style.boxShadow = `0px 0px 5px 0px #ffffff`;
        }, 500);
    },
    getColor(){
        const index = Math.floor(Math.random() * this.colors.length);
        return this.colors[index];
    }
}

date.init();



