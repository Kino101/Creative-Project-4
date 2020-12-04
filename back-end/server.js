const express = require('express');
const bodyParser = require("body-parser");
const multer = require('multer');
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Pic_Share', {
  useNewUrlParser: true
});

const postSchema = new mongoose.Schema({
  heading: String,
  description: String,
  upvotes: Number,
  path: String,
  editing: Boolean,
  subPosts: Array,
});

const passwordSchema = new mongoose.Schema({
  postId: String,
  passcode: String,
  adminPasscode: String,
});

const Post = mongoose.model('Post', postSchema);
const Password = mongoose.model('Passward', passwordSchema);

app.get('/api/posts', async (req, res) => {
  try {
    let posts = await Post.find();
    res.send(posts);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/photos', upload.single('photo'), async (req, res) => {
  if(!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

app.post('/api/posts', async (req, res) => {
  const post = new Post({
    heading: req.body.heading,
    description: req.body.description,
    upvotes: req.body.upvotes,
    path: req.body.path,
    editing: false,
    subPosts: [],
  });
  try {
    await post.save();
    const password = new Password({
      postId: post._id,
      passcode: req.body.passcode,
      adminPasscode: "12345",
    })
    await password.save();
    res.send(post);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/posts/:id/delete/:passcode', async (req, res) => {
  try {
    const passcode = req.params.passcode;
    const checkPassword = await Password.findOne({
      postId: req.params.id
    });
    if(checkPassword != null && (checkPassword.passcode == passcode || checkPassword.adminPasscode == passcode)) {
      await Post.deleteOne({
        _id: req.params.id
      });
      await Password.deleteOne({
        _id: checkPassword.id
      });
      res.sendStatus(200);
    } else {
      res.send("Incorrect Password");
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/posts/:id', async (req, res) => {
  try {
    const checkPassword = await Password.findOne({
      postId: req.params.id
    });
    if(checkPassword.passcode == req.body.passcode || checkPassword.adminPasscode == req.body.passcode) {
      const post = await Post.findOne({
        _id: req.params.id
      });
      post.heading = req.body.heading;
      post.description = req.body.description + " [Edited]";
      post.editing = false;
      await post.save();
      res.sendStatus(200);
    } else {
      res.send("Incorrect Password");
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/posts/:id/editing', async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id
    });
    post.editing = !post.editing;
    await post.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/posts/:id/upvote', async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id
    });
    post.upvotes = req.body.upvotes;
    await post.save();
    res.send(post);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/posts/:id/comment', async( req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id
    });
    post.subPosts.push({
      id: post.subPosts.length,
      comment: req.body.comment,
    });
    await post.save();
    res.send(post);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
