import React,{useState,useEffect} from "react";
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
import ModalRecord from "../modals/ModalUnidad";
import {useUsuario} from "../../../context/usuario-context";

const RESOURCE = 'unidades'; //API
const NEW_BUTTON_TEXT = 'Nueva Unidad';
const PLACEHOLDER_SEARCH_TEXT = `Buscar ${RESOURCE}...`;


const UnidadTable  = () => {
    const { idCondominio } = useUsuario();
    const [records,setRecords] = useState(null);
    const [selectedRecordId,setSelectedRecordId] = useState(null);
    const [selectedRecordTitle,setSelectedRecordTitle] = useState(null);
    const [modalControl,setModalControl] = useState(false);
    const [modalDeleteControl,setModalDeleteControl] = useState(false);

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

    //Abre/cierra el modal del recurso
    const toggleModal = () => {
        setModalControl(!modalControl);
    };

    //Abre/cierra el modal de eliminar el recurso
    const toggleDeleteModal = () => {
        setModalDeleteControl(!modalDeleteControl);
    };

    //
    const prepareEditModal = (idRecord) => {
        setSelectedRecordId(idRecord);
        toggleModal();
    };

    const prepareNewModal = () => {
        setSelectedRecordId(null);
        toggleModal();
    };

    const prepareDeleteModal = (id,title) => {
        setSelectedRecordId(id);
        setSelectedRecordTitle(title);
        toggleDeleteModal();
    };

    const updateRecords = async () => {
        const result = await fetchRecords(RESOURCE,idCondominio);
        if(result) {
            setRecords(result);
        }
    };

    const actionsFormatter = (cell, row) => (<div className="text-center">
            <Button type="Button" onClick={() => prepareEditModal(row.idUnidad)} className="btn mr-2 btnAction"><FontAwesomeIcon icon={faEdit}/></Button>
            <Button type="Button" onClick={() => prepareDeleteModal(row.idUnidad, row.nombre)} className="btn btnAction"><FontAwesomeIcon icon={faTrash} /></Button>
        </div>
    );

    const columns = [{
        dataField: 'nombre',
        text: 'Nombre',
        sort: true,
    },{
        dataField: 'calle',
        text: 'Calle',
        sort: true,
    },{
        dataField: 'noExterior',
        text: 'Numero Exterior',
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
            {modalControl ? <ModalRecord
                idRecord={selectedRecordId}
                toggleModal={toggleModal}
                recordModal={modalControl}
                resource={RESOURCE}
                updateRecords={updateRecords}
            /> : ''}
            <DeleteRecordModal
                toggleDeleteModal={toggleDeleteModal}
                title={selectedRecordTitle}
                idRecord={selectedRecordId}
                deleteModal={modalDeleteControl}
                resource={RESOURCE}
                updateRecords={updateRecords}
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

export default UnidadTable;


