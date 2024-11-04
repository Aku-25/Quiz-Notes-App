// Fetch and display quiz history from local storage
function loadHistory() {
    const historyList = document.getElementById("history-list");
    historyList.innerHTML = "";

    const savedScores = JSON.parse(localStorage.getItem("savedScores")) || [];

    if (savedScores.length === 0) {
        historyList.innerHTML = "<li>No quiz history available.</li>";
        return;
    }

    savedScores.forEach((score, index) => {
        const listItem = document.createElement("li");
        listItem.classList.add("history-item");

        const scoreText = document.createElement("span");
        scoreText.textContent = `Score: ${score}`;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");
        deleteButton.onclick = () => deleteScore(index);

        listItem.appendChild(scoreText);
        listItem.appendChild(deleteButton);
        historyList.appendChild(listItem);
    });
}

// Delete an individual score
function deleteScore(index) {
    if (confirm("Are you sure you want to delete this record?")) {
        const savedScores = JSON.parse(localStorage.getItem("savedScores")) || [];
        savedScores.splice(index, 1);
        localStorage.setItem("savedScores", JSON.stringify(savedScores));
        loadHistory(); // Refresh the displayed history
    }
}

// Clear all quiz history
function clearHistory() {
    if (confirm("Are you sure you want to clear all history?")) {
        localStorage.removeItem("savedScores");
        loadHistory(); // Refresh the displayed history
    }
}

// Initialize and load history on page load
document.addEventListener("DOMContentLoaded", loadHistory);
