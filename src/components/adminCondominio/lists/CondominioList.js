import React, {useState, useEffect,useReducer} from 'react';
import {ModalCondominio} from "../../admin/modals/ModalCondominio";
import {Button, Card, CardBody, CardSubtitle, CardTitle, Col, Container, Row} from "reactstrap";
import {fetchRecords} from "../../../actions/fetchRecords";

export const CondominioList = () => {
    const [controlModal,setControlModal] = useState(null);
    const [condominios,setCondominios] = useState(null);
    const [, updateState] = React.useState();
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const fetchCondominios2 = async () => {
        const arrayCondominios = await fetchRecords('condominiosUnidades');
        setCondominios(arrayCondominios);
    }

    useEffect(() => {   async function fetchCondominios() {
        // You can await here
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
    }

    return(
        <div>
            <ModalCondominio
                toggleModal={toggleModal}
                recordModal={controlModal}
                update={updateCondominios}
            />
            <div className="row justify-content-end">
                <div className="col-3">
                    <Button onClick={() => toggleModal()} className="actionButton ">Nuevo Condominio</Button>
                </div>
            </div>

            <Row className="mt-1">
                {condominios != null ?
                    condominios.map((value,index) => {
                        return (
                            <Col xs="4">
                                <Card>
                                    <CardBody className="text-center">
                                        <CardTitle>
                                            <h3>
                                                {value.nombreCondominio}
                                            </h3>
                                        </CardTitle>
                                        <CardSubtitle>{value.unidades.length == '1' ? `${value.unidades.length} Unidad` : `${value.unidades.length} Unidades`}</CardSubtitle>
                                        <Button className="mt-2 actionButton" onClick={() => this.redirectCondominio(value.idCondominio)}>Seleccionar</Button>
                                    </CardBody>
                                </Card>
                            </Col>)
                    }) : ''
                }
            </Row>
        </div>
    );

}