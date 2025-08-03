const appData = {
  rows: 10,
  cols: 10,
  circlesArr: [],
  init(){
    this.render();
    this.addEvent();
  },
  createCircle(){
    const circle_el = document.createElement('div');
    circle_el.classList.add('circle');
    return circle_el;
  },
  render(){
    for(let r = 0; r < this.rows; r++){
      this.circlesArr[r] = [];
      for(let c = 0; c < this.cols; c++){
        const container_el = document.querySelector('.container');
        const circle_el = this.createCircle();
        container_el.appendChild(circle_el);
        this.circlesArr[r].push(circle_el);
      }
    }
  },
  addEvent(){
    this.circlesArr.forEach((circle_row, r) => {
      circle_row.forEach((circle_el, c) => {
        circle_el.addEventListener('click', (e) => {
          this.growCircle(r, c);
          console.log(r, c);
        })
      })
    })
  },
  growCircle(r, c){
    if(this.circlesArr[r] && 
      this.circlesArr[r][c] && 
      !this.circlesArr[r][c].classList.contains('grow')
    ){
      this.circlesArr[r][c].classList.add('grow');
      setTimeout(() => {
        this.growCircle(r-1, c);
        this.growCircle(r+1, c);
        this.growCircle(r, c+1);
        this.growCircle(r, c-1);
      }, 40);
      setTimeout(() => {
          this.circlesArr[r][c].classList.remove('grow');  
      }, 800);
    }
  }
}

appData.init();