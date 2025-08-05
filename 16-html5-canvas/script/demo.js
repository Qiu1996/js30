// 獲取 canvas 元素和 2D 繪圖上下文
const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

// 設定 canvas 尺寸為整個視窗大小
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 設定繪圖樣式
ctx.strokeStyle = '#BADA55';    // 線條顏色（黃綠色）
ctx.lineJoin = 'round';         // 線條連接處為圓角
ctx.lineCap = 'round';          // 線條端點為圓角
ctx.lineWidth = 100;            // 線條寬度（很粗）
// ctx.globalCompositeOperation = 'multiply';  // 混合模式（被註解掉）

// 狀態變數
let isDrawing = false;          // 是否正在繪圖
let lastX = 0;                  // 上一個 X 座標
let lastY = 0;                  // 上一個 Y 座標
let hue = 0;                    // HSL 色彩色相值（0-360）
let direction = true;            // 線條寬度變化方向（true=變粗，false=變細）

// 主要繪圖函數
function draw(e) {
  if (!isDrawing) return; // 如果沒有按下滑鼠，停止繪圖
  
  console.log(e);  // 在控制台輸出滑鼠事件
  
  // 設定動態顏色（HSL 色彩循環）
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  
  // 開始繪圖路徑
  ctx.beginPath();
  
  // 從上一個位置開始
  ctx.moveTo(lastX, lastY);
  
  // 畫線到當前滑鼠位置
  ctx.lineTo(e.offsetX, e.offsetY);
  
  // 執行繪圖
  ctx.stroke();
  
  // 更新上一個位置為當前位置
  [lastX, lastY] = [e.offsetX, e.offsetY];

  // 色彩變化：每次繪圖後色相值+1
  hue++;
  if (hue >= 360) {
    hue = 0;  // 色相值超過360時重置為0
  }
  
  // 線條寬度變化邏輯
  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction;  // 達到最大或最小寬度時改變方向
  }

  // 根據方向改變線條寬度
  if(direction) {
    ctx.lineWidth++;  // 變粗
  } else {
    ctx.lineWidth--;  // 變細
  }
}

// 滑鼠事件監聽器
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;  // 滑鼠按下時開始繪圖
  [lastX, lastY] = [e.offsetX, e.offsetY];  // 記錄起始位置
});

canvas.addEventListener('mousemove', draw);  // 滑鼠移動時執行繪圖函數
canvas.addEventListener('mouseup', () => isDrawing = false);  // 滑鼠放開時停止繪圖
canvas.addEventListener('mouseout', () => isDrawing = false); // 滑鼠離開 canvas 時停止繪圖