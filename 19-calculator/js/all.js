const el_btnWrap = document.querySelector(".btn_wrap");
const el_result = document.querySelector(".result div"); 


el_btnWrap.addEventListener("click", e => {
  switch(e.target.dataset.action){
    case "clear":
      clear();
      break;
    case "num":
      let resultStr = addStr(e.target.textContent);
      break;
    
  }
})


function clear(){
  result('0');
}

function addStr(textContent){
  let str = '';

  function(){
    str += textContent;
  }

  return str;
}

function result(str){
  el_result.innerText = str;
}





