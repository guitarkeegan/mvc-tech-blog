const commentFormHandler = async (event) => {

    event.preventDefault();
    // These 3 lines will get the blog_id that is located at the end of the current url
    const currentURL =  window.location.href;
    const urlArr = currentURL.split("/");
    const blog_id = parseInt(urlArr[urlArr.length - 1]);
    
    const comment = document.querySelector('#newComment').value;
    // make a post request leave comment for the associated blog post
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ content: comment, blog_id: blog_id }),
        headers: { 'Content-Type': 'application/json' },
      });
      // then reload the page
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

