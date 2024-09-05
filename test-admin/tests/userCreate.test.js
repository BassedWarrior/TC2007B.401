// Import dependencies and React
import React from 'react';

// Import the UserCreate component
import { UserCreate } from '../src/users';

// Import necessary components from react-admin
import { Admin, Resource } from 'react-admin';

// Import render and testing-library utilities
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Import MUI components
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// Import QueryClientProvider for React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Import MemoryRouter for routing
import { MemoryRouter } from 'react-router-dom';

// Mock useMediaQuery
jest.mock('@mui/material/useMediaQuery');

// Create a QueryClient instance
const queryClient = new QueryClient();

// Test suite for UserCreate component
describe('UserCreate Component', () => {
  it('should display all form fields for user creation', async () => {
    // Mock useMediaQuery to return true
    useMediaQuery.mockReturnValue(true);

    // Render UserCreate component within Admin and Resource
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={createTheme()}>
            <Admin dataProvider={() => Promise.resolve({})} authProvider={() => Promise.resolve()} >
              <Resource name="users" create={UserCreate} />
            </Admin>
          </ThemeProvider>
        </QueryClientProvider>
      </MemoryRouter>
    );

    // Debug the rendered output
    screen.debug();

    // Assertions to check if form fields are rendered
    expect(screen.getByLabelText(/id/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/address\.street/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/website/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company\.name/i)).toBeInTheDocument();
  });
});

