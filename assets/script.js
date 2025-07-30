document.addEventListener("DOMContentLoaded", function () {
    //Game settings
    const totalQuestions = 10;
    let currentQuestion = 0;
    let score = 0;

    //Elements from HTML page
    const questionElement = document.getElementById("question");
    const answerInput = document.getElementById("answer");
    const submitButton = document.getElementById("submit-btn");
    const feedbackElement = document.getElementById("feedback");
    const scoreElement = document.getElementById("score");
    const answerForm = document.getElementById("answer-form");

    //Current correct answer
    let correctAnswer = 1;

    //Math question logic
    function generateQuestion() {
        if (operator === "/") {
            correctAnswer = Math.floor(random() * 5) + 1;
            num2 = Math.floor(Math.random() * 9) + 1;
            num1 = correctAnswer * num2;
        } else {
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
        }

        
        // Prevent division by zero
        if (operator === "/" && num2 === 0) {
            num2 = 1;
        }
        
        //Calculate correct answer safely
        switch (operator) {
            case "+": correctAnswer = num1 + num2; break;
            case "-": correctAnswer = num1 - num2; break;
            case "*": correctAnswer = num1 * num2; break;
            case "/": correctAnswer = num1 / num2; break;
        }

        let displayOperator;
            switch (operator) {
            case "+": displayOperator = "+"; break;
            case "-": displayOperator = "−"; break;
            case "*": displayOperator = "×"; break;
            case "/": displayOperator = "÷"; break;
        }

        //Update
        const questionText = `${num1} ${displayOperator} ${num2}`;
        questionElement.textContent = `Question ${currentQuestion + 1}: ${questionText}`;
        answerInput.value = "";
        feedbackElement.textContent = "";
    }

    answerForm.addEventListener("submit", (e) => e.preventDefault());
    //Check user answer
    function checkAnswer() {
        const userAnswer = parseFloat(answerInput.value);

        if (isNaN(userAnswer)) {
            feedbackElement.textContent = "⚠️ Please enter a valid number!";
            return;
        }

        if (userAnswer === correctAnswer) {
            score++;
            feedbackElement.textContent = "✅ Yes, correct!";
        } else {
            feedbackElement.textContent = `❌ Sorry, that was incorrect. The answer was ${correctAnswer}`;
        }

        scoreElement.textContent = `Score: ${score}`;
        currentQuestion++;

        if (currentQuestion < totalQuestions) {
            setTimeout(generateQuestion, 1000);
        } else {
            setTimeout(showFinalScore, 1000);
        }
    }

    //End of quiz
    function showFinalScore() {
        localStorage.setItem("mathsQuizScore", score);
        window.location.href = "results.html";
    }

    submitButton.addEventListener("click", checkAnswer);
    generateQuestion();
});
