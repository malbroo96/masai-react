import React, { useMemo } from "react";

const Post = React.memo(({ post, toggleVerify }) => {
  const bgColor = useMemo(
    () => `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    [post.id]
  );

  console.log("Rendering Post:", post.id);

  return (
    <div style={{ backgroundColor: bgColor, padding: "10px", margin: "10px 0" }}>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <button onClick={() => toggleVerify(post.id)}>
        {post.verifyPost ? "Verified" : "Verify"}
      </button>
    </div>
  );
});

export default Post;
