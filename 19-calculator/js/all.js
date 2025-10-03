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
      fn_default(e.target.textContent);
      break;
    
  }
})

function fn_default(text){
  let str = el_result.innerText;
  el_result.innerText = str === "0" ? "" : str;
  
  if(text === "+" || text === "-"){
    if(str[str.length-1] === "+" || str[str.length-1] === "-"){
      el_result.innerText = str.slice(0, -1);
    } 
  }
  el_result.innerText += text;
}

function fn_equal(){
  try{
    el_result.innerText = eval(el_result.innerText);
  }catch{
    return
  }
}
