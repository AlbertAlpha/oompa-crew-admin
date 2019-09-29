import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Modal, Button} from 'react-bootstrap';

const UserDetails = ({json, title}) => {

  const [showDetails, setShowDetails] = useState(false);

  function handleClickDetails() {
    setShowDetails(true);
  }

  function handleCloseDetails() {
    setShowDetails(false);
  }

  return (
    <>
      <Button variant="link" size="sm" onClick={handleClickDetails}>
        <FontAwesomeIcon icon="search-plus" className="mr-1"/>
      </Button>
      <Modal show={showDetails} onHide={handleCloseDetails} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{title || 'Detalles'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre className="pre-scrollable">{JSON.stringify(JSON.parse(json), null, ' ')}</pre>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="primary" onClick={handleCloseDetails}>Aceptar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserDetails;
