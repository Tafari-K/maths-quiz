document.addEventListener("DOMContentLoaded", function () {
    const finalScoreElement = document.getElementById("final-score");

    const score = localStorage.getItem("mathsQuizScore");

    if (score !== null) {
        finalScoreElement.textContent = ` You scored ${score} out of 10!`;
    } else {
        finalScoreElement.textContent = "No score found. Please play the quiz"
    }

});