window.onload = () => {
    data.drawCell();
    data.coloring();
    data.toggleColor();
    data.copyColor();
}
// function colorBlocks() {
//     return document.querySelectorAll('.colorBlock');
// }

const data = {
    cell: 9,
    hexLength: 6,
    drawCell(){
        for(let i = 0; i < this.cell; i++){
            const colorBlock = document.createElement('div');
            colorBlock.className = "colorBlock";
            document.querySelector('.colorBlockWrap').appendChild(colorBlock);
        }
    },
    getHex(){
        let s = '';
        for(let i = 0; i < this.hexLength; i++){
            let num = Math.floor(Math.random() * 16);
            s += num.toString(16);
        }
        return `#${s}`;
    },
    coloring(){
        const colorBlocks = document.querySelectorAll('.colorBlock');
        // const a = colorBlocks();
        colorBlocks.forEach((block) => {
            block.style.background = this.getHex();
            block.innerHTML = `<p>${this.getHex()}</p>`;
        })
    },
    toggleColor(){
        document.querySelector('.controlBtn').addEventListener(
            'click', 
            () => this.coloring()
        );
    },
    copyColor(){
        const colorBlocks = document.querySelectorAll('.colorBlock');
        colorBlocks.forEach((block) =>
            block.addEventListener(
                'click',
                () => navigator.clipboard.writeText(block.innerText)
            )
        )
    }

}

