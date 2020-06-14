import React, {useEffect, useState} from "react";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {PaginationListStandalone, PaginationProvider} from "react-bootstrap-table2-paginator";
import {Button, Col, Spinner} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faEye, faPause, faPlay, faSignOutAlt, faTrash} from "@fortawesome/free-solid-svg-icons";
import {fetchRecords} from "../../../actions/fetchRecords";
import Skeleton from 'react-loading-skeleton';
import {Buscador} from './../common/buscador';
import {options} from "../../../constants/tables_options";
import moment from 'moment';
import {DeleteRecordModal} from "../modals/DeleteRecordModal";
//Change
import ModalRecord from "../modals/ModalVisitas";
import ModalRecordVehiculo from "../modals/ModalVehiculo";
import {useUsuario} from "../../../context/usuario-context";
import CookieService from "../../../services/CookieService";
import axios from "axios";
import {url_base} from "../../../constants/api_url";
import {updateRecord} from "../../../actions/updateRecord";
//Change
const RESOURCE1 = 'vehiculos'; //API
const RESOURCE = 'visitantes'; //API
const NEW_BUTTON_TEXT = 'Nuevo Visitante';
const PLACEHOLDER_SEARCH_TEXT = `Buscar ${RESOURCE}...`;
const api_url = url_base;

let records = [];
let recordsVehiculo = [];
const VisitasTable = () => {

    const { idCondominio } = useUsuario();
    const [records,setRecords] = useState(null);
    const [modalControl,setModalControl] = useState(false);
    const [modalDeleteControl,setModalDeleteControl] = useState(false);
    const [selectedRecordId,setSelectedRecordId] = useState(null);
    const [selectedRecordTitle,setSelectedRecordTitle] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const [expanded,setExpanded] = useState([]);

    useEffect(() => {
        async function getRecords() {
            try {
                const result = await fetchRecords(`visitas/getRecords/${idCondominio}`);
                setRecords(result);
            }catch (e) {
                console.log(e);
            }
        }

        getRecords();
    },[]);

    const finalizarVisita = async (e,visita,row) => {

        setIsLoading(true);
        try {
            const response = updateRecord({fechaHora_salida:moment().format('YYYY-MM-DD HH:mm:s')},'visitas',visita);

            if(response) {
                setIsLoading(false);
                updateRecords();
            }

        }catch (e) {
            console.log(e);
        }
    };

    const handleExpandButtonClick = (row) => {
        if (!expanded.includes(row.idVisita)) {

            setExpanded([...expanded,row.idVisita]);
        } else {
            setExpanded(expanded.filter(x => x !== row.idVisita));
        }
    };
    
    const actionsFormatter = (cell, row) => (<div>

            {row.fechaHora_salida ? '' : <Button type="Button" onClick={(e) => finalizarVisita(e,row.idVisita,row)} className="btn mr-1 btnAction">
                <FontAwesomeIcon icon={faSignOutAlt}/>
            </Button> }

            <Button type="Button" onClick={() => handleExpandButtonClick(row)} className="btn mr-1 btnAction"><FontAwesomeIcon icon={faEye}/></Button>

            <Button type="Button" onClick={() => prepareEditModal(row.idVisita)} className="btn mr-1 btnAction"><FontAwesomeIcon icon={faEdit}/></Button>
            <Button type="Button" onClick={() => prepareDeleteModal(row.idVisita, row.nombre)} className="btn btnAction"><FontAwesomeIcon icon={faTrash} /></Button>
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
        toggleDeleteModal();
    };

    const prepareNewModal = () => {
        setSelectedRecordId(null);
        toggleModal();
    };

    const prepareEditModal = (idRecord) => {
        setSelectedRecordId(idRecord);
        toggleModal();
    };

    const updateRecords = async () => {
        console.log('updating');
        const result = await fetchRecords(`visitas/getRecords/${idCondominio}`);
        if(result) {
            setRecords(result);
        }
    };

    const handleOnExpand = (row, isExpand, rowIndex, e) => {
        if (isExpand) {
            setExpanded([...expanded, row.idVisita]);
        } else {
            setExpanded(expanded.filter(x => x !== row.idVisita));
        }
    };

    const rowStyle = (row, rowIndex) => {

        if(row.fechaHora_salida) {
            return { backgroundColor: '#A2F8B1' };
        }else{
            return { backgroundColor: '#F4F4F6' };
        }
    };

    const expandRow =  {
        renderer: row => (
            <div>
                <p><b>Descripción:</b> {row.descripcion}</p>
                {row.unidad ? <p><b>Unidad:</b> {row.unidad}</p> : ''}
            </div>
        ),
        expanded: expanded,
        onExpand: handleOnExpand,
        onlyOneExpanding: true,
        expandByColumnOnly: true
    };

    const columns = [{
        dataField: 'nombre',
        text: 'Nombre',
        sort: true,
    },{
        dataField: 'unidad',
        text: 'Unidad',
        sort: true,
    },{
        dataField: 'noIdentificacion',
        text: 'Identificación',
        sort: true,
    },{
        dataField: 'fechaHora_llegada',
        text: 'Entrada',
        sort: true,
    },{
        dataField: 'fechaHora_salida',
        text: 'Salida',
        sort: true,
    },{
        dataField: 'datosVehiculo.placas',
        text: 'Placas',
        sort: true,
    },{
        dataField: 'actions',
        text: 'Acciones',
        isDummyField: true,
        csvExport: false,
        formatter: actionsFormatter,
        headerStyle: { textAlign:'center', width: 206}

    }];
    
         const contentTable = ({ paginationProps, paginationTableProps }) => (
             <div className="text-center">
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
                                         rowStyle={rowStyle}
                                         hover
                                         bordered={false}
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

export default VisitasTable;

