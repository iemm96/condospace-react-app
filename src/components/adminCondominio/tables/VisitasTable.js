import React from "react";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {PaginationListStandalone, PaginationProvider} from "react-bootstrap-table2-paginator";
import {Button, Col} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {fetchRecords} from "../../../actions/fetchRecords";
import Skeleton from 'react-loading-skeleton';
import {Buscador} from './../common/buscador';
import {options} from "../../../constants/tables_options";
import {DeleteRecordModal} from "../modals/DeleteRecordModal";
//Change
import ModalRecord from "../modals/ModalVisitante";
import ModalRecordVehiculo from "../modals/ModalVehiculo";
//Change
const RESOURCE1 = 'vehiculos'; //API
const RESOURCE = 'visitantes'; //API
const NEW_BUTTON_TEXT = 'Nuevo Visitante';
const PLACEHOLDER_SEARCH_TEXT = `Buscar ${RESOURCE}...`;

let records = [];
let recordsVehiculo = [];
export default class VisitasTable extends React.Component {

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
            recordsVehiculo = await fetchRecords(RESOURCE1);
            this.setState({records:recordsVehiculo});

        }catch (error) {
            console.log(error);
        }

    }

    //Change "titulo" if necessary
    actionsFormatter = (cell, row) => (
        <div>
            <Button type="Button" onClick={() => this.prepareEditModal(row.idVisitante)} className="btn mr-2 btn-primary"><FontAwesomeIcon icon={faEdit}/></Button>
            <Button type="Button" onClick={() => this.prepareDeleteModal(row.idVisitante, row.nombre)} className="btn btn-danger"><FontAwesomeIcon icon={faTrash} /></Button>
            <Button type="Button" onClick={() => this.prepareNewModalVehiculo(row.idVisitante)} className="btn btn-success"><FontAwesomeIcon icon={faEdit} /></Button>

        </div>
    );

    toggleModal = () => {
        this.state.recordModal ? this.setState({recordModal: false}) : this.setState({recordModal: true});
    };
    toggleModalVehiculo = () => {
        this.state.recordModalVehiculo ? this.setState({recordModalVehiculo: false}) : this.setState({recordModalVehiculo: true});
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
    prepareNewModalVehiculo = (id) => {
        this.setState({idRecord: id});

        this.toggleModalVehiculo();
    };

    render() {

        const columns = [{
            dataField: 'nombre',
            text: 'Nombre',
            sort: true,
        },{
            dataField: 'idUnidad',
            text: 'Unidad',
            sort: true,
        },{
            dataField: 'noIdentificacion',
            text: 'Identificación',
            sort: true,
        },{
            dataField: 'fechaLlegada',
            text: 'Entrada',
            sort: true,
        },{
            dataField: 'fechaSalida',
            text: 'Salida',
            sort: true,
        },{
            dataField: 'placas',
            text: 'Placas',
            sort: true,
        },{
            dataField: 'actions',
            text: 'Acciones',
            isDummyField: true,
            csvExport: false,
            formatter: this.actionsFormatter,
        }];

         const contentTable = ({ paginationProps, paginationTableProps }) => (
             <div>
                 <ModalRecord
                     idRecord={this.state.idRecord}
                     toggleModal={this.toggleModal}
                     recordModal={this.state.recordModal}
                     resource={RESOURCE}
                 />
                 <ModalRecordVehiculo
                     idRecord={this.state.idRecord}
                     toggleModalVehiculo={this.toggleModalVehiculo}
                     recordModalVehiculo={this.state.recordModalVehiculo}
                     resource={RESOURCE1}
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
