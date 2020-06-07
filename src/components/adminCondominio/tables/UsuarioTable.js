import React, {useEffect, useState} from "react";
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

import ModalRecord from "../modals/ModalUsuario";


//Change
const RESOURCE = 'users'; //API
const NEW_BUTTON_TEXT = 'Nuevo Usuario';
const PLACEHOLDER_SEARCH_TEXT = `Buscar ${RESOURCE}...`;

const UsuarioTable = (props) => {
    const [records,setRecords] = useState(null);
    const [modalControl,setModalControl] = useState(false);
    const [modalDeleteControl,setModalDeleteControl] = useState(false);
    const [selectedRecordId,setSelectedRecordId] = useState(null);
    const [selectedRecordTitle,setSelectedRecordTitle] = useState(null);

    useEffect(() => {
        async function getRecords() {
            try {
                const result = await fetchRecords(RESOURCE);
                setRecords(result);
            }catch (e) {
                console.log(e);
            }
        }

        getRecords();
    },[]);

    const actionsFormatter = (cell, row) => (<div>
            <Button type="Button" onClick={() => setSelectedRecordId(row.id)} className="btn mr-2 btn-primary"><FontAwesomeIcon icon={faEdit}/></Button>
            <Button type="Button" onClick={() => prepareDeleteModal(row.id, row.titulo)} className="btn btn-danger"><FontAwesomeIcon icon={faTrash} /></Button>
        </div>
    );

    const toggleModal = () => {
        setModalControl(!modalControl);
    };

    const toggleDeleteModal = () => {
        setModalDeleteControl(!modalDeleteControl);
    };

    const prepareDeleteModal = (id,title) => {
        setSelectedRecordId(id);
        setSelectedRecordTitle(title);
    };

    const columns = [{
        dataField: 'nombre',
        text: 'Nombre',
        sort: true,
    },{
        dataField: 'email',
        text: 'Email',
        sort: true,
    },{
        dataField: 'tipoUsuario',
        text: 'Tipos',
        sort: true,
    },{
        dataField: 'actions',
        text: 'Acciones',
        isDummyField: true,
        csvExport: false,
        formatter: actionsFormatter,
    }
    ]

    const contentTable = ({ paginationProps, paginationTableProps }) => (
        <div>
            <ModalRecord
                idRecord={selectedRecordId}
                toggleModal={toggleModal}
                recordModal={modalControl}
                resource={RESOURCE}
            />
            <DeleteRecordModal
                toggleDeleteModal={toggleDeleteModal}
                title={selectedRecordTitle}
                idRecord={setSelectedRecordId}
                deleteModal={modalDeleteControl}
                resource={RESOURCE}
            />
            <ToolkitProvider
                keyField="id"
                columns={ columns }
                data={ records }
                search>
                {
                    toolkitprops => (
                        <div>
                            <Buscador toggleModal={toggleModal}
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

    if(records) {

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

};

export default UsuarioTable;
