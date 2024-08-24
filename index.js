require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');
const blogRoute = require('./routes/blog');
const Blog = require('./models/blog');

const app = express();
const PORT = process.env.PORT || 3000; // Fallback to 3000 if PORT is not defined

mongoose.connect('mongodb://localhost:27017/blogify', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));
app.use('/user', userRouter);
app.use('/blog', blogRoute);
app.use(express.static(path.resolve('./public')));

app.get('/', async (req, res) => {
    try {
        const allBlogs = await Blog.find({});
        res.render('home', {
            user: req.user,
            blogs: allBlogs,
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
