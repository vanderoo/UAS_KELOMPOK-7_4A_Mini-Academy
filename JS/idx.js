const profileContainer = document.querySelector('.profile-container');
const btnSignContainer = document.querySelector('.button-sign-container');

fetch('http://127.0.0.1:3333/auth/check', {
  method: 'POST',
  credentials: 'include'
})
  .then(response => response.json())
  .then(data => {
    console.log('data.message:', data.message);
    const path = window.location.pathname;
    const relativePath = path.substring(path.lastIndexOf('/') + 1);
    console.log('relativePath:', relativePath);

    if (data.message === 'not logged in') {

    } else {
        profileContainer.style.display = 'flex';
        btnSignContainer.style.display = 'none';
    }
  })
  .catch(error => {
    console.log(error);
  });