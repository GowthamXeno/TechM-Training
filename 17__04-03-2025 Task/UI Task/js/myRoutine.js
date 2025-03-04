document.addEventListener("DOMContentLoaded", function () {
  const routineContainer = document.getElementById("routineContainer");
  const storedRoutines = JSON.parse(localStorage.getItem("fitnessRoutines")) || [];

  if (storedRoutines.length === 0) {
    showNoRoutineMessage();
  } else {
    displayRoutines(storedRoutines);
  }
});

// Function to display a message if no routines are found
function showNoRoutineMessage() {
  const routineContainer = document.getElementById("routineContainer");
  routineContainer.innerHTML = `
        <div class="text-center mt-5">
            <h3>No routines available</h3>
            <p>Click below to create a new routine.</p>
            <button class="btn btn-primary" onclick="redirectToCreateRoutine()">Create Routine</button>
        </div>
    `;
}

function redirectToCreateRoutine() {
  window.location.href = "CreateRoutine.html";
}

// Function to generate a unique ID
function generateId() {
  return 'id-' + Math.random().toString(36).substr(2, 9);
}

// Function to get formatted date and time
function getFormattedDateTime() {
  let now = new Date();
  return now.toLocaleString(); // Format: MM/DD/YYYY, HH:MM:SS AM/PM
}

// Function to log routine actions
function logRoutineAction(id, name, action, exercises, createdAt, completedAt = null) {
  let logs = JSON.parse(localStorage.getItem("routineLogs")) || [];
  logs.push({
    id,
    name,
    action,
    exercises,
    createdAt,
    completedAt,
    timestamp: getFormattedDateTime()
  });

  localStorage.setItem("routineLogs", JSON.stringify(logs));
}

// Function to display stored routines
function displayRoutines(routines) {
  const routineContainer = document.getElementById("routineContainer");
  routineContainer.innerHTML = "";

  routines.forEach((routine, index) => {
    const routineCard = document.createElement("div");
    routineCard.classList.add("col-md-4");
    routineCard.innerHTML = `
        <div class="card shadow-sm p-3">
            <h5 class="text-center">${routine.name}</h5>
            <div class="d-flex flex-wrap justify-content-between mt-3">
                <button class="btn custom-btn text-primary" onclick="openExerciseModal(${index})">View Exercises</button>
                <button class="btn custom-btn text-success" onclick="markCompleted(${index})" ${routine.completed ? "disabled" : ""}>
                    ${routine.completed ? "✅ Completed" : "Mark as Completed"}
                </button>
                <button class="btn custom-btn text-warning" onclick="repeatRoutine(${index})">Repeat</button>
                <button class="btn custom-btn text-danger" onclick="deleteRoutine(${index})">Delete Routine</button>
            </div>
        </div>
    `;
    routineContainer.appendChild(routineCard);
  });
}

// Function to open exercise modal
function openExerciseModal(index) {
  const storedRoutines = JSON.parse(localStorage.getItem("fitnessRoutines")) || [];
  const routine = storedRoutines[index];

  const exerciseList = document.getElementById("exerciseList");
  exerciseList.innerHTML = `
    <p><strong>Created:</strong> ${routine.createdAt}</p>
    ${routine.completedAt ? `<p><strong>Completed:</strong> ${routine.completedAt}</p>` : ""}
    <hr>
    ${routine.exercises.map(exercise => `<p>${exercise.name} - ${exercise.reps} reps</p>`).join("")}
  `;

  const modal = new bootstrap.Modal(document.getElementById("exerciseModal"));
  modal.show();
}

// Function to mark a routine as completed
function markCompleted(index) {
  let storedRoutines = JSON.parse(localStorage.getItem("fitnessRoutines")) || [];
  let routine = storedRoutines[index];

  routine.completed = true;
  routine.completedAt = getFormattedDateTime(); // Store completion time

  // Log completion
  logRoutineAction(routine.id, routine.name, "Completed", routine.exercises, routine.createdAt, routine.completedAt);

  localStorage.setItem("fitnessRoutines", JSON.stringify(storedRoutines));
  displayRoutines(storedRoutines);
}

// Function to delete a routine (but log it before deletion)
function deleteRoutine(index) {
  let storedRoutines = JSON.parse(localStorage.getItem("fitnessRoutines")) || [];
  let routine = storedRoutines[index];

  storedRoutines.splice(index, 1);
  localStorage.setItem("fitnessRoutines", JSON.stringify(storedRoutines));

  if (storedRoutines.length === 0) {
    showNoRoutineMessage();
  } else {
    displayRoutines(storedRoutines);
  }
}

// Function to repeat a routine
function repeatRoutine(index) {
  let storedRoutines = JSON.parse(localStorage.getItem("fitnessRoutines")) || [];

  if (index >= 0 && index < storedRoutines.length) {
    let originalRoutine = storedRoutines[index];

    // Create a new routine with the same exercises but reset `completed` status
    let newRoutine = {
      id: generateId(),
      name: originalRoutine.name,
      exercises: originalRoutine.exercises.map(exercise => ({
        ...exercise
      })),
      completed: false,
      createdAt: getFormattedDateTime(), // Set new creation timestamp
      completedAt: null // Reset completion time
    };

    storedRoutines.push(newRoutine);
    localStorage.setItem("fitnessRoutines", JSON.stringify(storedRoutines));

    alert("Routine repeated successfully!");
    displayRoutines(storedRoutines);
  }
}
