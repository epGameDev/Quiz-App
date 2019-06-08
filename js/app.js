import Question from "./question.js";
import Quiz from "./quiz.js";

// IIFE = Immediately Invoked Function Expression
const App = (() => {
    //Cache the DOM
    const quizEl = document.querySelector(".jab_quiz");
    const quizQuestionEl = document.querySelector(".question__header");
    const trackerEl = document.querySelector(".quiz__tracker");
    const progressBarEl = document.querySelector(".progress__fill");
    const tagelineEL = document.querySelector(".tagline");
    const choicesEl = document.querySelector(".choices");
    const choiceEl = document.querySelector(".choice");
    const nextButtonEl = document.querySelector(".next");
    const restartButtonEl = document.querySelector(".restart");

    ////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////--QUIZ QUESTION LIST--///////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////
    const q0 = new Question("When was the Nintendo Entertainment System released?", ["1992", "1985", "1986", "1981"], 1);
    const q1 = new Question("When was the last episode of Friends aired?", ["June 12, 1999", "April 11 2009", "September 21 1989", "May 6, 2004"], 3);
    const q2 = new Question("In the 90's, what was the product Dunkaroos?", ["Laundry Hoop", "Pool Toy", "Snack Item", "Apple Bobbing"], 2);
    const q3 = new Question("Who is Michael Jordan", ["Pop Singer", "Actor", "Shoe Maker", "Basketball Player"], 3);
    const q4 = new Question("What was Microsofts most loved operating system?", ["Windows 98", "Windows 7", "Windows XP", "Windows 10"], 2);
    const q5 = new Question("What is the programming language of the web?", ["JavaScript", "HTML", "CSS", "Python"], 0);
    const q6 = new Question("Who played as Loyd Christmas in the 90's movie Dumb & Dummber", ["Mike Myers", "Jim Carrey", "Robin Williams", "Will Smith"], 1);
    const q7 = new Question("The raspberry pi computer was created for what purpose?", ["Gaming", "Home Security", "Education", "Media"], 2);
    const q8 = new Question("What Nintendo game character was characterized as a foul mouth squirel?", ["Banjo", "Diddy", "Timber", "Conker"], 3);
    const q9 = new Question("What role in the movie Naked Gun did Leslie Nielson play?", ["Detective", "Air Force Pilot", "Track Runner", "Robber"], 0);
    ////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////

    const quiz = new Quiz([q0, q1, q2, q3, q4, q5, q6, q7, q8, q9]);


    const listeners = _ => {
        nextButtonEl.addEventListener('click', () => {
            const selectedRadioElem = document.querySelector('input[name="choice"]:checked');
            if (selectedRadioElem) {
                // const key = selectedRadioElem.getAttribute("id").slice(6,7);
                const key = Number(selectedRadioElem.getAttribute("data-order"));
                quiz.guess(key);
                renderAll();

            } // else {
            //     alert("Please select a value.")
            // }


        })

        restartButtonEl.addEventListener('click', () => {
            quiz.reset();
            setValue(tagelineEL, 'Pick An Option Below!');
            nextButtonEl.style.opacity = 0.9;
            renderAll();
        })
    }


    //Changes htmlvalue to JS value.
    const setValue = (elem, value) => {
        elem.innerHTML = value;
    }

    const renderQuestion = _ => {
        const question = quiz.getCurrentQuestion().question;
        setValue(quizQuestionEl, question);
    }

    const renderChoicesElems = _ => {
        let markUp = "";
        const currentChoices = quiz.getCurrentQuestion().choices;
        currentChoices.forEach((element, index) => {
            markUp += `
            <li class = "choice">
            <input type = "radio" name = "choice" class = "input" data-order="${index}" id="choice${index}" >
            <label for = "choice${index}" class="quiz__label">
            <i> </i>
            <span>${element}</span>
            </label> 
            </li>
            `
            choicesEl.innerHTML = markUp;
            setValue(choicesEl, markUp);
        });
    }

    const renderTacker = _ => {
        const index = quiz.currentIndex;
        setValue(trackerEl, `${index + 1} of ${quiz.questions.length}`);
    }

    const getPercentage = (num1, num2) => {
        return (num1 / num2) * 100;
    }

    const renderProgress = _ => {
        const progress = getPercentage(quiz.currentIndex, quiz.questions.length);
        progressBarEl.style.width = progress + "%";

    }

    const renderEndScreen = _ => {
        setValue(quizQuestionEl, 'Great Job!!!');
        setValue(tagelineEL, 'COMPLETE');
        setValue(trackerEl, `Your Score: ${getPercentage(quiz.score, quiz.questions.length)}%`);
        nextButtonEl.style.opacity = 0;
        renderProgress();
    }

    const renderAll = _ => {
        if (quiz.endGame()) {
            renderEndScreen();

        } else {
            listeners();
            renderQuestion();
            renderChoicesElems();
            renderTacker();
            renderProgress();
        }
    }

    return {
        renderAll: renderAll
    }
})();

App.renderAll();