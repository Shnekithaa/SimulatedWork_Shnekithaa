document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const startPauseBtn = document.querySelector('#start-pause-btn');
    const width = 9;
    let currentIndex = 76;
    let timerId;
    let gameInProgress = false;

    for (let i = 0; i < width * width; i++) {
        const square = document.createElement('div');
        grid.appendChild(square);
    }

    const squares = Array.from(document.querySelectorAll('.grid div'));

    squares[currentIndex].classList.add('frog');
    squares[4].classList.add('ending-block');
    squares[76].classList.add('starting-block');

    for (let i = 18; i < 27; i++) squares[i].classList.add('road');
    for (let i = 36; i < 54; i++) squares[i].classList.add('river');

    function moveFrog(e) {
        squares[currentIndex].classList.remove('frog');
        switch (e.key) {
            case 'ArrowLeft':
                if (currentIndex % width !== 0) currentIndex -= 1;
                break;
            case 'ArrowRight':
                if (currentIndex % width < width - 1) currentIndex += 1;
                break;
            case 'ArrowUp':
                if (currentIndex - width >= 0) currentIndex -= width;
                break;
            case 'ArrowDown':
                if (currentIndex + width < width * width) currentIndex += width;
                break;
        }
        squares[currentIndex].classList.add('frog');
        checkWin();
        checkLoss();
    }

    startPauseBtn.addEventListener('click', () => {
        if (!gameInProgress) {
            timerId = setInterval(gameLogic, 1000);
            document.addEventListener('keydown', moveFrog);
            gameInProgress = true;
        } else {
            clearInterval(timerId);
            document.removeEventListener('keydown', moveFrog);
            gameInProgress = false;
        }
    });

    function checkWin() {
        if (squares[currentIndex].classList.contains('ending-block')) {
            alert('You Win!');
            resetGame();
        }
    }

    function checkLoss() {
        if (
            squares[currentIndex].classList.contains('car') ||
            squares[currentIndex].classList.contains('river')
        ) {
            alert('You Lose!');
            resetGame();
        }
    }

    function gameLogic() {
        console.log('Game logic executed');
    }

    function resetGame() {
        clearInterval(timerId);
        document.removeEventListener('keydown', moveFrog);
        currentIndex = 76;
        squares.forEach((square) => square.classList.remove('frog'));
        squares[currentIndex].classList.add('frog');
        gameInProgress = false;
    }
});
