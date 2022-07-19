const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  // send a POST request if user suppled and email and password
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  // after logging in, send user back to the homepage
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log in. Click signup if you do not already have an account.');
      }
    }
  };
  
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
  
