import React from 'react';
import { deleteRecord } from './../../../actions/deleteRecord';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

export const  DeleteRecordModal = (props) => {

    return(<Modal isOpen={props.deleteModal} toggle={() => props.toggleDeleteModal()} className={props.className}>
        <ModalHeader toggle={() => props.toggleDeleteModal()}>Eliminar el registro
            de <b>'{props.title}'</b></ModalHeader>
        <ModalBody>
            <p>¿Seguro que desea eliminar el registro de <b>'{props.title}'</b>? Esta acción no se puede deshacer.</p>
        </ModalBody>
        <ModalFooter>
            <Button color="secondary" onClick={() => props.toggleDeleteModal()}>Cancelar</Button>
            <Button color="primary" onClick={() => deleteRecord(props.idRecord, props.resource)}>Eliminar
                Registro</Button>{' '}
        </ModalFooter>
    </Modal>);
};
