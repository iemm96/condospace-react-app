import React, {useState, useEffect} from 'react';
import {ModalCondominio} from "../../admin/modals/ModalCondominio";
import {Button, Col, Row, Spinner} from "reactstrap";
import {fetchRecords} from "../../../actions/fetchRecords";
import ListadoCondominios from "../listadoCondominios";
import {DeleteRecordModal} from "../modals/DeleteRecordModal";

export const Dashboard = () => {
    const [controlModal,setControlModal] = useState(null);
    const [condominios,setCondominios] = useState(null);
    const [modalDeleteControl,setModalDeleteControl] = useState(false);
    const [selectedRecordId,setSelectedRecordId] = useState(null);
    const [selectedRecordTitle,setSelectedRecordTitle] = useState(null);

    useEffect(() => {
        fetchCondominios();
    }, []);

    const toggleModal = async () => {
        setControlModal(!controlModal);
    };

    const fetchCondominios = async () => {
        const arrayCondominios = await fetchRecords('condominiosUnidades');
        setCondominios(arrayCondominios);
    };

    return(
        <div>
            {controlModal && <ModalCondominio
                toggleModal={toggleModal}
                recordModal={controlModal}
                idRecord={selectedRecordId}
                update={fetchCondominios}
            />}
            <DeleteRecordModal
                toggleDeleteModal={setModalDeleteControl}
                title={selectedRecordTitle}
                idRecord={selectedRecordId}
                deleteModal={modalDeleteControl}
                resource={'condominios'}
                updateRecords={fetchCondominios}
            />
            <div className="row mt-5 mt-xl-3 justify-content-end">
                <Col xs={12} className=" text-right">
                    <Button onClick={() => toggleModal()} className="primary">
                        Nuevo Condominio
                    </Button>
                </Col>
            </div>
            <Row className="mt-1 mb-4 text-center">
                {condominios ? <ListadoCondominios list={condominios}
                                                   setSelectedRecordId={setSelectedRecordId}
                                                   setModalDeleteControl={setModalDeleteControl}
                                                   setSelectedRecordTitle={setSelectedRecordTitle}
                                                   toggleModal={toggleModal}
                /> : <Col className="">
                        <Spinner className="mt-5" animation="grow" />
                </Col>
                }
            </Row>
        </div>
    );

};