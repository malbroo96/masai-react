import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get("https://dummyjson.com/posts")
      .then((res) => {
        setPosts(res.data.posts);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p className="container">Loading...</p>;
  if (error) return <p className="container">Something went wrong!</p>;

  return (
    <div className="container">
      <h2>Blog Posts</h2>
      <input
        type="text"
        placeholder="Search by title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredPosts.map((post) => (
        <div className="card" key={post.id}>
          <Link to={`/post/${post.id}`}>{post.title}</Link>
          <p>{post.body.slice(0, 100)}...</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
