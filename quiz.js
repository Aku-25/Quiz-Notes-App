// Predefined set of quiz questions
const quizData = [
    { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Rome"], answer: "Paris" },
    { question: "What is the largest planet in our solar system?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Jupiter" },
    { question: "What is the chemical symbol for water?", options: ["O2", "H2O", "CO2", "NaCl"], answer: "H2O" },
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
    { question: "What is the capital of Japan?", options: ["Seoul", "Tokyo", "Beijing", "Bangkok"], answer: "Tokyo" },
    { question: "Who wrote 'To Kill a Mockingbird'?", options: ["Harper Lee", "J.K. Rowling", "Ernest Hemingway", "Mark Twain"], answer: "Harper Lee" },
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Venus", "Mars", "Jupiter"], answer: "Mars" },
    { question: "What is the boiling point of water?", options: ["100°C", "50°C", "212°F", "0°C"], answer: "100°C" },
    { question: "Who developed the theory of relativity?", options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"], answer: "Albert Einstein" },
    { question: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: "Pacific" }
  ];
  
  // Quiz state variables
  let currentQuestionIndex = 0;
  let score = 0;
  
  // Display the current question
  function displayQuestion() {
    const questionData = quizData[currentQuestionIndex];
    document.getElementById("question-text").textContent = questionData.question;
    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";
  
    questionData.options.forEach(option => {
      const optionButton = document.createElement("button");
      optionButton.textContent = option;
      optionButton.classList.add("option-button");
      optionButton.onclick = () => checkAnswer(optionButton, option);
      optionsContainer.appendChild(optionButton);
    });
  
    updateProgress();
  }
  
  // Check the answer and give feedback
  function checkAnswer(optionButton, selectedOption) {
    const questionData = quizData[currentQuestionIndex];
    const isCorrect = selectedOption === questionData.answer;
  
    optionButton.classList.add(isCorrect ? "correct" : "incorrect");
    document.getElementById("feedback").textContent = isCorrect ? "Correct!" : "Incorrect!";
    
    if (isCorrect) score++;
    disableOptions();
  }
  
  // Disable options after an answer is selected
  function disableOptions() {
    const optionButtons = document.querySelectorAll(".option-button");
    optionButtons.forEach(button => button.disabled = true);
  }
  
  // Move to the next question
  function nextQuestion() {
    if (currentQuestionIndex < quizData.length - 1) {
      currentQuestionIndex++;
      document.getElementById("feedback").textContent = "";
      displayQuestion();
    } else {
      endQuiz();
    }
  }
  
  // End the quiz, display final message, and restart after delay
  function endQuiz() {
    // Display final score and message
    document.getElementById("question-text").textContent = "Quiz Completed!";
    document.getElementById("options-container").innerHTML = `<p>Your final score is ${score} out of ${quizData.length}</p>`;
    document.getElementById("feedback").textContent = "Restarting quiz...";
  
    // Hide the Next button
    document.getElementById("next-btn").style.display = "none";
  
    // Restart quiz after 3 seconds
    setTimeout(() => {
      currentQuestionIndex = 0;
      score = 0;
      document.getElementById("feedback").textContent = "";
      document.getElementById("next-btn").style.display = "block";
      displayQuestion();
      updateProgress();
    }, 3000); // Delay of 3 seconds
  }
  
  // Update progress display
  function updateProgress() {
    document.getElementById("progress").textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
    document.getElementById("score").textContent = `Score: ${score}`;
  }
  
  // Initialize the quiz
  displayQuestion();
  