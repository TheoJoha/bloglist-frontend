import blogService from '../services/blogs'
import { useState, useEffect } from 'react'

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const ShowWhenUserLoggedIn = { display: (user.username === blog.user.username) ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }


  useEffect(() => {
    setLikes(likes + 1)
  }, [blog.likes])

  const increaseLikes = () => {

    setLikes(likes + 1)

    let blogObject = {
      title: blog.title,
      url: blog.url,
      author: blog.author,
      likes: likes
    }

    blogService
      .update(blog.id, blogObject)

  }

  const removeBlog = () => {

    // setLikes(likes + 1)

    if (window.confirm(`Remove ${blog.title}?`)) {
      blogService
        .remove(blog.id)
    }



  }

  return (
    <div style={blogStyle}>
      <li className='blog'>
        {blog.title} {blog.author}
        <div style={hideWhenVisible}><button onClick={toggleVisibility}>view</button></div>
        <div style={showWhenVisible}><button onClick={toggleVisibility}>hide</button></div>
      </li >
      <div>
        <div style={showWhenVisible}>
          <div>
            {blog.url}
          </div>
          <div>
            {blog.likes}
            <button onClick={increaseLikes}>like</button>
          </div>
          <div>
            {user.name}
          </div>
          <div>
            <div style={ShowWhenUserLoggedIn}><button onClick={removeBlog}>delete</button></div>
          </div>
        </div>
      </div></div>
  )}

export default Blog