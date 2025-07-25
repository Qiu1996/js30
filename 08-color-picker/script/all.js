const colorPick = document.querySelector('.colorPicker');

colorPick.addEventListener('change', e => {
  let RGB_rr = parseInt(e.target.value.slice(1, 3), 16);
  let RGB_gg = parseInt(e.target.value.slice(3, 5), 16);
  let RGB_bb = parseInt(e.target.value.slice(5), 16);
  console.log(RGB_rr, RGB_gg, RGB_bb);
  // rgb get

})

