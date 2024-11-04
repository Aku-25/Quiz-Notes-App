function setGreetingMessage(){
    const greetingElement = document.getElementById('greeting-message'); 
    const subGreetingElement = document.getElementById('sub-greeting');
    const currentHour = new Date().getHours();
    let greeting;
    if(currentHour >= 5 && currentHour < 12){
        greeting = "Good Morning!";
    }   
    else if(currentHour >= 12 && currentHour < 17){
        greeting  = "Good Afternoon !";
    }
    else if(currentHour >= 17 && currentHour < 21){
        greeting = "Good Evening !";
    }
    else{
        greeting = "Welcome!";
    }
    greetingElement.textContent = greeting;
    subGreetingElement.textContent = "select an option to get started";
}
// Apply animations to buttons
function animateButtons(){
    const buttons = document.querySelectorAll('.nav-button');
    buttons.forEach((button,index) => {
        setTimeout(() => {
            button.classList.add('animated-in');
        },index * 200);//staggered animation
    });
}
// Navigation function
function navgateTo(page) {
    const pageMap = {
      quiz: "quiz.html",
      result: "result.html",
      notes: "notes.html",
      history: "history.html",
    };
  
    if (page in pageMap) {
      window.location.href = pageMap[page];
    } else {
      console.error("Invalid page specified");
    }
  }
  
  // Initialize page
  setGreetingMessage();
  animateButtons();
  