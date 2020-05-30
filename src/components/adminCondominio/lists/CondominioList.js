import React from 'react';
import ModalCondominio from "../../admin/modals/ModalCondominio";
import {Button, Card, CardBody, CardSubtitle, CardTitle, Col, Container, Row} from "reactstrap";
import {fetchRecords} from "../../../actions/fetchRecords";

export default class CondominioList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            setActiveTab: 1,
            activeTab: 1,
            dropDownValue: 'Select action',
            dropdownOpen: false,
            modalEvento: false,
            modalAnuncio: false,
            modalFinanzas: false,
            modalAreasComunes:false,
            isOpenSidebar:false,
            condominios: []
        }
    }

    async componentDidMount() {
        try {
            const arrayCondominios = await fetchRecords('condominiosUnidades');
            //const jsonCondominios = await arrayCondominios.json();
            this.setState({ condominios: arrayCondominios })
        }catch (error) {
            console.log(error);
        }
    }

    toggleModal = () => {
        this.state.recordModal ? this.setState({recordModal: false}) : this.setState({recordModal: true});
    };

    redirectCondominio = (condominio) => {
        window.location.href = `/admin/condominio/${condominio}`;
    };

    render() {
        return(
            <div>
                <ModalCondominio
                    idRecord={this.state.idRecord}
                    toggleModal={this.toggleModal}
                    recordModal={this.state.recordModal}
                    resource={'condominios'}
                />
                <div className="row justify-content-end">
                    <div className="col-3">
                        <Button onClick={() => this.toggleModal()} className="actionButton ">Nuevo Condominio</Button>
                    </div>
                </div>

                <Row className="mt-1">
                    {
                        this.state.condominios.map((value,index) => {
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
                        })
                    }
                </Row>
            </div>
        );
    }


};