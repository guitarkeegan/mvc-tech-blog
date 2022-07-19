async function editPost(e) {
  e.preventDefault();
  const title = document.querySelector("#post-title").value.trim();
  const subTitle = document.querySelector("#post-subtitle").value.trim();
  const imgUrl = document.querySelector("#post-img").value.trim();
  const post = document.querySelector("#post-content").value;
  
  if (title && subTitle && imgUrl && post) {
    try {
      // these lines will get the blog_id from the end of the current url.
      const currentURL = window.location.href;
      const urlArr = currentURL.split("/");
      const blog_id = urlArr[urlArr.length - 1];
      // This will make a put call to update the post matching the blog_id
      const response = await fetch(`/api/blogs/${blog_id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: title,
          subtitle: subTitle,
          img: imgUrl,
          content: post,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        location.replace("/dashboard");
      } else {
        alert(response.status);
      }
    } catch (err) {
      alert(err);
    }
  }
}

document.querySelector(".edit-post-form").addEventListener("submit", editPost);
