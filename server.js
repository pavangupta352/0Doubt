// Backend (Node.js + Express)
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/interview-blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Use body-parser middleware
app.use(bodyParser.json());

// Create model for blog posts
const Post = mongoose.model('Post', {
  title: String,
  company: String,
  position: String,
  experience: String,
});

// Create API routes
app.get('/posts', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

app.post('/posts', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    company: req.body.company,
    position: req.body.position,
    experience: req.body.experience,
  });
  await post.save();
  res.json(post);
});

// Start server
app.listen(5000, () => {
  console.log('Server started on port 5000');
});