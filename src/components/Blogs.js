import React from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

const Blogs = ({ blogs, showNotification, setBlogs }) => {

  const like = async (blog) => {
    console.log(blog)
    try {
      await blogService.update(blog.id, { ...blog, user: blog.user.id, likes: blog.likes + 1 })
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch (exception) {
      showNotification('cannot like blog', true)
    }
  }
  const remove = async (blog) => {
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

  return (
    <>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} like={() => like(blog)} remove={() => remove(blog)} />
      )}
    </>)
}

export default Blogs