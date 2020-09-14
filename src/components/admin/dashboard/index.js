import React, {useState, useEffect} from 'react';
import {ModalCondominio} from "../../admin/modals/ModalCondominio";
import {Button, Col, Row, Spinner} from "reactstrap";
import {fetchRecords} from "../../../actions/fetchRecords";
import ListadoCondominios from "../listadoCondominios";

export const Dashboard = () => {
    const [controlModal,setControlModal] = useState(null);
    const [condominios,setCondominios] = useState(null);

    useEffect(() => {   async function fetchCondominios() {
        if(!condominios) {
            const arrayCondominios = await fetchRecords('condominiosUnidades');
            setCondominios(arrayCondominios);
        }

    }   fetchCondominios(); }, []);

    const toggleModal = async () => {
        setControlModal(!controlModal);
    };

    const updateCondominios = async () => {
        const arrayCondominios = await fetchRecords('condominiosUnidades');
        setCondominios(arrayCondominios);
    };

    return(
        <div>
            <ModalCondominio
                toggleModal={toggleModal}
                recordModal={controlModal}
                update={updateCondominios}
            />
            <div className="row mt-5 mt-xl-3 justify-content-end">
                <Col xs={12} className=" text-right">
                    <Button onClick={() => toggleModal()} className="primary">
                        Nuevo Condominio
                    </Button>
                </Col>
            </div>
            <Row className="mt-1 mb-4 text-center">
                {condominios ? <ListadoCondominios list={condominios}/> : <Col className="">
                        <Spinner className="mt-5" animation="grow" />
                </Col>
                }
            </Row>
        </div>
    );

};