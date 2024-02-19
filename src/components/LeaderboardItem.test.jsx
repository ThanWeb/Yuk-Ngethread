import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import LeaderboardItem from './LeaderboardItem'

/**
 * skenario testing
 *
 * - LeaderboardItem component
 *   - should render the avatar, name and score correctly
 */

const fakeUser = {
  id: 'users-1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg'
}

const fakeScore = 10
const fakeIndex = 0

describe('LeaderboardItem component', () => {
  test('should render the avatar, name and score correctly', () => {
    render(<LeaderboardItem position={fakeIndex} user={fakeUser} score={fakeScore} />)
    const avatarImage = screen.getByAltText(fakeUser.name)
    expect(avatarImage.src).toContain(fakeUser.avatar)
    expect(screen.getByAltText(fakeUser.name)).toBeTruthy()
    expect(screen.getByText(fakeUser.name)).toBeTruthy()
    expect(screen.getByText(fakeScore)).toBeTruthy()
  })
})
