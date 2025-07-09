// src/app/components/WorkshopCard.test.tsx

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { useAuth, AuthProvider } from '../context/AuthContext';
import * as customerApi from '../api/customerApi';
import { Workshop } from '@/types';
import WorkshopCard from './WorkshopCard'; // Test the component directly

// --- Mocks ---
const mockRouter = { push: vi.fn() };
vi.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
}));
vi.mock('../api/customerApi');
vi.mock('../context/AuthContext', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../context/AuthContext')>();
  return { ...mod, useAuth: vi.fn() };
});

// --- Test Data ---
const mockWorkshop: Workshop = {
  id: 'w1',
  title: 'Advanced React Patterns',
  description: 'A deep dive into hooks and state management.',
  date: new Date().toISOString(),
  maxCapacity: 10,
  timeSlots: [
    { id: 's1', startTime: '10:00 AM', endTime: '12:00 PM', availableSpots: 5, workshopId: 'w1' },
    { id: 's2', startTime: '02:00 PM', endTime: '04:00 PM', availableSpots: 3, workshopId: 'w1' },
  ],
  bookings: [],
  _count: { bookings: 0 },
};

describe('WorkshopCard Component', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
    (useAuth as Mock).mockReturnValue({ token: null }); // Default to unauthenticated
  });

  // Test 1: Renders correctly
  it('should render workshop details and time slots', () => {
    render(<AuthProvider><WorkshopCard workshop={mockWorkshop} /></AuthProvider>);
    expect(screen.getByText('Advanced React Patterns')).toBeInTheDocument();
    expect(screen.getByText(/5 spots left/i)).toBeInTheDocument();
  });

  // Test 2: Unauthenticated user
  it('should show an error when an unauthenticated user clicks book', async () => {
    render(<AuthProvider><WorkshopCard workshop={mockWorkshop} /></AuthProvider>);
    await user.click(screen.getByRole('button', { name: /book now/i }));
    expect(await screen.findByText(/please log in to book a workshop/i)).toBeInTheDocument();
    expect(customerApi.createBooking).not.toHaveBeenCalled();
  });

  // Test 3: Authenticated user success
  it('should select a time slot and book successfully for an authenticated user', async () => {
    (useAuth as Mock).mockReturnValue({ token: 'fake-jwt-token' });
    vi.mocked(customerApi.createBooking).mockResolvedValue({ bookingId: 'booking-xyz-123' });

    render(<AuthProvider><WorkshopCard workshop={mockWorkshop} /></AuthProvider>);

    await user.selectOptions(screen.getByRole('combobox'), 's2'); // Select the second time slot
    await user.click(screen.getByRole('button', { name: /book now/i }));

    await waitFor(() => {
      expect(customerApi.createBooking).toHaveBeenCalledWith(
        { workshopId: 'w1', timeSlotId: 's2' },
        'fake-jwt-token'
      );
    });
    expect(mockRouter.push).toHaveBeenCalledWith('/booking-confirmation/booking-xyz-123');
  });
  
  // Test 4: Authenticated user API failure
  it('should show an API error if booking fails', async () => {
    (useAuth as Mock).mockReturnValue({ token: 'fake-jwt-token' });
    const apiError = { response: { data: { message: 'This slot is full.' } } };
    vi.mocked(customerApi.createBooking).mockRejectedValue(apiError);
    
    render(<AuthProvider><WorkshopCard workshop={mockWorkshop} /></AuthProvider>);
    
    await user.click(screen.getByRole('button', { name: /book now/i }));
    
    expect(await screen.findByText('This slot is full.')).toBeInTheDocument();
    expect(mockRouter.push).not.toHaveBeenCalled();
  });
});