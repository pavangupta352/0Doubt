import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/posts')
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const company = e.target.company.value;
    const position = e.target.position.value;
    const experience = e.target.experience.value;
    axios
      .post('http://localhost:5000/posts', {
        title,
        company,
        position,
        experience,
      })
      .then((res) => setPosts([...posts, res.data]))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" />
        <input name="company" placeholder="Company" />
        <input name="position" placeholder="Position" />
        <textarea name="experience" placeholder="Experience"></textarea>
        <button type="submit">Submit</button>
      </form>
      {posts.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>Company: {post.company}</p>
          <p>Position: {post.position}</p>
          <p>Experience: {post.experience}</p>
        </div>
      ))}
    </div>
  );
}

export default App;