const el_btnWrap = document.querySelector(".btn_wrap");
const el_result = document.querySelector(".result div"); 


el_btnWrap.addEventListener("click", e => {
  switch(e.target.dataset.action){
    case "clear":
      el_result.innerText = '';
      break;
    case "num":
      el_result.innerText = addNum(e.target.textContent);
      break;
    
  }
})

function clear(){

}

const addNum = ((text) => {
  let str = '';

  return (text) => {
    str += text;
    return str;
  }
})();
