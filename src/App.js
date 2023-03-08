import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'



const App = () => {
  const [blogs, setBlogs] = useState([])
  // const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  /* const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [loginVisible, setLoginVisible] = useState(false) */

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      setErrorMessage('Logged in')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
    }
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    setUser(null)
    window.localStorage.removeItem('user')
    blogService.setToken(null)
    setErrorMessage('Logged out')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const addBlog = (blogObject) => {
    /* event.preventDefault()
    const BlogObject = {
      title: title,
      author: author,
      url: url
    } */

    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))

      })
  }

  /*   const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  } */

  /*   const handleCreate = async (event) => {
    event.preventDefault()

    setErrorMessage(
      `New blog created`
    )

    blogService
    .create({"url": url,
            "author": author,
            "title": title}
     )
     // setErrorMessage('New blog created')
    .catch(error => {
      setErrorMessage(
        `Creation of blog failed`
      )
    })


    setTitle('')
    setAuthor('')
    setUrl('')

    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)

  } */

  if (!user) {
    return (
      <div>
        <Togglable buttonLabel='log in'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      </div>
    )
  }


  /*   if (user === null) {
    return (

      <div>

        <Notification message={errorMessage} />



        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
        <div>
        username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
        </form>
      </div>
    )
  } */

  return (
    <div>
      <Notification message={errorMessage} />
      <h2>blogs</h2>
      <div>
        <p>{user.name} logged in</p>
        <form onSubmit={handleLogout}>
          <button type="submit">logout</button>
        </form>
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm createBlog={addBlog}/>
        </Togglable>
      </div>
      {/* <p>{user.name} is logged in</p>
      <form onSubmit={handleLogout}>
      <button type="submit">logout</button>
      </form>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
        title:
        <input
        type="text"
        name="Title"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
        />
        </div>

        <div>
        author:
        <input
        type="text"
        name="Author"
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
        />
        </div>

        <div>
        url:
        <input
        type="text"
        name="Url"
        value={url}
        onChange={({ target }) => setUrl(target.value)}
        />
        </div>

        <button type="submit">create</button>
      </form> */}
      <div>

        {}

        {blogs.sort((a, b) => a.likes + b.likes).map(blog =>
          <Blog key={blog.id} blog={blog} user={user} />
        )}
      </div>

    </div>
  )
}




export default App