const commentFormHandler = async (event) => {

    event.preventDefault();
    const currentURL =  window.location.href;
    const urlArr = currentURL.split("/");
    const blog_id = parseInt(urlArr[urlArr.length - 1]);
    
    const comment = document.querySelector('#newComment').value;

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ content: comment, blog_id: blog_id }),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response);
      if (response.ok) {
        location.reload();
      } else {
          alert('Failed to post comment.');
          }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }};
  
  document
    .querySelector('#comment-form')
    .addEventListener('submit', commentFormHandler);

