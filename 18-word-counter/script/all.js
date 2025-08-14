const app = {
  textArea: null,
  character: null,
  word: null,
  sentence: null,
  paragraph: null,
  init(){
    this.textArea = document.querySelector('textarea');
    this.character = document.querySelector('.character span');
    this.word = document.querySelector('.word span');
    this.sentence = document.querySelector('.sentence span');
    this.paragraph = document.querySelector('.paragraph span');
    this.addEvent();
  },
  addEvent(){
    this.textArea.addEventListener('input', (e) => {
      this.render(e.target.value);
    });
  },
  render(value){
    this.character.innerText = value.length;
    this.word.innerText = this.strHandle(value, ' ');
    this.sentence.innerText = this.strHandle(value, '.');
    this.paragraph.innerText = this.strHandle(value, ',');
  },
  strHandle(str, type){
    let count = 0;
    str.split(type).forEach(item => {
      if(item.trim() !== type){
        count++;
      }
    });
    return count === 1 ? 0 : count;
  }
}

app.init();