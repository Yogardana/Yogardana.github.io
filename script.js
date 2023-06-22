
  function submitForm(event) {
    event.preventDefault(); // Menghentikan pengiriman form secara default
    var usernameInput = document.getElementById("username");
    var username = usernameInput.value;
    localStorage.setItem("username", username); // Menyimpan username di localStorage
    window.location.href = "home.html"; // Pindah ke halaman 
  }
  
  var username = localStorage.getItem("username");
  var greeting = document.getElementById("greeting");
  greeting.textContent = "Hey, " + username + "!";


//button add
window.addEventListener('DOMContentLoaded', (event) => {
  const addButton = document.querySelector('button[type="button"]');
  const habitForm = document.getElementById("habitForm");

  addButton.addEventListener('click', () => {
    toggleFormVisibility();
  });

  function toggleFormVisibility() {
    if (habitForm.style.display === "none") {
      habitForm.style.display = "block";
    } else {
      habitForm.style.display = "none";
    }
  }
});


function saveHabit(event) {
  event.preventDefault();

  const habitName = document.getElementById('habitNameInput').value;
  const checkboxes = document.querySelectorAll('.form-container .checkboxes input[type="checkbox"]:checked');

  const habit = {
      name: habitName,
      frequency: []
  };

  checkboxes.forEach(checkbox => {
      const day = checkbox.getAttribute('data-day');
      habit.frequency.push(day);
  });

  if (habit.name !== '' && habit.frequency.length > 0) {
      createHabitCard(habit);
  }

  document.getElementById('habitNameInput').value = '';
  checkboxes.forEach(checkbox => checkbox.checked = false);

  updateProgressCircle();
}

function createHabitCard(habit) {
  const cardContainer = document.getElementById('cardContainer');

  if (cardContainer.childElementCount >= 6) {
      return;
  }

  const card = document.createElement('div');
  card.className = 'card';

  const habitName = document.createElement('h4');
  habitName.textContent = habit.name;

  const checkboxes = document.createElement('div');
  checkboxes.className = 'checkboxes';

  const count = document.createElement('div');
  count.className = 'count';

  const status = document.createElement('div');
  status.className = 'status';

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  days.forEach(day => {
    const checkboxContainer = document.createElement('div');
    checkboxContainer.className = 'checkbox-container';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.setAttribute('data-day', day);
    checkbox.disabled = !habit.frequency.includes(day);

    const label = document.createElement('label');
    label.textContent = day;

    const dayContainer = document.createElement('div');
    dayContainer.className = 'day-container';
    dayContainer.appendChild(checkbox);
    dayContainer.appendChild(label);

    checkboxContainer.appendChild(dayContainer);
    checkboxes.appendChild(checkboxContainer);
});


  card.appendChild(habitName);
  card.appendChild(checkboxes);
  card.appendChild(count);
  card.appendChild(status);

  cardContainer.appendChild(card);

  updateCardCount(card);
  updateCardStatus(card);
}

function isCheckboxDisabled(frequency, day) {
  return frequency.includes(day) ? '' : 'disabled';
}

function updateCardCount(card) {
  const checkboxes = card.querySelectorAll('.checkboxes input[type="checkbox"]:not(:disabled)');

  checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
          updateCardStatus(card);
          updateProgressCircle();
      });
  });

  updateCardStatus(card);
  updateProgressCircle();
}

function updateCardStatus(card) {
  const checkboxes = card.querySelectorAll('.checkboxes input[type="checkbox"]:not(:disabled)');
  const checkedCheckboxes = card.querySelectorAll('.checkboxes input[type="checkbox"]:not(:disabled):checked');

  const count = card.querySelector('.count');
  count.textContent = `Streak: ${checkedCheckboxes.length} / ${checkboxes.length}`;

  const status = card.querySelector('.status');
  status.textContent = `Status: ${checkedCheckboxes.length === checkboxes.length ? 'Completed' : 'Incomplete'}`;
}

function updateProgressCircle() {
  const cardContainer = document.getElementById('cardContainer');
  const cards = cardContainer.querySelectorAll('.card');
  const totalCheckboxes = cardContainer.querySelectorAll('.checkboxes input[type="checkbox"]:not(:disabled)').length;
  let totalCheckedCheckboxes = 0;

  cards.forEach(card => {
      const checkedCheckboxes = card.querySelectorAll('.checkboxes input[type="checkbox"]:not(:disabled):checked');
      totalCheckedCheckboxes += checkedCheckboxes.length;
  });

  const progressCircle = document.getElementById('progressCircle');
  const percentage = Math.floor((totalCheckedCheckboxes / totalCheckboxes) * 100);
  progressCircle.textContent = `${percentage}%`;
}
