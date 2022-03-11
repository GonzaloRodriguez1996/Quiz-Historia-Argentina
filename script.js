
const button = document.querySelector('button');
const popup = document.querySelector('.popup-wrapper');
const close = document.querySelector('.popup-close');
 
button.addEventListener('click', () => {
    popup.style.display = 'block';
});
 
close.addEventListener('click', () => {
    popup.style.display = 'none';
});
 
popup.addEventListener('click', e => {
    // console.log(e);
    if(e.target.className === 'popup-wrapper') {
        popup.style.display = 'none';
    }
});

function buildQuiz() {
  const output = [];

  myQuestions.forEach((currentQuestion, questionNumber) => {
    const answers = [];

    for (letter in currentQuestion.answers) {
      answers.push(
        `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
      );
    }

    output.push(
      `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
    );
  });

  quizContainer.innerHTML = output.join("");
}

function showResults() {
  const answerContainers = quizContainer.querySelectorAll(".answers");

  let numCorrect = 0;

  myQuestions.forEach((currentQuestion, questionNumber) => {
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    if (userAnswer === currentQuestion.correctAnswer) {
      numCorrect++;

      answerContainers[questionNumber].style.color = "rgb(36, 129, 24)";
    } else {
      answerContainers[questionNumber].style.color = "rgb(172, 36, 36)";
    }
  });

  //resultsContainer.innerHTML = `${numCorrect} de ${myQuestions.length}`;

  if (numCorrect <= 3) {
    // resultsContainer.innerHTML = `${numCorrect} de ${myQuestions.length}. Bastante flojo :(`;
    resultsContainer.innerHTML = `<div class="popup-wrapper">
    <div class="popup">
        <div class="popup-content">
        <h3 class="popup-title">Resultado: ${numCorrect} de ${myQuestions.length} </h3>
        <img src="./images/soltriste.gif" class="gif "width="40%" alt="gif de sol de mayo triste"/>

              <p class="results-text">Desastroso. Hiciste llorar al sol de Mayo con tu ignorancia. ¿Estás contento?</p>
              
        </div>
    </div>
</div> `;
  } if (numCorrect >= 7) {
    resultsContainer.innerHTML = `<div class="popup-wrapper">
    <div class="popup">
        <div class="popup-content">
        <h3 class="popup-title">Resultado: ${numCorrect} de ${myQuestions.length}.¡Wow!</h3>
        <img src="./images/solcapo.gif" class="gif "width="40%" alt="gif de sol sonriente con lentes negros"/>
              <p class="results-text">Definitivamente sos un crack de la historia </p>
              
        </div>
    </div>
</div> `;
  } if (numCorrect < 7 && numCorrect > 3 ) {
    resultsContainer.innerHTML = `<div class="popup-wrapper">
    <div class="popup">
        <div class="popup-content">
        <h3 class="popup-title">Resultado: ${numCorrect} de ${myQuestions.length}. ¡Nada mal!</h3>
        <img src="./images/solaverage.gif" class="gif "width="40%" alt="gif de sol de mayo con pulgares arriba"/>
              <p class="results-text">Tenés un conocimiento bastante aceptable, pero sin dudas podrias hacerlo un poquito mejor </p>
              
        </div>
    </div>
</div> `

  }
}




function showSlide(n) {
  slides[currentSlide].classList.remove("active-slide");
  slides[n].classList.add("active-slide");
  currentSlide = n;
  if (currentSlide === 0) {
    previousButton.style.display = "none";
  } else {
    previousButton.style.display = "inline-block";
  }
  if (currentSlide === slides.length - 1) {
    nextButton.style.display = "none";
    submitButton.style.display = "inline-block";
  } else {
    nextButton.style.display = "inline-block";
    submitButton.style.display = "none";
  }
}

function showNextSlide() {
  showSlide(currentSlide + 1);
}

function showPreviousSlide() {
  showSlide(currentSlide - 1);
}

const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");
const myQuestions = [
  {
    question: "¿En qué año se conformó el Congreso de Tucumán?",
    answers: { a: 1843, b: 1810, c: 1815 },
    correctAnswer: "c",
  },
  {
    question:
      "¿Quién fue el primer presidente de las Provincias Unidas del Río de la Plata?",
    answers: {
      a: "Cornelio Saavedra",
      b: "Bernardino Rivadavia",
      c: "Juan José Castelli",
    },
    correctAnswer: "a",
  },

  {
    question:
      "¿Qué actuales territorios nacionales participaron de la guerra de la Triple Alianza?",
    answers: {
      a: "Argentina, Brasil, Uruguay y Paraguay",
      b: "Argentina, Chile, Bolivia y Uruguay",
      c: "Argentina, Brasil, Chile y Paraguay",
    },
    correctAnswer: "a",
  },
  {
    question: "¿En qué ciudad se creó la bandera argentina?",
    answers: { a: "San Miguel de Tucumán", b: "Rosario", c: "Salta" },
    correctAnswer: "b",
  },
  {
    question: "¿Durante qué presidencia se instauró el modelo agroexportador?",
    answers: {
      a: "Domingo Faustino Sarmiento",
      b: "Carlos Pellegrini",
      c: "Julio Argentino Roca",
    },
    correctAnswer: "c",
  },
  {
    question: "¿Qué agrupación política encabezó la llamada Revolución del Parque en 1890?",
    answers: {
      a: "Unión Cívica",
      b: "Partido Socialista",
      c: "Partido Autonomista Nacional",
    },
    correctAnswer: "a",
  },
  {
    question: "¿Qué establecía la ley Sáenz Peña sancionada en 1912?",
    answers: {
      a: "Voto secreto, universal y obligatorio para los ciudadanos argentinos mayores de 18 años",
      b: 'Autorización del Poder Ejecutivo a expulsar del país a extranjeros cuya conducta "atentara contra el orden público"',
      c: "Derecho al descanso dominical para los trabajadores argentinos",
    },
    correctAnswer: "a",
    
  },
  {
    question: "¿A qué presidente derrocó el golpe de Estado que dió lugar a la llamada Década Infame?",
    answers: {
      a: "Manuel Quintana",
      b: "Marcelo Torcuato de Alvear",
      c: "Hipólito Irygoyen",
    },
    correctAnswer: "c",
  },
  {
    question: "¿Cuáles son los 3 pilares de la doctrina peronista?",
    answers: {
      a: "Liberación Popular, Justicia Social y Soberanía Política",
      b: "Justicia Social, Soberanía Política e Independencia Económica",
      c: "Justicia Social, Autonomía Económica y Poder Popular",
    },
    correctAnswer: "b",
  },
  
  

];

buildQuiz();

const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

showSlide(currentSlide);

submitButton.addEventListener("click", showResults);
previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);
