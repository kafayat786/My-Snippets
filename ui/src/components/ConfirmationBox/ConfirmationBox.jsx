import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

import './ConfirmationBox.scss';
import Loading from '../Loading/Loading';

const ConfirmationBox = ({ show, onClose, onConfirm, title, body, loading }) => {
    return (
        <Modal show={show} onHide={onClose} centered className="confirmation-modal">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
                <Button className="custom-button" disabled={loading} variant="danger" onClick={onClose}>
                    No
                </Button>
                <Button className="custom-button confirm" disabled={loading} variant="success" onClick={onConfirm}>
                    {loading ? <Loading size="sm" /> : 'Yes'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

ConfirmationBox.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
};

export default ConfirmationBox;
