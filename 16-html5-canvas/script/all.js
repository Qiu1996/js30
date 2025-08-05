function draw() {
  const canvas = document.querySelector("#draw");
  const width = canvas.parentElement.clientWidth;
  const height = canvas.parentElement.clientWidth;
  canvas.width = width;
  canvas.height = height;
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    let isDrawing = false;
    let points = [];
    
    ctx.strokeStyle = "red";
    ctx.fillStyle = "green";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 5;

    canvas.addEventListener("click", (e) => {
      console.log(e);
      if(!isDrawing) {
        points.push({x: e.offsetX, y: e.offsetY});
        if(points.length > 1) {
          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);

          for(let i = 0; i < points.length; i++) {
            let distance = Math.abs(points[0].x - points[i].x) + Math.abs(points[0].y - points[i].y);

            if(distance < 20 && i > 1) {
              points[i] = {x: points[0].x, y: points[0].y};
              ctx.lineTo(points[i].x, points[i].y);
              ctx.closePath();
              ctx.stroke();
              ctx.fill();
              points = [];
              return;
            }
            
            ctx.lineTo(points[i].x, points[i].y);
            ctx.stroke();
          }          
        }
      }
    });
  }
}

draw();
