const commentFormHandler = async (event) => {
    event.preventDefault();
    console.log(event);
    const comment = document.querySelector('#newComment').value;
    console.log(comment);
    if (comment) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ comment }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to log in');
      }
    }
  };
  
  document
    .querySelector('#comment-form')
    .addEventListener('submit', commentFormHandler);

  alert("js is here!");