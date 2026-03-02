let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [
    { question: "What is HTML?", answer: "HTML is used to structure web pages." },
    { question: "What is CSS?", answer: "CSS styles web pages." }
];

let currentIndex = 0;
let showingAnswer = false;

function saveToLocalStorage() {
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
}

function displayCard() {
    const cardText = document.getElementById("cardText");

    if (flashcards.length === 0) {
        cardText.innerText = "No flashcards available";
        return;
    }

    showingAnswer = false;
    cardText.innerText = flashcards[currentIndex].question;
}

function toggleAnswer() {
    if (flashcards.length === 0) return;

    const cardText = document.getElementById("cardText");

    if (!showingAnswer) {
        cardText.innerText = flashcards[currentIndex].answer;
        showingAnswer = true;
    } else {
        cardText.innerText = flashcards[currentIndex].question;
        showingAnswer = false;
    }
}

function nextCard() {
    if (flashcards.length === 0) return;

    currentIndex = (currentIndex + 1) % flashcards.length;
    displayCard();
}

function previousCard() {
    if (flashcards.length === 0) return;

    currentIndex = (currentIndex - 1 + flashcards.length) % flashcards.length;
    displayCard();
}

function addCard() {
    const question = document.getElementById("questionInput").value.trim();
    const answer = document.getElementById("answerInput").value.trim();

    if (!question || !answer) {
        alert("Please enter both question and answer!");
        return;
    }

    flashcards.push({ question, answer });
    saveToLocalStorage();

    document.getElementById("questionInput").value = "";
    document.getElementById("answerInput").value = "";

    currentIndex = flashcards.length - 1;
    displayCard();
}

function editCard() {
    if (flashcards.length === 0) return;

    const question = document.getElementById("questionInput").value.trim();
    const answer = document.getElementById("answerInput").value.trim();

    if (!question || !answer) {
        alert("Enter updated question and answer!");
        return;
    }

    flashcards[currentIndex] = { question, answer };
    saveToLocalStorage();
    displayCard();
}

function deleteCard() {
    if (flashcards.length === 0) return;

    flashcards.splice(currentIndex, 1);
    saveToLocalStorage();

    if (currentIndex > 0) currentIndex--;
    displayCard();
}

displayCard();