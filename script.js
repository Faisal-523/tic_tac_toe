
const player = {
    name:'default',
    stick:'-',
}
const gameInfo = (()=>{
    let gameArray = ['', '','','','','','','',''];
    let EmptySlots = [0,1,2,3,4,5,6,7,8];
    let turn = '-';
    let turnCount = 0;
    let player1;
    let player2;

    function initPlayers(playerChoice){
        player1 = Object.create(player);
        player2 = Object.create(player);
        player1.stick = 'X';
        player2.stick = 'O';
        playerChoice = toString(playerChoice).replace('option','');
        if(playerChoice = 'X'){
            player1.name = 'human';
            player2.name = 'computer';
        }
        else{
            player2.name = 'human';
            player1.name = 'computer'; 
        }

        turn = player1.stick;
        gameArray.fill('F');
        emptySlots = [1,2,3,4,5,6,7,8];
        turnCount = 0;
        console.log(`turn = ${turn}`);

    }

    function checkMove(boxSelect){
        let temp = turn;
        let str = toString(boxSelect);
        //console.log(str,boxSelect);
        str = boxSelect.replace(/^\D+/g,'');
        console.log(str);
        if(gameArray[Number(str)]=='F'){
            if(turn == player1.stick){
                gameArray[Number(str)] = temp;
                turn = player2.stick;
                turnCount++;
            }
            else if(turn == player2.stick){
                gameArray[Number(str)] = temp;
                turn = player1.stick;
                turnCount++;
            }
            else
            console.log('player turn logical error');

           console.table(gameArray);
        
        return temp;
        }
        else
        return 'error';
    }
    function checkWinner(){
        let i=0;
        console.log('gameArray', gameArray.length);
        for(i=0; i<gameArray.length-2;i++){
                    if(i==0){
                        if(gameArray[i] == gameArray[i+4] && gameArray[i] == gameArray[i+8]){
                            if(gameArray[i] == 'X')
                            return 'X';
                            else if(gameArray[i] == 'O')
                            return 'O';
                        }
                    }
                    if(i==2){
                        if(gameArray[i] == gameArray[i+2] && gameArray[i] == gameArray[i+4]){
                            if(gameArray[i] == 'X')
                            return 'X';
                            else if(gameArray[i] == 'O')
                            return 'O';
                        }
                    }
                    if(i == 0 || i== 1 || i == 2){
                        if(gameArray[i] == gameArray[i+3] && gameArray[i] == gameArray[i+6]){
                            if(gameArray[i] == 'X')
                            return 'X';
                            else if(gameArray[i] == 'O')
                            return 'O';
                        }
                    }

                    if(i==0 || i==3 || i==6){
                    if(gameArray[i] == gameArray[i+1] && gameArray[i] == gameArray[i+2]){
                        if(gameArray[i] == 'X')
                        return 'X';
                        else if(gameArray[i] == 'O')
                        return 'O';
                    }
                }
        }
        return 'none';
    }

    function getTurnCount(){
        return turnCount;
    }

    return{checkMove, initPlayers,checkWinner,getTurnCount};

})();


/* Module - gameControl */
const gameControl = (() =>{
let main_screen = document.querySelector('.main-container');
let btn;
let newDiv;
let option = {
    0:'X',
    1:'O'
}

function endScreen(str){
    let resultDiv;
    let gridBox;

    resultDiv = document.querySelector('.resultDiv');
    resultDiv.classList.add('start');
    if(str == 'tie'){
        resultDiv.textContent = 'Its a tie!';     
    }
    else{
    resultDiv.textContent = `Winner is: ${str}`;
    }

    gridBox = document.querySelectorAll('.box');
        gridBox.forEach(item => {
            item.removeEventListener('click',boxClick);
        });
    
}

function boxClick(){
    playerMove = gameInfo.checkMove(this.id);
    console.log('playerMove', playerMove);
    console.log('turnCount',gameInfo.getTurnCount());
    if(playerMove!='error'){
    this.textContent = playerMove;
    winner = gameInfo.checkWinner();
    if(winner == 'X' || winner == 'O'){
    endScreen(winner);
        }
    else if(gameInfo.getTurnCount() == 9){
        endScreen('tie');
    }
    console.log(this.id, winner);
    }
    else{
        console.log('gameplay error - Cant move in that box');
    }
}

/*gameScreen function begin*/
function gameScreen(){
    let box;
    let playerChoice = this.id;
    clearScreen();
    newDiv = document.createElement('div');
    newDiv.classList.add('resultDiv');
    main_screen.appendChild(newDiv);
    newDiv = document.createElement('div');
    newDiv.classList.add('start', 'gamescreen');
    for(let i=0; i<9; i++){
        box = document.createElement('div');
        box.classList.add('box');
        box.setAttribute('id',`box${i}`);
        box.addEventListener('click', boxClick);
        newDiv.appendChild(box);
    }
    main_screen.appendChild(newDiv);
    gameInfo.initPlayers(playerChoice);

   /* gridBox = document.querySelectorAll('.box');
    gridBox.forEach(element => {
        element.addEventListener('click', boxClick);      
    });*/
}
/* gameScreen function End*/

/* startScreen function begin*/
function startScreen(){
clearScreen();
newDiv = document.createElement('div');
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
    btn.addEventListener('click',gameScreen);
    newDiv.appendChild(btn);
}

main_screen.appendChild(newDiv);
}
/* startScreen function End*/

/* clearScreen function begin*/
function clearScreen(){
    while(main_screen.firstChild){
        main_screen.removeChild(main_screen.firstChild);
    }
    //main_screen.classList.remove('startscreen','gamescreen','endscreen');
    console.log('clearScreen');
}
/* startScreen function End*/

return {clearScreen, startScreen, gameScreen}
})();

let newGame = document.querySelector('.newgame');
newGame.addEventListener('click',gameControl.startScreen);

gameControl.startScreen();
//gameControl.gameScreen();





