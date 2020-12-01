function startScreen(){
let main_screen = document.querySelector('.main-container');
let btn;
let newDiv = document.createElement('div');
let option = {
    0:'X',
    1:'O'
}
main_screen.classList.add('startscreen');
newDiv.classList.add('start', 'banner');
newDiv.textContent = 'Choose an Option:';
main_screen.appendChild(newDiv);

newDiv = document.createElement('div');

newDiv.classList.add('start','symbol');
for(let i=0; i<2;i++){
    btn = document.createElement('button');
    btn.classList.add('btn');
    btn.textContent = `${option[`${i}`]}`
    btn.setAttribute('id', `option${option[`${i}`]}`);
    newDiv.appendChild(btn);
}

main_screen.appendChild(newDiv);
}

function clearScreen(){
    let main_screen = document.querySelector('.main-container');
    while(main_screen.firstChild){
        main_screen.removeChild(main_screen.firstChild);
    }
    main_screen.classList.remove('startscreen');

}

let newGame = document.querySelector('.newgame');
newGame.addEventListener('click',clearScreen);

startScreen();





