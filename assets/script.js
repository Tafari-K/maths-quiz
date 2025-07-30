function generateQuestion() {
    let num1, num2;
    const operators = ["+", "-", "*", "/"];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    if (operator === "/") {
        correctAnswer = Math.floor(Math.random() * 5) + 1; // answer 1–5
        num2 = Math.floor(Math.random() * 9) + 1; // divisor 1–9
        num1 = correctAnswer * num2;
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
