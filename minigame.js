let currentAnswer = '';
let currentIndex = -1;
let currentOverlayDiv = null;

function showPopup(question, answer, index, imageUrl = '') {
    currentAnswer = answer.replace(/\s+/g, '').toUpperCase();
    currentIndex = index;
    currentOverlayDiv = document.querySelectorAll('.overlay div')[index];
    
    const popup = document.getElementById('popup');
    const questionElement = document.getElementById('question');
    const questionImage = document.getElementById('question-image');
    
    questionElement.innerHTML = question; 

    if (imageUrl) {
        questionImage.src = imageUrl;
        questionImage.style.display = 'block'; 
    } else {
        questionImage.style.display = 'none'; 
    }

    const answerField = document.getElementById('answer-field');
    answerField.innerHTML = '';
    
    for (let i = 0; i < currentAnswer.length; i++) {
        const span = document.createElement('span');
        span.textContent = '_';
        span.setAttribute('data-index', i);
        answerField.appendChild(span);
    }
    
    popup.style.display = 'block';
    document.addEventListener('keydown', handleKeyPress);
}

function handleKeyPress(event) {
    const spans = document.querySelectorAll('#answer-field span');
    if (event.key === 'Enter') {
        checkAnswer();
    } else if (event.key.length === 1 && event.key.match(/[a-z]/i)) {
        for (let span of spans) {
            if (span.textContent === '_') {
                span.textContent = event.key.toUpperCase();
                break;
            }
        }
    } else if (event.key === 'Backspace') {
        for (let i = spans.length - 1; i >= 0; i--) {
            if (spans[i].textContent !== '_') {
                spans[i].textContent = '_';
                break;
            }
        }
    }
}

function checkAnswer() {
    const userAnswer = Array.from(document.querySelectorAll('#answer-field span'))
        .map(span => span.textContent)
        .join('');
    if (userAnswer === currentAnswer) {
        currentOverlayDiv.classList.add('correct');
        alert('Đáp án chính xác!');
    } else {
        currentOverlayDiv.classList.add('incorrect');
        alert('Đáp án sai!');
    }
    closePopup();
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
    document.removeEventListener('keydown', handleKeyPress);
}

document.addEventListener('DOMContentLoaded', function() {
    const answer = 'DONG BANG SONG CUU LONG';
    const resultField = document.getElementById('result-field');
    resultField.innerHTML = '';
    
    for (let i = 0; i < answer.replace(/\s+/g, '').length; i++) {
        const span = document.createElement('div');
        span.className = 'guess-char';
        span.setAttribute('contenteditable', true);
        span.setAttribute('maxlength', 1);
        span.addEventListener('input', function(e) {
            if (span.innerText.length > 1) {
                span.innerText = span.innerText.slice(0, 1);
            }
            if (span.innerText.length === 1) {
                const nextSibling = span.nextElementSibling;
                if (nextSibling) {
                    nextSibling.focus();
                }
            }
        });
        span.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && span.innerText === '') {
                const prevSibling = span.previousElementSibling;
                if (prevSibling) {
                    prevSibling.focus();
                }
            }
        });
        resultField.appendChild(span);
    }
});

function checkResult() {
    const answer = 'DONG BANG SONG CUU LONG'.replace(/\s+/g, ''); 
    let userGuess = '';
    document.querySelectorAll('#result-field .guess-char').forEach(function(span) {
        userGuess += span.innerText.toUpperCase();
    });
    if (userGuess === answer) {
        alert('Chính xác!');
        revealAllOverlays(); 
    } else {
        alert('Sai rồi, thử lại nhé!');
    }
}

function revealAllOverlays() {
    document.querySelectorAll('.overlay-item').forEach(function(item) {
        item.style.backgroundColor = 'transparent';
        item.style.pointerEvents = 'none';
    });
}
