// Login.test.js

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios'; // Import axios for mocking
import Login from './Login';

// Mock Axios post method
jest.mock('axios');

describe('Login component', () => {
  test('submits form with correct data', async () => {
    // Arrange
    const { getByLabelText, getByText } = render(<Login />);
    const emailInput = getByLabelText('Email address');
    const passwordInput = getByLabelText('Password');
    const submitButton = getByText('Submit');

    // Act
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submitButton);

    // Assert
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        `${server}/user/login-user`,
        {
          email: 'test@example.com',
          password: 'password',
        },
        { withCredentials: true }
      );
      // Add more assertions as needed
    });
  });

  // Add more test cases as needed...
});
