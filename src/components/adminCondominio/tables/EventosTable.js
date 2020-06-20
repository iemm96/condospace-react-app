import React, {useEffect, useState} from "react";
import ToolkitProvider, {Search} from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {PaginationListStandalone, PaginationProvider} from "react-bootstrap-table2-paginator";
import {Button, Col, TabPane} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faEye, faPause, faPlay, faSignOutAlt, faTrash} from "@fortawesome/free-solid-svg-icons";
import { fetchRecords } from "../../../actions/fetchRecords";
import Skeleton from 'react-loading-skeleton';
import { Buscador } from './../common/buscador';
import { options } from "../../../constants/tables_options";
import { DeleteRecordModal } from "../modals/DeleteRecordModal";

//Change
import ModalRecord from "../modals/ModalEvento";
import {useUsuario} from "../../../context/usuario-context";

//Change
const RESOURCE = 'eventos'; //API
const NEW_BUTTON_TEXT = 'Nuevo Evento';
const PLACEHOLDER_SEARCH_TEXT = `Buscar ${RESOURCE}...`;

const EventosTable = (props) =>
{
    const { idCondominio } = useUsuario();
    const [records,setRecords] = useState(null);
    const [modalControl,setModalControl] = useState(false);
    const [modalDeleteControl,setModalDeleteControl] = useState(false);
    const [selectedRecordId,setSelectedRecordId] = useState(null);
    const [selectedRecordTitle,setSelectedRecordTitle] = useState(null);
    const [expanded,setExpanded] = useState([]);

    useEffect(() => {
        async function getRecords() {
            try {
                const result = await fetchRecords(RESOURCE,idCondominio);
                setRecords(result);
            }catch (e) {
                console.log(e);
            }
        }

        getRecords();
    },[]);
    //Change "titulo" if necessary
    const actionsFormatter = (cell, row) => (
        <div className="text-center">
            <Button type="Button" onClick={() => prepareEditModal(row.idEvento)} className="btn mr-1 btnAction"><FontAwesomeIcon icon={faEdit}/></Button>
            <Button type="Button" onClick={() => prepareDeleteModal(row.idEvento, row.nombre)} className="btn btnAction"><FontAwesomeIcon icon={faTrash} /></Button>
        </div>
    );
    const handleExpandButtonClick = (row) => {
        if (!expanded.includes(row.idEvento)) {

            setExpanded([...expanded,row.idEvento]);
        } else {
            setExpanded(expanded.filter(x => x !== row.idEvento));
        }
    };
    const updateRecords = async () => {
        console.log('updating');
        const result = await fetchRecords(RESOURCE,idCondominio);

        if(result) {
            setRecords(result);
        }
    };
    const toggleModal = () => {
        setModalControl(!modalControl);
    };

    const toggleDeleteModal = () => {
        setModalDeleteControl(!modalDeleteControl);
    };

    const prepareEditModal = (idRecord) => {
        setSelectedRecordId(idRecord);
        toggleModal();
    };
    const prepareDeleteModal = (id,title) => {
        setSelectedRecordId(id);
        setSelectedRecordTitle(title);
    };

    const prepareNewModal = () => {
        setSelectedRecordId(null);
        toggleModal();
    };

    const columns = [{
        dataField: 'nombre',
        text: 'Evento',
        sort: true,
    },{
        dataField: 'fecha',
        text: 'Fecha y Hora',
        sort: true,
    },{
        dataField: 'area',
        text: 'Lugar',
        sort: true,
    },{
    dataField: 'actions',
    text: 'Acciones',
    isDummyField: true,
    csvExport: false,
    formatter: actionsFormatter,
    headerStyle: { textAlign:'center', width: 204}
}];

    const contentTable = ({ paginationProps, paginationTableProps }) => (
        <div>
            <ModalRecord
                idRecord={selectedRecordId}
                toggleModal={toggleModal}
                recordModal={modalControl}
                resource={RESOURCE}
                updateRecords={ updateRecords}
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
                            <Buscador prepareNewModal={prepareNewModal}
                                      buttonText={NEW_BUTTON_TEXT}
                                      placeholderText={PLACEHOLDER_SEARCH_TEXT}
                                      { ...toolkitprops.searchProps }
                            />
                            <div className="mt-5">
                                <BootstrapTable
                                    hover
                                    rowStyle={{ backgroundColor: '#ECF7FD' }}
                                    bordered={false}

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
export default EventosTable;
