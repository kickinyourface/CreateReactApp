import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function PopUp({ show, book, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{book.volumeInfo.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Authors:</strong> {book.volumeInfo.authors?.join(', ')}</p>
        <p><strong>Published Date:</strong> {book.volumeInfo.publishedDate}</p>
        <p><strong>Description:</strong> {book.volumeInfo.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PopUp;
