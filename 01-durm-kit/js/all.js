// const keyA = document.querySelector('.key');


// const audio = document.querySelector('audio');
// console.log(audio);

// keyA.addEventListener('click', (e) => {
// 	audio.play();
// })

const keys = Array.from(document.querySelectorAll('.key'));

// console.log(keys);

// const keyCode = keys.map((key) => {
// 	return key.dataset.key;
// })

// console.log(keyCode);


keys.forEach(
	(key) => { key.addEventListener(
		'click',
		e => sound(e) 

		// console.log(e.target.parentElement.dataset.key)
	)}
)


window.addEventListener("keydown", e => sound(e));

function sound(e){
	const key = e.keyCode || e.target.parentElement.dataset.key;
	const audio = document.querySelector(`audio[data-key='${key}']`);


	if(!audio) return;

	audio.currentTime = 0;
	audio.play();
}





