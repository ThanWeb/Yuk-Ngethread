import { describe, expect, test, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import ThreadPreview from './ThreadPreview'
import { MemoryRouter as Router } from 'react-router-dom'
import { getFormattedDateString } from '../utils'

/**
 * skenario testing
 *
 * - ThreadPreview component
 *   - should show all data about one the thread correctly
 */

const fakeThreadProps = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  ownerId: 'john_doe',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0
}

const fakeUsersProps = [
  {
    id: 'john_doe',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg'
  },
  {
    id: 'jane_doe',
    name: 'Jane Doe',
    email: 'jane@example.com',
    avatar: 'https://generated-image-url.jpg'
  }
]

const fakeAuthUserProps = {
  id: 'auth_user',
  name: 'Auth User',
  email: 'authuser@example.com',
  avatar: 'https://generated-image-url.jpg'
}

describe('ThreadPreview component', () => {
  beforeEach(() => {
    render(
      <Router>
        <ThreadPreview thread={fakeThreadProps} users={fakeUsersProps} filterQuery={''} authUser={fakeAuthUserProps}/>
      </Router>
    )
  })

  test('should show all data about one the thread correctly', () => {
    expect(screen.getByText(fakeThreadProps.title)).toBeTruthy()
    expect(screen.getByText(`#${fakeThreadProps.category}`)).toBeTruthy()
    expect(screen.getByText(`${fakeThreadProps.totalComments} comment`)).toBeTruthy()
    expect(screen.getByText(getFormattedDateString(fakeThreadProps.createdAt))).toBeTruthy()
    expect(screen.getByText(fakeUsersProps[0].name)).toBeTruthy()
  })
})
