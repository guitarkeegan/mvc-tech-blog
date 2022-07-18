async function editPost(e){
    e.preventDefault();
    const title = document.querySelector('#post-title').value.trim();
    const subTitle = document.querySelector('#post-subtitle').value.trim();
    const imgUrl = document.querySelector('#post-img').value.trim();
    const post = document.querySelector('#post-content').value;

    try {
        const currentURL = window.location.href;
        const urlArr = currentURL.split("/");
        const blog_id = urlArr[urlArr.length - 1]

        const response = await fetch(`/api/blogs/${blog_id}`, {
            method: 'PUT',
            body: JSON.stringify({ title: title, subtitle: subTitle, img: imgUrl, content: post}),
            headers: { 'Content-Type': 'application/json' },
          });
          if (response.ok){
            location.replace('/dashboard');
          } else {
            alert(response.status);
          }
    } catch (err){
        alert(err);
    }
}



document.querySelector('.edit-post-form').addEventListener("submit", editPost);


