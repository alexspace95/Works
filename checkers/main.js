let playerCount = 0;
let players = ['white-player', 'black-player'];


function setStartButton() {
    const main = document.getElementById('main');
    main.insertAdjacentHTML('afterbegin', `<button id='start-button' class='start-button'>Click here for start new game</button>`);
}

function setStartNewGame() {
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', createCheckersTable);
}



function createCheckersTable() {
    playerCount = 0;
    const main = document.getElementById('main');
    main.innerHTML = '';

    createTable();
    setStartButton();
    setPlayers();
    clickUnit();
    setStartNewGame();
    returnUnitsCount();
}

function returnUnitsCount() {
    const whitesUnitsLength = (document.getElementsByClassName('white-player')).length;
    const blacksUnitsLength = (document.getElementsByClassName('black-player')).length;

    const whitesUnits = document.getElementById('white-units-counter');
    const blacksUnits = document.getElementById('black-units-counter');

    whitesUnits.innerText = `white : ${whitesUnitsLength}`;
    blacksUnits.innerText = `black : ${blacksUnitsLength}`;
}

function createTable() {
    const main = document.getElementById('main');
    setPlayersNameField();
    main.insertAdjacentHTML('beforeend', `
    <table id='table' class='table'>
        <tbody id='tbody' class='tbody'></tbody>
    </table>
    `);
    main.insertAdjacentHTML('beforeend', `
    <h3 id='units-count' class='units-count'>
        <p id='white-units-counter' class='white-units-counter'></p>
        <p id='black-units-counter' class='black-units-counter'></p>
    </h3>
    `);
    createCells();
}

