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
    <div className="App">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Share Your Interview Experience</h1>
        <label>
          Title:
          <input name="title" placeholder="Title" required />
        </label>
        <br />
        <label>
          Company:
          <input name="company" placeholder="Company" required />
        </label>
        <br />
        <label>
          Position:
          <input name="position" placeholder="Position" required />
        </label>
        <br />
        <label>
          Experience:
          <textarea name="experience" placeholder="Experience" required />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
      <div className="posts">
        {posts.map((post) => (
          <div key={post._id} className="post">
            <h2>{post.title}</h2>
            <p>
              <strong>Company:</strong> {post.company}
            </p>
            <p>
              <strong>Position:</strong> {post.position}
            </p>
            <p>
              <strong>Experience:</strong> {post.experience}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
