document.addEventListener("DOMContentLoaded", function () {
    // Game settings
    const totalQuestions = 10;
    let currentQuestion = 0;
    let score = 0;

    // Elements from HTML page
    const questionElement = document.getElementById("question");
    const answerInput = document.getElementById("answer");
    const submitButton = document.getElementById("submit-btn");
    const feedbackElement = document.getElementById("feedback");
    const scoreElement = document.getElementById("score");
    const answerForm = document.getElementById("answer-form"); // ✅ added definition

    // Current correct answer
    let correctAnswer = 1;

    // Math question logic
    function generateQuestion() {
        let num1, num2;
        const operators = ["+", "-", "*", "/"];
        const operator = operators[Math.floor(Math.random() * operators.length)];

        if (operator === "/") {
            // Ensure answer is a whole number between 1 and 5
            correctAnswer = Math.floor(Math.random() * 5) + 1; // 1–5
            num2 = Math.floor(Math.random() * 9) + 1; // 1–9
            num1 = correctAnswer * num2; // makes num1 ÷ num2 = correctAnswer
        } else {
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;

            switch (operator) {
                case "+": correctAnswer = num1 + num2; break;
                case "-": correctAnswer = num1 - num2; break;
                case "*": correctAnswer = num1 * num2; break;
            }
        }

        let displayOperator;
        switch (operator) {
            case "+": displayOperator = "+"; break;
            case "-": displayOperator = "−"; break;
            case "*": displayOperator = "×"; break;
            case "/": displayOperator = "÷"; break;
        }

        const questionText = `${num1} ${displayOperator} ${num2}`;
        questionElement.textContent = `Question ${currentQuestion + 1}: ${questionText}`;
        answerInput.value = "";
        feedbackElement.textContent = "";
    }

    // Prevent form submit reload
    answerForm.addEventListener("submit", (e) => e.preventDefault());

    // Check user answer
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

    // End of quiz
    function showFinalScore() {
        localStorage.setItem("mathsQuizScore", score);
        window.location.href = "results.html";
    }

    // Event listener for submit button
    submitButton.addEventListener("click", checkAnswer);

    // Start first question
    generateQuestion();
});
