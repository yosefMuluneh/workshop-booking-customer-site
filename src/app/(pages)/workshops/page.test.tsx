// src/app/workshops/page.test.tsx

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import WorkshopsPage from './page';
import * as customerApi from '../../api/customerApi';
import { Workshop } from '@/types';
import { AuthProvider } from '../../context/AuthContext'; // <--- IMPORT THE PROVIDER

// --- Mocks ---

// Mock the Client Component. This part is correct.
vi.mock('../components/WorkshopCard', () => ({
  default: ({ workshop }: { workshop: Workshop }) => (
    <div data-testid={`mock-workshop-card-${workshop.id}`}>
      <p>{workshop.title}</p>
    </div>
  ),
}));

// Mock the entire API module. This is correct.
vi.mock('../api/customerApi');

// --- Test Data (Correct) ---
const mockWorkshops: Workshop[] = [
  { id: 'w1', title: 'Advanced React Patterns' } as Workshop,
  { id: 'w2', title: 'Introduction to Testing' } as Workshop,
];

describe('WorkshopsPage (Server Component)', () => {

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should fetch workshops and render a card for each one', async () => {
    // Arrange
    const getWorkshopsSpy = vi
      .spyOn(customerApi, 'getPublicWorkshops')
      .mockResolvedValue(mockWorkshops);

    // Act
    const PageComponent = await WorkshopsPage();
    // --- THE FIX IS HERE ---
    // Wrap the component in the AuthProvider during render
    render(
      <AuthProvider>
        {PageComponent}
      </AuthProvider>
    );

    // Assert
    expect(getWorkshopsSpy).toHaveBeenCalledOnce();
    expect(await screen.findByText('Advanced React Patterns')).toBeInTheDocument();
    expect(await screen.findByText('Introduction to Testing')).toBeInTheDocument();
  });

  it('should render the "no workshops" message when the API returns an empty array', async () => {
    // Arrange
    const getWorkshopsSpy = vi
      .spyOn(customerApi, 'getPublicWorkshops')
      .mockResolvedValue([]);

    // Act
    const PageComponent = await WorkshopsPage();
    // --- APPLY THE SAME FIX HERE ---
    render(
      <AuthProvider>
        {PageComponent}
      </AuthProvider>
    );

    // Assert
    expect(getWorkshopsSpy).toHaveBeenCalledOnce();
    expect(await screen.findByText(/no workshops available/i)).toBeInTheDocument();
  });
});