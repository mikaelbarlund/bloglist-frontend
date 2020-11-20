import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState({ type: 'error', text: null })
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showNotification = (message, error) => {
    setNotification({ type: error ? 'error' : 'notification', text: message })
    setTimeout(() => {
      setNotification({ ...notification, text: null })
    }, 3000)
  }

  const handleLogin = async (login) => {
    try {
      const user = await loginService.login(login)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
    } catch (exception) {
      showNotification('wrong credentials', true)
    }
  }
  const handleLogout = async () => {
    window.localStorage.clear()
    blogService.setToken(null)
    setUser(null)
  }
  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      showNotification(`a new blog ${returnedBlog.title}`)

    } catch (exception) {
      console.log(exception)
      showNotification('could not add blog', true)
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <Login
        handleLogin={handleLogin}
      />
    </Togglable >
  )
  const blogList = () => (
    <>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <h2>create new</h2>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <>
        {blogs.map(blog =>
          <Blog showNotification={showNotification} setBlogs={setBlogs} key={blog.id} blog={blog} />
        )}
      </>
    </>
  )

  return (
    <div>
      <Notification notification={notification} />
      {user === null ?
        loginForm() :
        blogList()
      }
    </div>
  )
}

export default App