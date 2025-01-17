const quizData = [
    {
      question: "What is the largest planet in our solar system?",
      options: ["Earth", "Jupiter", "Mars", "Saturn"],
      answer: "Jupiter",
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      options: ["William Shakespeare", "Mark Twain", "Charles Dickens", "Jane Austen"],
      answer: "William Shakespeare",
    },
    {
      question: "What is the capital city of Japan?",
      options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
      answer: "Tokyo",
    },
    {
      question: "What is the chemical symbol for gold?",
      options: ["Au", "Ag", "Fe", "Hg"],
      answer: "Au",
    },
    {
      question: "Which country is known as the Land of the Rising Sun?",
      options: ["China", "Japan", "South Korea", "Thailand"],
      answer: "Japan",
    },
    {
      question: "What is the largest mammal in the world?",
      options: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"],
      answer: "Blue Whale",
    },
    {
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
      answer: "Leonardo da Vinci",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Mercury", "Jupiter"],
      answer: "Mars",
    },
    {
      question: "What is the hardest natural substance on Earth?",
      options: ["Gold", "Iron", "Diamond", "Quartz"],
      answer: "Diamond",
    },
    {
      question: "What year did World War II end?",
      options: ["1942", "1945", "1948", "1950"],
      answer: "1945",
    },
    {
      question: "Which ocean is the largest in the world?",
      options: ["Atlantic", "Indian", "Arctic", "Pacific"],
      answer: "Pacific",
    },
    {
      question: "What is the smallest unit of life?",
      options: ["Cell", "Atom", "Molecule", "Organ"],
      answer: "Cell",
    },
    {
      question: "How many continents are there on Earth?",
      options: ["5", "6", "7", "8"],
      answer: "7",
    },
    {
      question: "Which organ in the human body is responsible for pumping blood?",
      options: ["Brain", "Lungs", "Heart", "Liver"],
      answer: "Heart",
    },
    {
      question: "What is the boiling point of water in Celsius?",
      options: ["50°C", "100°C", "150°C", "200°C"],
      answer: "100°C",
    },
    {
      question: "What is the largest desert in the world?",
      options: ["Sahara", "Gobi", "Arctic", "Antarctica"],
      answer: "Antarctica",
    },
    {
      question: "Which gas do plants primarily use for photosynthesis?",
      options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
      answer: "Carbon Dioxide",
    },
    {
      question: "What is the name of the longest river in the world?",
      options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
      answer: "Nile",
    },
    {
      question: "Who was the first person to step on the Moon?",
      options: ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "Michael Collins"],
      answer: "Neil Armstrong",
    },
    {
      question: "What is the square root of 64?",
      options: ["6", "7", "8", "9"],
      answer: "8",
    },
  ];
  
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  const questionEl = document.getElementById("question");
  const answersEl = document.getElementById("answers");
  const nextBtn = document.getElementById("next-btn");
  const progressEl = document.getElementById("progress");
  const scoreEl = document.getElementById("score");
  
  const startOverBtn = document.createElement("button");
  startOverBtn.textContent = "Start Over";
  startOverBtn.style.display = "none";
  startOverBtn.style.marginTop = "20px";
  startOverBtn.addEventListener("click", resetQuiz);
  document.querySelector("footer").appendChild(startOverBtn);
  
  function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    answersEl.innerHTML = "";
  
    currentQuestion.options.forEach((option) => {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.textContent = option;
      button.onclick = () => selectAnswer(button, currentQuestion.answer);
      li.appendChild(button);
      answersEl.appendChild(li);
    });
  
    progressEl.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
    nextBtn.disabled = true;
  }
  
  function selectAnswer(button, correctAnswer) {
    const allButtons = document.querySelectorAll("#answers button");
  
    allButtons.forEach((btn) => (btn.disabled = true));
  
    if (button.textContent === correctAnswer) {
      button.classList.add("correct");
      score++;
    } else {
      button.classList.add("incorrect");
    }
  
    nextBtn.disabled = false;
  }
  
  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
      loadQuestion();
    } else {
      showResults();
    }
  });
  
  function showResults() {
    questionEl.textContent = "Quiz Complete!";
    answersEl.innerHTML = "";
    nextBtn.style.display = "none";
    progressEl.style.display = "none";
    startOverBtn.style.display = "block";
  
    if (score === quizData.length) {
      displayConfetti();
      scoreEl.innerHTML = `<strong>Congratulations!</strong> You got all the questions correct! 🎉`;
    } else if (score >= 10) {
      scoreEl.innerHTML = `You scored ${score} out of ${quizData.length}. <strong>You almost had it!</strong>`;
    } else if (score >= 1) {
      scoreEl.innerHTML = `You scored ${score} out of ${quizData.length}. <strong>You did poorly.</strong>`;
    } else {
      scoreEl.innerHTML = `You scored ${score} out of ${quizData.length}. Better luck next time!`;
    }
  }
  
  
  function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.style.display = "block";
    progressEl.style.display = "block";
    startOverBtn.style.display = "none";
    scoreEl.textContent = "";
    loadQuestion();
  }
  
  function displayConfetti() {
    const confettiEl = document.createElement("div");
    confettiEl.id = "confetti";
    document.body.appendChild(confettiEl);
  
    confettiEl.innerHTML = `
      <style>
        @keyframes confetti {
          0% { transform: translateY(0); }
          100% { transform: translateY(100vh); }
        }
        #confetti {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
          z-index: 9999;
        }
        .confetti-piece {
          position: absolute;
          width: 10px;
          height: 10px;
          background-color: hsl(calc(360 * var(--hue)), 70%, 60%);
          animation: confetti 3s linear infinite;
        }
      </style>
    `;
  
    for (let i = 0; i < 100; i++) {
      const piece = document.createElement("div");
      piece.className = "confetti-piece";
      piece.style.setProperty("--hue", Math.random());
      piece.style.left = Math.random() * 100 + "%";
      piece.style.animationDelay = Math.random() * 2 + "s";
      piece.style.animationDuration = Math.random() * 3 + 2 + "s";
      confettiEl.appendChild(piece);
    }
  
    setTimeout(() => confettiEl.remove(), 5000);
  }
  
  loadQuestion();
  