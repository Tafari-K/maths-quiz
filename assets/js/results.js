document.addEventListener("DOMContentLoaded", function () {
    const finalScoreElement = document.getElementById("final-score");
    const leaderboardElement = document.getElementById("leaderboard");
    const scoreForm = document.getElementById("score-form");

    // Get score from localStorage and ensure it's a number
    const score = parseInt(localStorage.getItem("mathsQuizScore"), 10);

    if (!isNaN(score)) {
        finalScoreElement.textContent = `You scored ${score} out of 10!`;
    } else {
        finalScoreElement.textContent = "No score found. Please play the quiz.";
    }

    // Function to render leaderboard
    function renderLeaderboard() {
        leaderboardElement.innerHTML = "";

        const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

        leaderboard.sort((a, b) => b.score - a.score);

        leaderboard.forEach((player, index) => {
            const li = document.createElement("li");
            li.textContent = `${index + 1}. ${player.name}: ${player.score}`;
            leaderboardElement.appendChild(li);
        });
    }

    renderLeaderboard();

    // Handle score submission
    scoreForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const playerNameInput = document.getElementById("player-name");
        const playerName = playerNameInput.value.trim();

        if (!playerName) {
            alert("Please enter your name before submitting.");
            return;
        }

        if (isNaN(score)) {
            alert("No score available to submit.");
            return;
        }
        const leaderboard = JSON.parse(localStorage.getItem("leaderboard"))
            if (leaderboard.length>0) {
                alert("You've already submitted your score - play again to submit a new one.");
                return;
            }
        // Single save entry
        localStorage.setItem("leaderboard", JSON.stringify([{
            name: playerName, score: score}
        ]));

        playerNameInput.value = ""; 

        renderLeaderboard();

        playerNameInput.disabled = true;
        scoreForm.querySelector("button[type='submit']").disabled = true;
    });
});
