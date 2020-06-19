import React,{useState,useEffect} from "react";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {PaginationListStandalone, PaginationProvider} from "react-bootstrap-table2-paginator";
import {Button, Col} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faEye, faTrash} from "@fortawesome/free-solid-svg-icons";
import {fetchRecords} from "../../../actions/fetchRecords";
import Skeleton from 'react-loading-skeleton';
import {Buscador} from './../common/buscador';
import {options} from "../../../constants/tables_options";
import {DeleteRecordModal} from "../modals/DeleteRecordModal";
import {useUsuario} from "../../../context/usuario-context";

//Change
import ModalRecord from "../modals/ModalTransaccion";

//Change
const RESOURCE = 'transacciones'; //API
const NEW_BUTTON_TEXT = 'Nueva Transacción';
const PLACEHOLDER_SEARCH_TEXT = `Buscar ${RESOURCE}...`;


const TransaccionesTable  = (props) => {
    const {idCondominio} = useUsuario();
    const [records,setRecords] = useState(null);
    const [selectedRecordId,setSelectedRecordId] = useState(null);
    const [selectedRecordTitle,setSelectedRecordTitle] = useState(null);
    const [modalControl,setModalControl] = useState(false);
    const [modalDeleteControl,setModalDeleteControl] = useState(false);
    const [expanded,setExpanded] = useState([]);

    useEffect(() => {

        async function getRecords() {
            try {
                const result = await fetchRecords(`transacciones/getRecords/${idCondominio}`);
                setRecords(result);
            }catch (e) {
                console.log(e);
            }
        }
        getRecords();
    },[]);

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

    const actionsFormatter = (cell, row) => (<div className="d-flex justify-content-center">
            <Button type="Button" onClick={() => handleExpandButtonClick(row)} className="btn mr-2 btnAction"><FontAwesomeIcon icon={faEye}/></Button>
            <Button type="Button" onClick={() => prepareEditModal(row.idTransaccion)} className="btn mr-2 btnAction"><FontAwesomeIcon icon={faEdit}/></Button>
            <Button type="Button" onClick={() => prepareDeleteModal(row.idTransaccion, row.concepto)} className="btn btnAction"><FontAwesomeIcon icon={faTrash} /></Button>
        </div>
    );

    const columns = [{
        dataField: 'folio',
        text: 'Folio',
        sort: true,
    },{
        dataField: 'fechaCobro',
        text: 'Fecha',
        sort: true,
    },{
        dataField: 'concepto',
        text: 'Concepto',
        sort: true,
    },{
        dataField: 'unidad',
        text: 'Unidad',
        sort: true,
    },{
        dataField: 'monto',
        text: 'Monto',
        sort: true,
    },{
        dataField: 'actions',
        text: 'Acciones',
        isDummyField: true,
        csvExport: false,
        formatter: actionsFormatter,
        headerStyle: { textAlign:'center'}
    }];

    const toggleModal = () => {
        setModalControl(!modalControl);
    };

    const toggleDeleteModal = () => {
        setModalDeleteControl(!modalDeleteControl);
    };

    const updateRecords = async () => {
        console.log('updating');
        const result = await fetchRecords(`transacciones/getRecords/${idCondominio}`);
        if(result) {
            setRecords(result);
        }
    };

    const rowStyle = (row, rowIndex) => {

        if(row.esIngreso === 1) {
            return { backgroundColor: '#A2F8B1' };
        }else{
            return { backgroundColor: '#FFAFCD' };
        }
        
    };
    
    const handleExpandButtonClick = (row) => {
        if (!expanded.includes(row.idTransaccion)) {

            setExpanded([...expanded,row.idTransaccion]);
        } else {
            setExpanded(expanded.filter(x => x !== row.idTransaccion));
        }
    };

    const handleOnExpand = (row, isExpand, rowIndex, e) => {
        if (isExpand) {
            setExpanded([...expanded, row.idTransaccion]);
        } else {
            setExpanded(expanded.filter(x => x !== row.idTransaccion));
        }
    };

    const expandRow =  {
        renderer: row => (
            <div>
                <p><b>Descripción:</b> {row.descripcion}</p>
                <p><b>Forma de pago:</b> {row.formaPago === 1 ? 'Efectivo' : 'Cheque'}</p>
                {row.referencia ? <p><b>Referencia:</b> {row.referencia}</p> : ''}
                <p><b>Cuenta:</b> {row.nombre}</p>
            </div>
        ),
        expanded: expanded,
        onExpand: handleOnExpand,
        onlyOneExpanding: true,
        expandByColumnOnly: true
    };

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
                keyField="idTransaccion"
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
                                    isKey={true}
                                    bordered={false}
                                    hover
                                    rowStyle={ rowStyle }
                                    expandRow={ expandRow }
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

export default TransaccionesTable;


