document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
  
    try {
      const response = await fetch('/api/teacher-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        window.location.href = data.redirectTo;
      } else {
        errorMessage.textContent = data.error;
      }
    } catch (error) {
      console.error(error);
      errorMessage.textContent = 'Server error';
    }
  });
  