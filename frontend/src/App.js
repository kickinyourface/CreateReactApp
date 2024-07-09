import React, { useState } from 'react';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import PopUp from './components/PopUp';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import fondo from './assets/fondo.jpg';

const BACKEND_URL = "http://localhost:5000";

function App() {
  const [lastFetchStatus, setLastFetchStatus] = useState(true);
  const [query, setQuery] = useState('');
  const [maxResults, setMaxResults] = useState(30);
  const [startIndex, setStartIndex] = useState(0);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const searchBooks = async () => {
    try {
      const urlBackAPI = `${BACKEND_URL}/api/search_books`;
      const queryParams = new URLSearchParams({
        q: query,
        maxResults: maxResults,
        startIndex: startIndex,
      }).toString();
      const response = await fetch(`${urlBackAPI}?${queryParams}`);
  
      if (response.status === 200) {
        setLastFetchStatus(true);
        const data = await response.json();
        setBooks(data.items || []);
        return;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  
    //setBooks([]);
    //setLastFetchStatus(false);
  };

  const handleShowModal = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBook(null);
  };

  return (
    <Container fluid className="d-flex flex-column align-items-center justify-content-center min-vh-100 p-0">
      <div className="App text-center w-100">
        <Row className="justify-content-center mb-4 custom-background" style={{ backgroundImage: `url(${fondo})` }}>
          <Col>
            <h1 className="white-text mb-4">Google Books Search</h1>
            <Form className="centered-form">
              <Form.Group controlId="formBasicEmail" className="form-group">
                <Form.Label className="white-text">Busca un libro</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa el título de un libro"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formMaxResults" className="form-group">
                <Form.Label className="white-text">Máximo de resultados</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ingresa el máximo de resultados"
                  value={maxResults}
                  onChange={(e) => setMaxResults(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formStartIndex" className="form-group">
                <Form.Label className="white-text">Índice de inicio</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ingresa el índice de inicio"
                  value={startIndex}
                  onChange={(e) => setStartIndex(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" onClick={searchBooks} className="mt-2">
                <FontAwesomeIcon icon={faSearch} className="mr-2" />
                Buscar
              </Button>
            </Form>
          </Col>
        </Row>
        <Row className="w-100 results-row">
          {books.map((book) => (
            <Col key={book.id} xs={12} md={6} lg={4} className="d-flex justify-content-center my-3">
              <Card className="fixed-size-card">
                <Card.Img
                  variant="top"
                  src={book.volumeInfo.imageLinks?.thumbnail}
                  alt={book.volumeInfo.title}
                  className="fixed-size-img"
                  onClick={() => handleShowModal(book)}
                />
                <Card.Body className="d-flex flex-column justify-content-end">
                  <Card.Title className="card-title">{book.volumeInfo.title}</Card.Title>
                  <Button variant="secondary" onClick={() => handleShowModal(book)}>Más información</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {selectedBook && (
        <PopUp
          show={showModal}
          book={selectedBook}
          handleClose={handleCloseModal}
        />
      )}
    </Container>
  );
}

export default App;
