// typeIt

new TypeIt("#typeIt-cont", {
    speed: 80,
    startDelay: 900,
})
    .type('Hello World!', { delay: 150 })
    .delete(1)
    .pause(200)
    .delete(1)
    .pause(200)
    .delete(1)
    .pause(200)
    .delete(1)
    .pause(200)
    .delete(1)
    .pause(200)
    .delete(1)
    .pause(200)
    .type('there!', { delay: 150 })
    .break()
    .pause()
    .type('My name is <br> TRUC DUONG.', {
        speed: 100,
    })
    .go();


// Funny Feedback button
let a = 0;
function mouseOver() {
    if (a == 0) {
        buttonMoveRight();
        a = 1;
    } else {
        buttonMoveLeft();
        a = 0;
    }
}

function buttonMoveRight() {
    const button = document.getElementById('meh-btn');
    button.style.transform = 'translateX(160%)';
};

function buttonMoveLeft() {
    const button = document.getElementById('meh-btn');
    button.style.transform = 'translateX(0)';
}

function buttonReset() {
    const button = document.getElementById('meh-btn');
    button.style.transform = 'translateX(0)';
}

function sendResponse() {
    document.getElementById('feedback-response').style.display = 'block';
    document.getElementById('feedback-btn-cont').style.display = 'none';
}
