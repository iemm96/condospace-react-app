import React, {useState, useEffect} from 'react';
import {ModalCondominio} from "../../admin/modals/ModalCondominio";
import {Button, Card, CardBody, CardSubtitle, CardTitle, Col, Row} from "reactstrap";
import {fetchRecords} from "../../../actions/fetchRecords";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";

export const CondominioList = () => {
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
            <div className="row justify-content-end">
                <div className="col-3">
                    <Button onClick={() => toggleModal()} className="actionButton ">Nuevo Condominio</Button>
                </div>
            </div>

            <Row className="mt-1">
                {condominios != null ?
                    condominios.map((value) => {
                        return (
                            <Col xs="4">
                                <Card>
                                    <CardBody className="text-center">
                                        <CardTitle>
                                            <h3>
                                                {value.nombreCondominio}
                                            </h3>
                                        </CardTitle>
                                        <CardSubtitle className="mb-3 mt-3">{value.unidades.length == '1' ? `${value.unidades.length} Unidad` : `${value.unidades.length} Unidades`}</CardSubtitle>

                                        <Link to={`/admin/usuarios-condominio/${value.idCondominio}`}>
                                            <a><FontAwesomeIcon className="mr-2" icon={faUser}/>Administrar usuarios</a>
                                        </Link>
                                    </CardBody>
                                </Card>
                            </Col>)
                    }) : ''
                }
            </Row>
        </div>
    );

};