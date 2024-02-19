import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import PasswordInput from './PasswordInput'
import userEvent from '@testing-library/user-event'

/**
 * skenario testing
 *
 * - PasswordInput component
 *   - should type the password correctly
 */

describe('PasswordInput component', () => {
  test('should type the password correctly', async () => {
    render(<PasswordInput props={{ placeholder: 'yourpassword' }}/>)
    const passwordInput = await screen.getByPlaceholderText('yourpassword')
    await userEvent.type(passwordInput, 'passwordtest')
    expect(passwordInput.value).toContain('passwordtest')
  })
})
