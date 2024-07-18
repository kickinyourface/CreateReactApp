import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

test('renders search form', () => {
  render(<App />);
  
  expect(screen.getByLabelText(/Busca un libro/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Máximo de resultados/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Índice de inicio/i)).toBeInTheDocument();
  expect(screen.getByText(/Buscar/i)).toBeInTheDocument();
});

test('performs a book search and displays results', async () => {
  render(<App />);

  const searchInput = screen.getByLabelText(/Busca un libro/i);
  const maximoResult = screen.getByLabelText(/Máximo de resultados/i);
  const indice = screen.getByLabelText(/Índice de inicio/i);
  const searchButton = screen.getByText(/Buscar/i);

  fireEvent.change(searchInput, { target: { value: 'React' } });
  fireEvent.change(maximoResult, { target: { value: '1' } });
  fireEvent.change(indice, { target: { value: '0' } });

  fireEvent.click(searchButton);

  await waitFor(() => {
    const moreInfoElement = screen.queryByText(/Más información/i);
    expect(moreInfoElement).toBeInTheDocument();
  });
});

test('displays book details in a popup', async () => {
  render(<App />);

  const searchInput = screen.getByLabelText(/Busca un libro/i);
  const maximoResult = screen.getByLabelText(/Máximo de resultados/i);
  const indice = screen.getByLabelText(/Índice de inicio/i);
  const searchButton = screen.getByText(/Buscar/i);

  fireEvent.change(searchInput, { target: { value: 'React' } });
  fireEvent.change(maximoResult, { target: { value: '1' } });
  fireEvent.change(indice, { target: { value: '0' } });

  fireEvent.click(searchButton);

  const moreInfoElement = await screen.findByText(/Más información/i);
  expect(moreInfoElement).toBeInTheDocument();

  fireEvent.click(moreInfoElement);

  expect(await screen.findByText(/Authors:/i)).toBeInTheDocument();
  expect(await screen.findByText(/Published Date:/i)).toBeInTheDocument();
  expect(await screen.findByText(/Description:/i)).toBeInTheDocument();
});
