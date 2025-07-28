document.addEventListener('DOMContentLoaded', function () {

//Game settings
    const totalQuestions = 10;
    let currentQuestion = 0
    let score = 0

//Elements from HTML page
    const questionElement = document.getElementById('question');
    const answerInput = document.getElementById('answer');
    const submitButton = document.getElementById('submit-btn');
    const feedbackElement = document.getElementById('feedback');
    const scoreElement = document.getElementById('score');

//Store current correct answer
    let correctAnswer = 0;

// Math question logic
    function generateQuestion() {
        const num1 = Math.floor(Math.random() *10) + 1;
        const num2 = Math.floor(Math.random() *10) + 1;
        const operators = ['+','-','*'];
        const operator = operators[Math.floor(Math.random()* operaters.length)];

//creating question
        let questionText = '${num1} ${operator} ${num2}';

//checking the answer 
        correctAnswer = eval(questionText);

// display the question
        questionElement.textContent = 'Question ${currentQuestion + 1}: ${questionText}';
        answerInput.value = '';
        feedbackElement.textContent = '';
    }

//checking answer is correct
    function checkAnswer() {
        const userAnswer = parseInt(answerInput.value);

//input validation to avoid letters
        if(isNaN(userAnswer)){
            feedbackElement.tentContent = 'Please enter a number!';
            return;
        }

//check answer and update score
        if(userAnswer === correctAnswer) {
            score++;
            feedbackElement.textContent = ' ✅ Correct!';
        } else {
            feedbackElement.textContent = ' ❌ Sorry that was inccorect the answer was ${correctAnswer}';
        }
            
//Update score display
    scoreElement.textContent = 'Score: ${score}';

//Next question or end game
    currentQuestion++;
    if (currentQuestion < totalQuestions) {
        setTimeout (generateQuestion, 1000);
    } else {
        setTimeout(showFinalScore, 1000);
    }      
}

//End of quiz results and scores
function showFinalScore() {
    localStorage.setItem('mathsQuizScore', score);
    window.location.href = 'result.html';
}

submitButton.addEventListener('click', checkAnswer);

generateQuestion();

});