function createCells() {
    const tbody = document.getElementById('tbody');

    const abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    for (let i = 0; i < 10; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < 10; j++) {
            const td = document.createElement('td');

            if (((i == 0) || (i == 9)) || ((j == 0) || (j == 9))) {
                td.setAttribute('class', 'td-numbers');

                if ((i == 0) || (i == 9)) {
                    if (!((j == 0) || (j == 9))) {
                        td.insertAdjacentText('beforeend', `${abc[j-1]}`);
                    }
                    if ((j == 0) || (j == 9)) {
                        td.setAttribute('class', `td-null`);
                    }
                }
                if ((j == 0) || (j == 9)) {
                    if (!((i == 0) || (i == 9))) {
                        td.insertAdjacentText('beforeend', `${i}`);
                    }
                }
            } else {
                if (((i + j) % 2) == 0) {
                    td.setAttribute('style', 'background-color:#111');
                } else {
                    td.setAttribute('style', 'background-color:#eee');
                }
                td.setAttribute('id', `td${i}${j}`);
                td.setAttribute('data-cell', `${i}${j}`);
                td.setAttribute('class', `colored`);
            }
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
}

function setPlayers() {
    for (let i = 1; i < 4; i++) {
        for (let j = 1; j < 9; j++) {
            const cell = document.getElementById(`td${i}${j}`);
            if (i % 2 == 1) {
                if (j % 2 == 0) {
                    cell.setAttribute('class', 'black-player');
                }
            }
            if (i % 2 == 0) {
                if (j % 2 == 1) {
                    cell.setAttribute('class', 'black-player');
                }
            }
        }
    }

    for (let i = 6; i < 9; i++) {
        for (let j = 1; j < 9; j++) {
            const cell = document.getElementById(`td${i}${j}`);
            if (i % 2 == 1) {
                if (j % 2 == 0) {
                    cell.setAttribute('class', 'white-player');
                }
            }
            if (i % 2 == 0) {
                if (j % 2 == 1) {
                    cell.setAttribute('class', 'white-player');
                }
            }
        }
    }

    // const cell = document.getElementById('td74');
    // cell.setAttribute('class', 'white-player');

}

function clickUnit() {
    const tbody = document.getElementById('tbody');
    tbody.addEventListener('click', searchPiece);
}

function searchPiece(e) {

    if (e.target.nodeName == 'TD') {
        const elem = e.target;

        if (elem.getAttribute('class') == `${players[playerCount]}`) {

            isCanAtack(e)

            elem.setAttribute('class', 'colored active');
            const elemNumber = Number(elem.getAttribute('data-cell'));
            const elemY = Math.floor(elemNumber / 10);
            const elemX = elemNumber % 10;

            if ((elemY > 1) && (elemX > 1)) {
                if (document.getElementById(`td${elemY-1}${elemX-1}`).getAttribute('class') == `colored`) {
                    (document.getElementById(`td${elemY-1}${elemX-1}`)).setAttribute('class', 'colored can-move');
                }
            }
            if ((elemY > 1) && (elemX < 8)) {
                if (document.getElementById(`td${elemY-1}${elemX+1}`).getAttribute('class') == `colored`) {
                    (document.getElementById(`td${elemY-1}${elemX+1}`)).setAttribute('class', 'colored can-move');
                }
            }
            if ((elemY < 8) && (elemX > 1)) {
                if (document.getElementById(`td${elemY+1}${elemX-1}`).getAttribute('class') == `colored`) {
                    (document.getElementById(`td${elemY+1}${elemX-1}`)).setAttribute('class', 'colored can-move');
                }
            }
            if ((elemY < 8) && (elemX < 8)) {
                if (document.getElementById(`td${elemY+1}${elemX+1}`).getAttribute('class') == `colored`) {
                    (document.getElementById(`td${elemY+1}${elemX+1}`)).setAttribute('class', 'colored can-move');
                }
            }

            this.removeEventListener('click', searchPiece);
            this.addEventListener('click', moveThisPiece);
            this.addEventListener('click', cancelUnit);
            this.addEventListener('click', atackTheEnemy);
        }
    }
}

function cancelUnit(e) {
    const elem = e.target;
    if (elem.getAttribute('class') == 'colored active') {
        elem.setAttribute('class', `${players[playerCount]}`);
        this.removeEventListener('click', cancelUnit);
        this.addEventListener('click', searchPiece);
        deleteMovingCells();
        deleteCanAtackCells();
    }

}

function moveThisPiece(e) {
    const elem = e.target;

    if (elem.getAttribute('class') == 'colored can-move') {
        const canActiveCell = this.getElementsByClassName('colored active');
        canActiveCell[0].setAttribute('class', 'colored');

        elem.setAttribute('class', `${players[playerCount]}`)

        setNextPlayer();
        printPlayerName();
        clickUnit();
        deleteMovingCells();
        deleteCanAtackCells();
    }
}

function deleteMovingCells() {
    const canMoveList = document.getElementsByClassName('colored can-move');
    const N = canMoveList.length;
    for (let i = 0; i < N; i++) {
        canMoveList[0].setAttribute('class', 'colored');
    }
}

function deleteCanAtackCells() {
    const canCanAtackList = document.getElementsByClassName('colored can-atack');
    const N = canCanAtackList.length;
    for (let i = 0; i < N; i++) {
        canCanAtackList[0].setAttribute('class', 'colored');
    }
}


function isCanAtack(e) {
    if (e.target.nodeName == 'TD') {
        const elem = e.target;

        const elemNumber = Number(elem.getAttribute('data-cell'));
        const elemY = Math.floor(elemNumber / 10);
        const elemX = elemNumber % 10;

        if ((elemY > 2) && (elemX > 2)) {
            if (document.getElementById(`td${elemY-1}${elemX-1}`).getAttribute('class') == `${players[Number(!(playerCount))]}`) {
                if (document.getElementById(`td${elemY-2}${elemX-2}`).getAttribute('class') == `colored`) {
                    (document.getElementById(`td${elemY-2}${elemX-2}`)).setAttribute('class', 'colored can-atack');
                }
            }
        }
        if ((elemY > 2) && (elemX < 7)) {
            if (document.getElementById(`td${elemY-1}${elemX+1}`).getAttribute('class') == `${players[Number(!(playerCount))]}`) {
                if (document.getElementById(`td${elemY-2}${elemX+2}`).getAttribute('class') == `colored`) {
                    (document.getElementById(`td${elemY-2}${elemX+2}`)).setAttribute('class', 'colored can-atack');
                }
            }
        }
        if ((elemY < 7) && (elemX > 2)) {
            if (document.getElementById(`td${elemY+1}${elemX-1}`).getAttribute('class') == `${players[Number(!(playerCount))]}`) {
                if (document.getElementById(`td${elemY+2}${elemX-2}`).getAttribute('class') == `colored`) {
                    (document.getElementById(`td${elemY+2}${elemX-2}`)).setAttribute('class', 'colored can-atack');
                }
            }
        }
        if ((elemY < 7) && (elemX < 7)) {
            if (document.getElementById(`td${elemY+1}${elemX+1}`).getAttribute('class') == `${players[Number(!(playerCount))]}`) {
                if (document.getElementById(`td${elemY+2}${elemX+2}`).getAttribute('class') == `colored`) {
                    (document.getElementById(`td${elemY+2}${elemX+2}`)).setAttribute('class', 'colored can-atack');
                }
            }
        }

    }
}

function atackTheEnemy(e) {
    if (e.target.classList.contains('can-atack')) {
        const elem = e.target;
        const playerMoving = Number(elem.getAttribute('data-cell'));
        const ourPosition = document.getElementsByClassName('colored active');
        const enemyPosition = Number(ourPosition[0].getAttribute('data-cell'));
        const deleteEnemyPosition = Number((playerMoving + enemyPosition) / 2);
        const enemyList = document.getElementsByClassName(`${players[Number(!(playerCount))]}`);
        let thisEnemy;
        for (let i = 0; i < enemyList.length; i++) {
            if (enemyList[i].getAttribute('data-cell') == deleteEnemyPosition) {
                thisEnemy = enemyList[i];
            }
        }
        ourPosition[0].setAttribute('class', 'colored');
        thisEnemy.setAttribute('class', 'colored');
        elem.setAttribute('class', `${players[Number(playerCount)]}`);

        returnUnitsCount();
        setNextPlayer();
        printPlayerName();
        returnUnitsCount();
        clickUnit();
        deleteMovingCells();
    }
}



function setPlayersNameField() {
    const main = document.getElementById('main');
    main.insertAdjacentHTML('beforeend',
        `<h2 id='player-name' class='player-name'></h2>`);
    printPlayerName();
}

function printPlayerName() {
    const playerName = document.getElementById('player-name');
    playerName.innerText = `${players[(Number(playerCount))]}`;
}

function setNextPlayer() {
    playerCount = Number(!playerCount);
}

function setVictoryPlayer(player1, player2) {

}


setStartButton();
setStartNewGame();