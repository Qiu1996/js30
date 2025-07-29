const box = document.querySelectorAll('.box');

box.forEach( item => {
    item.addEventListener('click', e => {
    item.classList.toggle('open');
  })
})