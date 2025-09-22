import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPost, toggleVerify } from "./store";
import Post from "./Post";

const App = () => {
  const [timer, setTimer] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const posts = useSelector(state => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => setTimer(prev => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAddPost = useCallback(() => {
    const newPost = {
      id: posts.length + 1,
      title,
      body,
      verifyPost: false,
    };
    dispatch(addPost(newPost));
    setTitle("");
    setBody("");
  }, [title, body, posts.length, dispatch]);

  const handleToggleVerify = useCallback(
    id => dispatch(toggleVerify(id)),
    [dispatch]
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Timer: {timer}</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button onClick={handleAddPost}>Add Post</button>

      <div style={{ marginTop: "20px" }}>
        {posts.map(post => (
          <Post key={post.id} post={post} toggleVerify={handleToggleVerify} />
        ))}
      </div>
    </div>
  );
};

export default App;
