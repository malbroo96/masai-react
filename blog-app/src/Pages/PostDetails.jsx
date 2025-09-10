import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get(`https://dummyjson.com/posts/${id}`)
      .then((res) => {
        setPost(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="container">Loading post...</p>;
  if (error) return <p className="container">Something went wrong!</p>;
  if (!post) return <p className="container">Post not found!</p>;

  return (
    <div className="container">
      <div className="card">
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <div className="tags">
          {post.tags.map((tag) => (
            <span className="tag" key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PostDetails;
