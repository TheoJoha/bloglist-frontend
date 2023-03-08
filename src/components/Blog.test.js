import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'testBlog',
    url: 'testUrl',
    author: 'author',
    likes: 666
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('testBlog')
  expect(element).toBeDefined()

  const element2 = screen.getByText('author')
  expect(element2).toBeDefined()

  const element3 = screen.getByText('testUrl')
  expect(element3).not.ToBeDefined()

  const element4 = screen.getByText('666')
  expect(element4).not.ToBeDefined()
})

test('clicking the button calls event handler once', async () => {
  const blog = {
    title: 'testBlog2',
    url: 'testUrl2',
    author: 'author2',
    likes: 666
  }

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} toggleVisibility={mockHandler} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})