const el_btnWrap = document.querySelector(".btn_wrap");
const el_result = document.querySelector(".result div"); 


el_btnWrap.addEventListener("click", e => {
  switch(e.target.dataset.action){
    case "clear":
      el_result.innerText = '0';
      break;
    case "equal":
      fn_equal()
      break;
    default:
      fn_default(e.target);
      break;
    
  }
})

function fn_default(target){
  let str = el_result.innerText;
  el_result.innerText = str === "0" ? "" : str;
  
  if(target.dataset.action === "operators"){
    switch(str[str.length-1]){
      case "x":
      case "/":
        if(target.textContent !== "-"){
          el_result.innerText = str.slice(0, -1);
        }
        break;
      case "+":
      case "-":
        el_result.innerText = str.slice(0, -1);
    }
  }
  el_result.innerText += target.textContent;
}

function fn_equal(){
  try{
    let str = el_result.innerText.replace(/x/g, '*');
    el_result.innerText = eval(str);
  }catch{
    return
  }
}
