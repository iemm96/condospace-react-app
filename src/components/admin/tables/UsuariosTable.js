import React from "react";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {PaginationListStandalone, PaginationProvider} from "react-bootstrap-table2-paginator";
import {Button, Col} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {fetchRecordsByParam} from "../../../actions/fetchRecordsByParam";
import Skeleton from 'react-loading-skeleton';
import {Buscador} from './../common/buscador';
import {options} from "../../../constants/tables_options";
import {DeleteRecordModal} from "../modals/DeleteRecordModal";
//Change
import {ModalUsuario} from "../modals/ModalUsuario";

//Change
const RESOURCE = 'administradores'; //API
const NEW_BUTTON_TEXT = 'Nuevo Administrador';
const PLACEHOLDER_SEARCH_TEXT = `Buscar ${RESOURCE}...`;

let records = [];

export default class UsuariosTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            edit: false
        };
    }

    async componentDidMount() {
        console.log(this.props.match.params.idCondominio);

        try {
            records = await fetchRecordsByParam('administradoresCondominio',this.props.match.params.idCondominio);
            this.setState({records:records});
        }catch (error) {
            console.log(error);
        }
    }

    updateUsuarios = async () => {
        records = await fetchRecordsByParam('administradoresCondominio',this.props.match.params.idCondominio);
        this.setState({records:records});
    };

    actionsFormatter = (cell, row) => (<div>
            <Button type="Button" onClick={() => this.prepareEditModal(row.idAnuncio)} className="btn mr-2 btn-primary"><FontAwesomeIcon icon={faEdit}/></Button>
            <Button type="Button" onClick={() => this.prepareDeleteModal(row.idAnuncio, row.titulo)} className="btn btn-danger"><FontAwesomeIcon icon={faTrash} /></Button>
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
            dataField: 'name',
            text: 'Nombre',
            sort: true,
        },{
            dataField: 'email',
            text: 'Correo',
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
                 <ModalUsuario
                     idRecord={this.state.idRecord}
                     toggleModal={this.toggleModal}
                     recordModal={this.state.recordModal}
                     idCondominio={this.props.match.params.idCondominio}
                     resource={RESOURCE}
                     update={this.updateUsuarios}
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
