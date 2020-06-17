import React, {useEffect, useState} from "react";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {PaginationListStandalone, PaginationProvider} from "react-bootstrap-table2-paginator";
import {Button, Col } from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import { fetchRecords } from "../../../actions/fetchRecords";
import Skeleton from 'react-loading-skeleton';
import { Buscador } from './../common/buscador';
import { options } from "../../../constants/tables_options";
import { DeleteRecordModal } from "../modals/DeleteRecordModal";
import ModalRecord from "../modals/ModalArea";
import {useUsuario} from "../../../context/usuario-context";
const RESOURCE = 'areas'; //API
const NEW_BUTTON_TEXT = 'Nueva Area';
const PLACEHOLDER_SEARCH_TEXT = `Buscar ${RESOURCE}...`;

const AreaTable  = () => {
    const {idCondominio} = useUsuario();
    const [records,setRecords] = useState(null);
    const [modalControl,setModalControl] = useState(false);
    const [modalDeleteControl,setModalDeleteControl] = useState(false);
    const [selectedRecordId,setSelectedRecordId] = useState(null);
    const [selectedRecordTitle,setSelectedRecordTitle] = useState(null);

    useEffect(() => {
        async function getRecords() {
            try {
                const result = await fetchRecords(`areas/getRecords/${idCondominio}`);
                setRecords(result);
            }catch (e) {
                console.log(e);
            }
        }

        getRecords();
    },[])


    //Change "titulo" if necessary
    const actionsFormatter = (cell, row) => (
        <div className="text-center">
            <Button type="Button" onClick={() => prepareEditModal(row.idAreas)} className="btn mr-2 btnAction"><FontAwesomeIcon icon={faEdit}/></Button>
            <Button type="Button" onClick={() => prepareDeleteModal(row.idAreas, row.nombre)} className="btn btnAction"><FontAwesomeIcon icon={faTrash} /></Button>
        </div>
    );

    const prepareEditModal = (idRecord) => {
        setSelectedRecordId(idRecord);
        toggleModal();
    };


    const toggleModal = () => {
        setModalControl(!modalControl);
    };

    const toggleDeleteModal = () => {
        setModalDeleteControl(!modalDeleteControl);
    };

    const prepareNewModal = () => {
        setSelectedRecordId(null);
        toggleModal();
    };

    const prepareDeleteModal = (id,title) => {
        setSelectedRecordId(id);
        setSelectedRecordTitle(title);
    };

    const columns = [{
        dataField: 'nombre',
        text: 'Área',
        sort: true,
    },{
        dataField: 'tipo',
        text: 'Tipo',
        sort: true,
    },{
        dataField: 'actions',
        text: 'Acciones',
        isDummyField: true,
        csvExport: false,
        formatter: actionsFormatter,
        headerStyle: { textAlign:'center'}
    }];

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
                            <Buscador toggleModal = {toggleModal}
                                      prepareNewModal={prepareNewModal}
                                      buttonText={NEW_BUTTON_TEXT}
                                      placeholderText={PLACEHOLDER_SEARCH_TEXT}
                                      { ...toolkitprops.searchProps }
                            />
                            <div className="mt-5">
                                <BootstrapTable
                                    hover
                                    bordered={false}
                                    rowStyle={{ backgroundColor: '#ECF7FD' }}
                                    { ...toolkitprops.baseProps }
                                    { ...paginationTableProps }
                                />
                            </div>
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

export default AreaTable;