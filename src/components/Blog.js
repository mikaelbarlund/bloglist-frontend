import React, { useState } from 'react'
import blogService from '../services/blogs'
const Blog = ({ showNotification, setBlogs, blog }) => {
  const [details, setDetails] = useState(false)

  const blogStyle = {
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  const toggleDetails = async () => {
    setDetails(!details)
  }
  const like = async () => {
    try {
      await blogService.update(blog.id, { ...blog, user: blog.user.id, likes: blog.likes + 1 })
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch (exception) {
      showNotification('cannot like blog', true)
    }
  }
  const remove = async () => {
    if (window.confirm(`Remove blog ${blog.title}`))
      try {
        await blogService.remove(blog.id)
        const blogs = await blogService.getAll()
        setBlogs(blogs)
        showNotification(`removed ${blog.title}`, false)
      } catch (exception) {
        showNotification('cannot remove blog', true)
      }
  }

  if (!details) return (
    <>
      <div style={blogStyle}>
        {blog.title} {blog.author} <button onClick={toggleDetails}>show</button>
      </div>
    </>
  )
  else return (
    <>
      <div style={blogStyle}>
        <div>{blog.title} <button onClick={toggleDetails}>hide</button> </div>
        <div>{blog.url}</div>
        <div>likes {blog.likes}<button onClick={like}>like</button></div>
        <div>{blog.author}</div>
        <button onClick={remove}>remove</button>
      </div>
    </>
  )
}

export default Blog
