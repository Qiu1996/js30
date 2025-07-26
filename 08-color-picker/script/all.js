const colorPick = document.querySelector('.colorPicker');
const hexBtn = document.querySelector('.hexBtn'); 
const rgbBtn = document.querySelector('.rgbBtn');
const hslBtn = document.querySelector('.hslBtn');
const allBtn = document.querySelectorAll('button');
const message = document.querySelector('.message');
const body = document.querySelector('body');

colorPick.addEventListener('input', (e) => {
  hex(e);
  rgb(e);
  bgColor(e);
})

function hex(e){
  hexBtn.innerText = e.target.value; 
}

function rgb(e){
  const r = parseInt(e.target.value.slice(1, 3), 16);
  const g = parseInt(e.target.value.slice(3, 5), 16);
  const b = parseInt(e.target.value.slice(5), 16);
  rgbBtn.innerText = `rgb(${r}, ${g}, ${b})`;

  hls(r, g, b);
}


function hls(r, g, b){
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  // 色相公式
  const h = () => {
    let num = Math.atan2(Math.sqrt(3) * (g - b), 2 * r - g - b) * 180 / Math.PI;

    return Math.round(num < 0 ? num + 360 : num);
  }

  // 亮度公式
  const l = () => {
    let num = (max + min) / 2;

    return Math.round(num / 255 * 100);  // 歸一化，百分比化
  }

  // 飽和度公式
  const s = () => {
    if (max === min) return 0;

    const normL = l() / 100;
    const normMax = max / 255;
    const normMin = min / 255;

    let num = (normMax - normMin) / (1 - Math.abs(2 * normL - 1)) || 1;
    
    num = num > 1 ? 1 : num;
    num = num === Infinity ? 0 : num;
  

    return Math.round(num * 100);
  }

  hslBtn.innerText = `hsl(${h()}, ${s()}%, ${l()}%)`;  
}

function bgColor(e){
  body.style["background-color"] = e.target.value;
}

allBtn.forEach( btn => {
  btn.addEventListener('click', (e) => {
    navigator.clipboard.writeText(e.target.textContent);
    msgToggleTure();
    setTimeout(() => {
      msgToggleFalse();
    }, 1000);
  })
})


function msgToggleTure(){
message.classList.add("message_copySuccess");
message.classList.remove("message");
}

function msgToggleFalse(){
message.classList.add("message");
  message.classList.remove("message_copySuccess");

}
