const express = require('express');
const {getAllBlogs,addBlog,updateblog,getblog,deleteblog, getByUserId} = require('../controllers/blog-controller');
const router = express.Router();


router.get('/blogs',getAllBlogs)

router.post('/addblog',addBlog)

router.put('/updateblog/:id',updateblog)

router.get('/blog/:id',getblog)

router.delete('/blog/:id',deleteblog)

router.get('/user/:id',getByUserId)

module.exports = router