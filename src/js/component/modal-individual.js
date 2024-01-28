import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function ModalIndividual({ show, handleClose }) {
	return (
		<Modal
			show={show}
			onHide={handleClose}
			backdrop="static"
			keyboard={false}>
			<Modal.Header closeButton>
				<Modal.Title>Learn more</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div>
					<p>Hola perro</p>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
