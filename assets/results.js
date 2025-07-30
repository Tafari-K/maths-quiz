document.addEventListener("DOMContentLoaded", function () {
    const finalScoreElement = document.getElementById("final-score");
    const leaderboardElement = document.getElementById("leaderboard");
    const scoreForm = document.getElementById("score-form");

    const score = localStorage.getItem("mathsQuizScore");

    if (score !== null) {
        finalScoreElement.textContent = ` You scored ${score} out of 10!`;
    } else {
        finalScoreElement.textContent = "No score found. Please play the quiz"
    }

    leaderboardElement.innerHTML = "";
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard.forEach((player, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${player.name}: ${player.score}`;
        leaderboardElement.appendChild(li);
    });

    scoreForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const playerName = document.getElementById("player-name").value;
        const score = localStorage.getItem("mathsQuizScore");
        const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
        leaderboard.push({ name: playerName, score: score });
        localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
        leaderboardElement.innerHTML = "";
        leaderboard.sort((a, b) => b.score - a.score);
        leaderboard.forEach((player, index) => {
            const li = document.createElement("li");
            li.textContent = `${index + 1}. ${player.name}: ${player.score}`;
            leaderboardElement.appendChild(li);
        });
    });
})