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
