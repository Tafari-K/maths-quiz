document.addEventListener("DOMContentLoaded", function () {
    const finalScoreElement = document.getElementById("final-score");
    const leaderboardElement = document.getElementById("leaderboard");
    const scoreForm = document.getElementById("score-form");
    const clearScoresBtn = document.getElementById("clear-scores");

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

        if (leaderboard.length === 0) {
            clearScoresBtn.style.display = "none"; // hide if no scores
        } else {
            clearScoresBtn.style.display = "block"; // show if scores exist
        }

        leaderboard.sort((a, b) => b.score - a.score);

        leaderboard.forEach((player, index) => {
            const li = document.createElement("li");
            li.textContent = `${index + 1}. ${player.name}: ${player.score}`;
            leaderboardElement.appendChild(li);
        });
    }

    renderLeaderboard();

    // Check if this game score was already submitted
    const alreadySubmitted = localStorage.getItem("scoreSubmitted") === "true";
    if (alreadySubmitted) {
        document.getElementById("player-name").disabled = true;
        scoreForm.querySelector("button[type='submit']").disabled = true;
    }

    // Handle score submission
    scoreForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (localStorage.getItem("scoreSubmitted") === "true") {
            alert("You've already submitted this score. Play again to submit a new one.");
            return;
        }

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

        const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
        leaderboard.push({ name: playerName, score: score });
        localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

        // Mark this score as submitted
        localStorage.setItem("scoreSubmitted", "true");

        renderLeaderboard();

        // Lock form
        playerNameInput.disabled = true;
        scoreForm.querySelector("button[type='submit']").disabled = true;
    });

    // Clear Scores Button logic
    clearScoresBtn.addEventListener("click", function () {
        if (confirm("Are you sure you want to clear all scores?")) {
            localStorage.removeItem("leaderboard");
            localStorage.removeItem("scoreSubmitted");
            renderLeaderboard(); // refresh empty leaderboard
        }
    });
});
