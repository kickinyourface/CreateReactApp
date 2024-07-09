import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { mockFetch } from '../__mocks__/fetch';

beforeEach(() => {
  mockFetch.mockClear();
});

test('performs a book search and displays results', async () => {
  render(<App />);

  const searchInput = screen.getByLabelText(/Busca un libro/i);
  const searchButton = screen.getByText(/Buscar/i);

  fireEvent.change(searchInput, { target: { value: 'React' } });
  fireEvent.click(searchButton);

  //await waitFor(() => {
  //expect(screen.getByText(/Más información/i)).toBeInTheDocument();
  //});

  await waitFor(() => {
    expect(getByText(/Más información/i)).toBeInTheDocument()
  })
});
