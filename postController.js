

const prisma = require('../prisma/client')
const { validationResult } = require('express-validator')


// GET SEMUA POSTS
const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        image: true,
        title: true,
        content: true
      },
      orderBy: {
        id: 'desc'
      }
    })

    res.status(200).json({
      success: true,
      message: 'Get all posts successfully',
      data: posts
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

// GET POST BERDASARKAN ID
const getPostById = async (req, res) => {
  try {
    const id = parseInt(req.params.id)

    const post = await prisma.post.findUnique({
      where: { id }
    })

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Get post successfully',
      data: post
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

// CREATE POST

const createPost = async (req, res) => {
  // Memeriksa hasil validasi
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation error',
      errors: errors.array()
    })
  }

  try {
    const { image, title, content } = req.body

    const post = await prisma.post.create({
      data: { image, title, content }
    })

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: post
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}


// UPDATE POST
const updatePost = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const { image, title, content } = req.body

    const post = await prisma.post.update({
      where: { id },
      data: { image, title, content }
    })

    res.status(200).json({
      success: true,
      message: 'Post updated successfully',
      data: post
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Failed to update post'
    })
  }
}

// DELETE POST
const deletePost = async (req, res) => {
  try {
    const id = parseInt(req.params.id)

    const post = await prisma.post.delete({
      where: { id }
    })

    res.status(200).json({
      success: true,
      message: 'Post deleted successfully',
      data: post
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete post'
    })
  }
}

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
}
