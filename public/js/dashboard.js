async function createPost(e){
    e.preventDefault();
    const title = document.querySelector('#post-title').value.trim();
    const subTitle = document.querySelector('#post-subtitle').value.trim();
    const imgUrl = document.querySelector('#post-img').value.trim();
    const post = document.querySelector('#post-content').value;

    try {
        const response = await fetch('/api/blogs', {
            method: 'POST',
            body: JSON.stringify({ title: title, subtitle: subTitle, img: imgUrl, content: post}),
            headers: { 'Content-Type': 'application/json' },
          });
          if (response.ok){
            location.replace('/');
          } else {
            alert(response.status);
          }
    } catch (err){
        alert(err);
    }

}

document.querySelector('.new-post-form').addEventListener("submit", createPost);

