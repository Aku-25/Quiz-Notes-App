// Retrieve and display the score from local storage
const score = localStorage.getItem("quizScore") || 0;
document.getElementById("score").textContent = score;

// Display feedback based on the score
const feedbackMessage = document.getElementById("feedback-message");
if (score >= 7) {
    feedbackMessage.textContent = "Great job!";
} else if (score >= 4) {
    feedbackMessage.textContent = "Good effort! Try to improve.";
} else {
    feedbackMessage.textContent = "Keep practicing to get a better score.";
}

// Save score to local storage and show confirmation
function saveScore() {
    const savedScores = JSON.parse(localStorage.getItem("savedScores")) || [];
    savedScores.push(score);
    localStorage.setItem("savedScores", JSON.stringify(savedScores));

    const confirmationMessage = document.getElementById("confirmation-message");
    confirmationMessage.style.display = "block";
    confirmationMessage.textContent = "Score saved!";
    setTimeout(() => {
        confirmationMessage.style.display = "none";
    }, 2000);
}

// Function to retake the quiz
function retakeQuiz() {
    // Clear quiz score and progress in local storage
    localStorage.removeItem("quizScore");
    localStorage.removeItem("quizState");

    // Redirect to the quiz page
    window.location.href = "quiz.html";
}
