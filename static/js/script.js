/* Adding a new question */
const addQuestionBtn = document.getElementById("btn-add");
const questionTypeSelect = document.querySelector(".question-type");
const questionInput = document.getElementById("question-text");
const questionsContainer = document.getElementById("questions-container");

if (addQuestionBtn && questionTypeSelect && questionInput && questionsContainer) {
  addQuestionBtn.addEventListener("click", addQuestion);
}

function addQuestion() {
  const type = questionTypeSelect.value;
  const questionText = questionInput.value.trim();

  if (!questionText) {
    return;
  }

  const questionDiv = document.createElement("div");
  questionDiv.classList.add("question-item");

  if (type === "multiple") {
    questionDiv.innerHTML = `
      <h3>${questionText}</h3>
      <p>Select the correct answer:</p>
      <div class="options">
        <label>
          <input type="radio" name="answer-${Date.now()}" value="1">
          <input type="text" placeholder="Option 1" required>
        </label>
        <label>
          <input type="radio" name="answer-${Date.now()}" value="2">
          <input type="text" placeholder="Option 2" required>
        </label>
        <label>
          <input type="radio" name="answer-${Date.now()}" value="3">
          <input type="text" placeholder="Option 3">
        </label>
        <label>
          <input type="radio" name="answer-${Date.now()}" value="4">
          <input type="text" placeholder="Option 4">
        </label>
      </div>
    `;
  } else if (type === "text") {
    questionDiv.innerHTML = `
      <h3>${questionText}</h3>
      <input type="text"  class="input" placeholder="Correct answer.." required>
    `; 
  } else if (type === "boolean") {
    const groupName = `answer-${Date.now()}`;
    questionDiv.innerHTML = `
      <h3>${questionText}</h3>
      <label>
        <input type="radio" name="${groupName}" value="true">
        True
      </label>
      <label>
        <input type="radio" name="${groupName}" value="false">
        False
      </label>
    `;
  }

  questionsContainer.appendChild(questionDiv);
  questionDiv.scrollIntoView();

  if(type === "text" || type === "multiple" ){
    const answerInput = questionDiv.querySelector('input[type="text"]');
    if(answerInput){
      answerInput.focus();
    }

  }

  questionInput.value = "";
}


const messages = [
  "Keep practicing! You'll do better next time! 📚",
  "Good effort! Room for improvement! 💪",
  "Well done! Solid performance! 👏",
  "Excellent work! Almost perfect! 🌟",
  "Perfect score! You're a genius! 🏆",
];

/* Opening modal confirmation when clicking on delete quiz button */
const modal = document.getElementById("deleteModal");
const openBtn = document.getElementById("openDeleteModal");
const cancelBtn = document.getElementById("cancelDelete");
const confirmBtn = document.getElementById("confirmDelete");
const deleteForm = document.getElementById("delete-form");

if (modal && openBtn && cancelBtn && confirmBtn && deleteForm) {
  openBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  cancelBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  confirmBtn.addEventListener("click", () => {
    deleteForm.submit();
  });
}
