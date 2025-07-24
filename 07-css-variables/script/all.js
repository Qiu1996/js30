const spacing = document.querySelector('#spacing');
const imgWrap = document.querySelector('.imgWrap');
const all_input= document.querySelectorAll('input');


all_input.forEach(input => {
  input.addEventListener('change', randerHandle);
  input.addEventListener('mousemove', randerHandle);
})

function randerHandle(){
  const size = this.dataset.size || '';
  document.documentElement.style.setProperty(`--${this.name}`, this.value+size);
}
