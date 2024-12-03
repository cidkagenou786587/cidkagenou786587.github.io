// Show sign-up form
function showSignUp() {
    document.getElementById('signup-form').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('notification-area').style.display = 'none';
  }
  
  // Show login form
  function showLogin() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('notification-area').style.display = 'none';
  }
  
  // Show dashboard
  function showDashboard() {
    const isLoggedIn = localStorage.getItem('username');
    if (isLoggedIn) {
      document.getElementById('dashboard').style.display = 'block';
      document.getElementById('signup-form').style.display = 'none';
      document.getElementById('login-form').style.display = 'none';
      loadEntries();
    } else {
      showLogin();
    }
  }
  
  // Sign up function
  function signUp() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
  
    if (username && password) {
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      showDashboard();
    } else {
      alert('Please fill in both fields.');
    }
  }
  
  // Log in function
  function logIn() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
  
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
  
    if (username === storedUsername && password === storedPassword) {
      localStorage.setItem('username', username);
      showDashboard();
    } else {
      alert('Invalid username or password.');
    }
  }
  
  // Log out function
  function logOut() {
    localStorage.removeItem('username');
    showLogin();
  }
  
  // Save journal entry
  function saveEntry() {
    const journalEntry = document.getElementById('journal-entry').value;
    const mood = document.getElementById('mood').value;
    const entriesList = document.getElementById('entries-list');
  
    if (journalEntry) {
      const entry = {
        text: journalEntry,
        mood: mood,
        date: new Date().toLocaleString(),
      };
  
      const storedEntries = JSON.parse(localStorage.getItem('entries')) || [];
      storedEntries.push(entry);
      localStorage.setItem('entries', JSON.stringify(storedEntries));
  
      const li = document.createElement('li');
      li.textContent = `${entry.date} - Mood: ${entry.mood} - ${entry.text}`;
      entriesList.appendChild(li);
  
      document.getElementById('journal-entry').value = ''; // Clear the entry field
    }
  }
  
  // Load past journal entries
  function loadEntries() {
    const entriesList = document.getElementById('entries-list');
    const storedEntries = JSON.parse(localStorage.getItem('entries')) || [];
    storedEntries.forEach(entry => {
      const li = document.createElement('li');
      li.textContent = `${entry.date} - Mood: ${entry.mood} - ${entry.text}`;
      entriesList.appendChild(li);
    });
  }
  