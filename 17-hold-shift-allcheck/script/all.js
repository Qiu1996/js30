const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('click', handle);
})

function handle(e) {
  let inBetween;
  if (e.shiftKey && this.checked) {
    inBetween = true;
    toggleCheck(inBetween);
  }else if(e.shiftKey && !this.checked){
    inBetween = false;
    toggleCheck(inBetween);
  }
}

function toggleCheck(inBetween) {
  checkboxes.forEach(checkbox => {
    checkbox.checked = inBetween;
  })
}