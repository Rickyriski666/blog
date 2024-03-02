const express = require('express');
const app = express();
const cors = require('cors');
const Blog = require('./model/blog');
const blogRoute = require('./controller/blogController');

require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogRoute);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
