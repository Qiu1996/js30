const appData = {
  rows: 20,
  cols: 20,
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
          this.offsetCircle(r, c);
          // -> this.offsetCircle(4, 5);
          console.log(r, c);
        })
      })
    })
  },
  offsetCircle(r, c){
    
    let topR = Math.min(r+4, this.rows-1), topC = c;
    let bottomR = Math.max(r-4, 0), bottomC = c;
    let leftR = r, leftC = Math.max(c-4, 0);
    let rightR = r, rightC = Math.min(c+4, this.cols-1);
        
    this.shrink(topR, topC, r, c);
    this.shrink(bottomR, bottomC, r, c);
    this.shrink(leftR, leftC, r, c);
    this.shrink(rightR, rightC, r, c);
    
  },
  shrink(offsetR, offsetC, targetR, targetC){
    // 邊界檢查和終止條件
      if(offsetR >= 0 && offsetR < this.rows &&
         offsetC >= 0 && offsetC < this.cols &&
         this.circlesArr[offsetR] &&
         this.circlesArr[offsetR][offsetC] &&
         !this.circlesArr[offsetR][offsetC].classList.contains('grow')
      ){
        this.circlesArr[offsetR][offsetC].classList.add('grow');

        // 計算到目標點的距離
        const distanceToTarget = Math.abs(offsetR - targetR) + Math.abs(offsetC - targetC);

        // 如果還沒到達目標點，繼續遞迴
        if(distanceToTarget > 0){
          setTimeout(() => {
            // 向目標點方向移動
            const newR = offsetR + (targetR > offsetR ? 1 : targetR < offsetR ? -1 : 0);
            const newC = offsetC + (targetC > offsetC ? 1 : targetC < offsetC ? -1 : 0);
            this.shrink(newR, newC, targetR, targetC);
          }, 200);
        }
    
      setTimeout(() => {
        this.circlesArr[offsetR][offsetC].classList.remove("grow");
      }, 200);
    }
  }
}

appData.init();


//  (0, 0) (0, 1) (0, 2) (0, 3) (0, 4) (0, 5) (0, 6) (0, 7) (0, 8) (0, 9)
//  (1, 0) (1, 1) (1, 2) (1, 3) (1, 4) (1, 5) (1, 6) (1, 7) (1, 8) (1, 9)
//  (2, 0) (2, 1) (2, 2) (2, 3) (2, 4) (2, 5) (2, 6) (2, 7) (2, 8) (2, 9)
//  (3, 0) (3, 1) (3, 2) (3, 3) (3, 4) (3, 5) (3, 6) (3, 7) (3, 8) (3, 9)
//  (4, 0) (4, 1) (4, 2) (4, 3) (4, 4) (4, 5) (4, 6) (4, 7) (4, 8) (4, 9)
//  (5, 0) (5, 1) (5, 2) (5, 3) (5, 4) (5, 5) (5, 6) (5, 7) (5, 8) (5, 9)
//  (6, 0) (6, 1) (6, 2) (6, 3) (6, 4) (6, 5) (6, 6) (6, 7) (6, 8) (6, 9)
//  (7, 0) (7, 1) (7, 2) (7, 3) (7, 4) (7, 5) (7, 6) (7, 7) (7, 8) (7, 9)
//  (8, 0) (8, 1) (8, 2) (8, 3) (8, 4) (8, 5) (8, 6) (8, 7) (8, 8) (8, 9) 
//  (9, 0) (9, 1) (9, 2) (9, 3) (9, 4) (9, 5) (9, 6) (9, 7) (9, 8) (9, 9)
