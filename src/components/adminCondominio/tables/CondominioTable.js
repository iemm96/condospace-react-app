import React from "react";
import ToolkitProvider, {Search} from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {PaginationListStandalone, PaginationProvider} from "react-bootstrap-table2-paginator";
import {Button, Col, TabPane} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import { fetchRecords } from "../../../actions/fetchRecords";
import Skeleton from 'react-loading-skeleton';
import { Buscador } from './../common/buscador';
import { options } from "../../../constants/tables_options";
import { DeleteRecordModal } from "../modals/DeleteRecordModal";

//Change
import ModalRecord from "../modals/ModalCondominio";

//Change
const RESOURCE = 'condominios'; //API

const NEW_BUTTON_TEXT = 'Nuevo Condominio';
const PLACEHOLDER_SEARCH_TEXT = `Buscar ${RESOURCE}...`;

let records = [];

export default class CondominioTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            edit: false
        };
    }

    async componentDidMount() {
        try {
            records = await fetchRecords(RESOURCE);
            this.setState({records:records});
        }catch (error) {
            console.log(error);
        }
    }

    //Change "titulo" if necessary
    actionsFormatter = (cell, row) => (<div>
            <Button type="Button" onClick={() => this.prepareEditModal(row.idCondominio)} className="btn mr-2 btn-primary"><FontAwesomeIcon icon={faEdit}/></Button>
            <Button type="Button" onClick={() => this.prepareDeleteModal(row.idCondominio, row.nombre)} className="btn btn-danger"><FontAwesomeIcon icon={faTrash} /></Button>
        </div>
    );

    toggleModal = () => {
        this.state.recordModal ? this.setState({recordModal: false}) : this.setState({recordModal: true});
    };

    toggleDeleteModal = () => {
        this.state.deleteModal ? this.setState({deleteModal: false}) : this.setState({deleteModal: true});
    };

    prepareDeleteModal = (id,title) => {
        this.setState({idRecord: id, title: title});

        this.toggleDeleteModal();
    };

    prepareEditModal = idRecord => {
        this.setState({idRecord:idRecord});

        this.toggleModal();
    };

    prepareNewModal = () => {
        this.setState({idRecord: false});

        this.toggleModal();
    };

    render() {

        const columns = [{
            dataField: 'nombreCondominio',
            text: 'Nombre',
            sort: true,
        },{
            dataField: 'dominio',
            text: 'Dominio',
            sort: true,
        },{
            dataField: 'calle',
            text: 'Av. Vallarta',
            sort: true,
        },{
            dataField: 'noExterior',
            text: 'No. Exterior',
            sort: true,
        },{
            dataField: 'entre1',
            text: 'Entre calle 1',
            sort: true,
        },{
            dataField: 'entre2',
            text: 'Entre calle 2',
            sort: true,
        },{
            dataField: 'cp',
            text: 'Codigo Postal',
            sort: true,
        },{
            dataField: 'ciudad',
            text: 'Ciudad',
            sort: true,
        },{
            dataField: 'municipio',
            text: 'Municipio',
            sort: true,
        },{
            dataField: 'estado',
            text: 'Estado',
            sort: true,
        },{
            dataField: 'pais',
            text: 'Pais',
            sort: true,
        },{
            dataField: 'actions',
            text: 'Acciones',
            isDummyField: true,
             csvExport: false,
             formatter: this.actionsFormatter,
        }
        ];

        const contentTable = ({ paginationProps, paginationTableProps }) => (
            <div>
                <ModalRecord
                    idRecord={this.state.idRecord}
                    toggleModal={this.toggleModal}
                    recordModal={this.state.recordModal}
                    resource={RESOURCE}
                />
                <DeleteRecordModal
                    toggleDeleteModal={this.toggleDeleteModal}
                    title={this.state.title}
                    idRecord={this.state.idRecord}
                    deleteModal={this.state.deleteModal}
                    resource={RESOURCE}
                />
                <ToolkitProvider
                    keyField="id"
                    columns={ columns }
                    data={ this.state.records }
                    search>
                    {
                        toolkitprops => (
                            <div>
                                <Buscador prepareNewModal={this.prepareNewModal}
                                          buttonText={NEW_BUTTON_TEXT}
                                          placeholderText={PLACEHOLDER_SEARCH_TEXT}
                                          { ...toolkitprops.searchProps }
                                />
                                <BootstrapTable
                                    hover
                                    { ...toolkitprops.baseProps }
                                    { ...paginationTableProps }
                                />
                            </div>
                        )
                    }
                </ToolkitProvider>
                <PaginationListStandalone { ...paginationProps } />
            </div>
        );

        if(this.state.records) {

            console.log(this.state.idRecord);
            return(
                <div>
                    <Col className="col-3">
                    </Col>
                    <PaginationProvider
                        pagination={paginationFactory(options(records))}>

                        {contentTable}

                    </PaginationProvider>
                </div>
            );
        }else{
            return(<div style={{ fontSize: 20, lineHeight: 2 }}>
                <h1>{<Skeleton />}</h1>
                {<Skeleton count={5} />}
            </div>);
        }

    }

}
