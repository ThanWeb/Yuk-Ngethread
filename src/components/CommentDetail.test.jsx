import { describe, expect, test, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import CommentDetail from './CommentDetail'
import { getFormattedDateString } from '../utils'
import parse from 'html-react-parser'

/**
 * skenario testing
 *
 * - CommentDetail component
 *   - should render alt and title atribute of the avatar image in component correctly
 *   - should render information about the comment correctly
 *   - should render the body of content of the comment correctly
 */

const fakeCommentProps = {
  id: 'comment-1',
  content: 'Ini adalah komentar pertama',
  createdAt: '2021-06-21T07:00:00.000Z',
  upVotesBy: [],
  downVotesBy: [],
  owner: {
    id: 'users-1',
    name: 'John Doe',
    email: 'john@example.com'
  }
}

describe('CommentDetail component', () => {
  beforeEach(() => {
    render(<CommentDetail comment={fakeCommentProps} />)
  })

  test('should render alt and title atribute of the avatar image in component correctly', () => {
    expect(screen.getByAltText(fakeCommentProps.owner.name)).toBeTruthy()
    expect(screen.getByTitle(fakeCommentProps.owner.name)).toBeTruthy()
  })

  test('should render information about the comment correctly', () => {
    expect(screen.getByText(fakeCommentProps.owner.name)).toBeTruthy()
    expect(screen.getByText(getFormattedDateString(fakeCommentProps.createdAt))).toBeTruthy()
  })

  test('should render the body of content of the comment correctly', () => {
    expect(screen.getByText(parse(fakeCommentProps.content))).toBeTruthy()
  })
})
