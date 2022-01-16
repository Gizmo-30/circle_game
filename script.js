const startBtn = document.querySelector('.start'),
    screens = document.querySelectorAll('.screen'),
    timeList = document.querySelector('.time-list'),
    timeEl = document.querySelector('#time'),
    board = document.querySelector('.board');



let time = 0,
    score = 0;

startBtn.addEventListener('click', (e) => {
    e.preventDefault()
    screens[0].classList.add('up')
})

/* Делигировагие событий */
timeList.addEventListener('click', (e) => {
    // console.log(e.target.classList.contains('time-btn'));

    if (e.target.classList.contains('time-btn')) {
        screens[1].classList.add('up')
        let elAttr = e.target.getAttribute('data-time')
        // console.log(elAttr);
        time = Number(elAttr)
        startGame()
    }
})

function decreaseTime() {
    if (time === 0) {
        /* ParentNode берет сразу прямого родителя  */
        timeEl.parentNode.classList.add('hide')
        board.innerHTML = `Ваш счет ${score}`
    } else {
        let currentTime = --time
        if (currentTime < 10) {
            currentTime = `0${currentTime}`
        }

        timeEl.innerHTML = `00:${currentTime}`
    }
}

function startGame() {
    setInterval(decreaseTime, 1000);
    createRandomCircle()
}

function createRandomCircle() {
    const circle = document.createElement('div')

    circle.classList.add('circle')

    let wh = size()

    circle.style = `
        width: ${wh}px;
        height: ${wh}px;
        inset: ${circleDirection[circleDirectionNumber()]};
        background: ${circleColor()};
        `

    board.appendChild(circle)
}



board.addEventListener('click', (e) => {
    if (e.target.classList.contains('circle')) {
        score++
        e.target.remove()
        createRandomCircle()
    }
})

function randomPositions(a = 10, b = 235) {
    return Math.floor(Math.random() * (b - a) + a)
}

function circleDirectionNumber() {
    return Math.floor(Math.random() * 8 + 1)
}


const circleDirection = {
    '1': randomPositions() + 'px auto auto auto',
    '2': 'auto auto auto ' + randomPositions() + 'px',
    '3': 'auto auto ' + randomPositions() + 'px ' + randomPositions() +'px',
    '4': randomPositions() + 'px ' + randomPositions() + 'px auto auto',
    '5': 'auto ' + randomPositions() + 'px ' + randomPositions() + 'px auto',
    '6': randomPositions() + 'px auto auto ' + randomPositions() + 'px',
    '7': 'auto ' + randomPositions() + 'px auto auto',
    '8': 'auto auto ' + randomPositions() + 'px auto',
}


function circleColor() {
    const r = Math.floor(Math.random() * 256),
        g = Math.floor(Math.random() * 128 + 128),
        b = Math.floor(Math.random() * 86 + 170);
    return `rgba(${r},${g},${b})`
}


function size() {
    return Math.floor(Math.random() * 75 + 20)
} 


