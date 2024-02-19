import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import TextInput from './TextInput'
import userEvent from '@testing-library/user-event'

/**
 * skenario testing
 *
 * - TextInput component
 *   - should type the the text correctly
 */

describe('TextInput component', () => {
  test('should type the the text correctly', async () => {
    render(<TextInput props={{ placeholder: 'testinputhere' }}/>)
    const textInput = await screen.getByPlaceholderText('testinputhere')
    await userEvent.type(textInput, '8adk11;1-0ada')
    expect(textInput.value).toContain('8adk11;1-0ada')
  })
})
