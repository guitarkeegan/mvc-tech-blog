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
            location.replace('/dashboard');
          } else {
            alert(response.status);
          }
    } catch (err){
        alert(err);
    }

}

async function deletePost(e){
    
    e.preventDefault();
    console.log(this.id)
    const blog_id = this.id;
    try {
      const response = await fetch(`/api/blogs/${blog_id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
          });
      if (response.ok){
        location.reload();
        return;
      } else {
        alert(response.status)
      }
    } catch (err) {
      alert(err);
    }
}

const buttonArrEl = document.querySelectorAll(".delete-post");

buttonArrEl.forEach((button)=>{
  button.addEventListener("click", deletePost);
});

document.querySelector(".new-post-form").addEventListener("submit", createPost);

