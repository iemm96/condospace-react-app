import React from "react";
import ToolkitProvider, {Search} from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {PaginationListStandalone, PaginationProvider} from "react-bootstrap-table2-paginator";
import {Button, Col, TabPane} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import ModalRegister from "../modals/ModalAnuncio";
import { Row } from "reactstrap";
import { DeleteRecordModal } from "../modals/DeleteRecordModal";

import {url_base} from '../../../constants/api_url';
import ModalEvento from "../modals/ModalEvento";

const { SearchBar } = Search;
const api_url = url_base;

let anuncios = [{

}];

const Buscador = (props) => {
    let input;
    const search = () => {
        props.onSearch(input.value);
    };
    return (
        <Row className="row mb-2 justify-content-between">
            <div className="col-3">
                <input
                    placeholder="Buscar anuncios..."
                    className="form-control"
                    ref={ n => input = n }
                    type="text"
                    onChange={search}
                />
            </div>
            <div className="col-2">
                <Button className="actionButton" onClick={() => props.prepareNewModal()}>Nuevo Anuncio</Button>
            </div>
        </Row>
    );
};

export default class TableEventos extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            anuncios: anuncios,
            edit: false,
            idEditRecord: false,
            titulo: '',
            mensaje: '',
            id_visibilidad: '',
            id_nivelImportancia: ''
        };
    }

    componentDidMount() {

        fetch(`${api_url}anuncios`, {
            // mode: 'no-cors',
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        },)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }

            }).then(response =>
                this.setState({anuncios: response})
        );
    }

    toggleModal = () => {
        this.state.modalRecord ? this.setState({modalRecord: false}) : this.setState({modalRecord: true});
    };

    prepareNewModal = () => {
        this.setState({edit: false});

        this.toggleModal();
    }

    prepareEditModal = id => {
        this.setState({edit: true, idRegister: id});

        fetch(`${api_url}anuncios/${id}`, {
            // mode: 'no-cors',
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        },)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }

            }).then(response =>
            this.setState({
                titulo: response.titulo,
                mensaje: response.mensaje,
                id_visibilidad: response.id_visibilidad,
                id_nivelImportancia: response.id_nivelImportancia
            })
        );

        this.toggleModal();
    }

    toggleDeleteModal = () => {
        this.state.deleteModal ? this.setState({deleteModal: false}) : this.setState({deleteModal: true});
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleNewRegister = event => {

        event.preventDefault();
        fetch(`${api_url}anuncios`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json, text-plain, */*",
            },
            body:JSON.stringify({
                titulo:this.state.titulo,
                mensaje:this.state.mensaje,
                id_visibilidad:this.state.id_visibilidad,
                id_nivelImportancia:this.state.id_nivelImportancia,
            })
        }).then((res) => res.json())
            .then((data) =>  console.log(data))
            .catch((err)=>console.log(err))

    }

    handleEditRegister = event => {

        event.preventDefault();
        fetch(`${api_url}anuncios/${this.state.idRegister}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json, text-plain, */*",
            },
            body:JSON.stringify({
                titulo:this.state.titulo,
                mensaje:this.state.mensaje,
                id_visibilidad:this.state.id_visibilidad,
                id_nivelImportancia:this.state.id_nivelImportancia,
            })
        }).then((res) => res.json())
            .then((data) =>  console.log(data))
            .catch((err)=>console.log(err))
    }

    prepareDeleteModal = (id,titulo) => {
        this.setState({idRegister: id, titulo: titulo});

        this.toggleDeleteModal();
    }

    deleteRegister = () => {
        fetch(`${api_url}anuncios/${this.state.idRegister}`, {
            method: 'DELETE',
        }).then((res) => res)
            .then((data) =>  {
                if(data.ok) {
                    window.location.reload();
                }
            })
            .catch((err)=>console.log(err))
    }


    actionsFormatter = (cell, row) => (<div>
         <Button type="Button" onClick={() => this.prepareEditModal(row.id)} className="btn mr-2 btn-primary"><FontAwesomeIcon icon={faEdit}/></Button>
         <Button type="Button" onClick={() => this.prepareDeleteModal(row.id, row.titulo)} className="btn btn-danger"><FontAwesomeIcon icon={faTrash} /></Button>
     </div>);

     render() {

         const columns = [{
             dataField: 'titulo',
             text: 'Título',
             sort: true,
         },{
             dataField: 'mensaje',
             text: 'Mensaje',
             sort: true,
         },{
             dataField: 'id_visibilidad',
             text: 'Visible para',
             sort: true,
         },{
             dataField: 'actions',
             text: 'Acciones',
             isDummyField: true,
             csvExport: false,
             formatter: this.actionsFormatter,
         },];

         const options = {
             custom: true,
             paginationSize: 4,
             pageStartIndex: 1,
             firstPageText: 'Inicio',
             prePageText: 'Atrás',
             nextPageText: 'Siguiente',
             lastPageText: 'Final',
             nextPageTitle: 'Primer página',
             prePageTitle: 'Página anterior',
             firstPageTitle: 'Página siguiente',
             lastPageTitle: 'Última página',
             showTotal: true,
             totalSize: anuncios.length
         };

         const contentTable = ({ paginationProps, paginationTableProps }) => (
             <div>
                 <ModalEvento
                     toggleModal={this.toggleModal}
                     modalRecord={this.state.modalRecord}
                     idEditRecord={this.state.idEditRecord}
                 />
                 <DeleteRecordModal
                     toggleDeleteModal={this.toggleDeleteModal}
                     titulo={this.state.titulo}
                     deleteRegister={this.deleteRegister}
                     deleteModal={this.state.deleteModal}/>
                 <ToolkitProvider
                     keyField="id"
                     columns={ columns }
                     data={ this.state.anuncios }
                     search>
                     {
                         toolkitprops => (
                             <div>
                                 <Buscador prepareNewModal={this.prepareNewModal} { ...toolkitprops.searchProps } />
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

         return(
             <div>
                 <Col className="col-3">
                 </Col>
                 <PaginationProvider
                     pagination={paginationFactory(options)}>

                     {contentTable}

                 </PaginationProvider>
             </div>

         );
     }

}
