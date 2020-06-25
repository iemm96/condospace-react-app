import React, {useEffect, useState} from "react";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {PaginationListStandalone, PaginationProvider} from "react-bootstrap-table2-paginator";
import {Button, Col} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faArrowRight,
    faCheck,
    faEdit,
    faEye,
    faTrash
} from "@fortawesome/free-solid-svg-icons";
import {fetchRecords} from "../../../actions/fetchRecords";
import Skeleton from 'react-loading-skeleton';
import {Buscador} from './../common/buscador';
import {options} from "../../../constants/tables_options";
import {DeleteRecordModal} from "../modals/DeleteRecordModal";
import {url_base} from "./../../../constants/api_url";

//Change
import ModalRecord from "../modals/ModalCuota";
import {useUsuario} from "../../../context/usuario-context";
import axios from "axios";
import CookieService from "../../../services/CookieService";
import Row from "reactstrap/es/Row";
import moment from "moment";
import PayModal from "../modals/PayModal";

//Change
const RESOURCE = 'cuotas'; //API
const NEW_BUTTON_TEXT = 'Nueva Cuota';
const PLACEHOLDER_SEARCH_TEXT = `Buscar ${RESOURCE}...`;
const api_url = url_base;

const CuotaTableResidente = (props) => {
    const { idCondominio } = useUsuario();
    const [records,setRecords] = useState(null);
    const [modalControl,setModalControl] = useState(false);
    const [modalDeleteControl,setModalDeleteControl] = useState(false);
    const [selectedRecordId,setSelectedRecordId] = useState(null);
    const [selectedRecordTitle,setSelectedRecordTitle] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const [expanded,setExpanded] = useState([]);
    const [modalPayControl,setModalPayControl] = useState(false);


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



    const toggleActiva = async (e,cuota,row) => {
        const authToken = CookieService.get('access_token');

        setIsLoading(true);
        try {
            const response = await axios({
                url:`${api_url}cuotas/toggleActiva/${cuota}`,
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json, text-plain, */*",
                    "Authorization": 'Bearer ' + authToken,
                },
            });

            if(response) {
                setIsLoading(false);
                updateRecords();
            }

        }catch (e) {
            console.log(e);
        }
    };

    const handleExpandButtonClick = (row) => {
        if (!expanded.includes(row.idCuota)) {

            setExpanded([...expanded,row.idCuota]);
        } else {
            setExpanded(expanded.filter(x => x !== row.idCuota));
        }
    };

    const prepareEditModal = (idRecord) => {
        setSelectedRecordId(idRecord);
        toggleModal();
    };

    const handleOnExpand = (row, isExpand, rowIndex, e) => {
        if (isExpand) {
            setExpanded([...expanded, row.idCuota]);
        } else {
            setExpanded(expanded.filter(x => x !== row.idCuota));
        }
    };

    //Change "titulo" if necessary
    const actionsFormatter = (cell, row) => (<div>

            <Button type="Button" onClick={() => preparePayModal(row.idCuota, row.nombre)} className="btn mr-1 btnAction"><FontAwesomeIcon icon={faCheck}/></Button>

            <Button type="Button" onClick={() => handleExpandButtonClick(row)} className="btn mr-1 btnAction"><FontAwesomeIcon icon={faEye}/></Button>

            <Button type="Button" onClick={() => prepareEditModal(row.idCuota)} className="btn mr-1 btnAction"><FontAwesomeIcon icon={faEdit}/></Button>
            <Button type="Button" onClick={() => prepareDeleteModal(row.idCuota, row.nombre)} className="btn btnAction"><FontAwesomeIcon icon={faTrash} /></Button>
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

    const preparePayModal = (id,title) => {
        setSelectedRecordTitle(title)
        togglePayModal();
    }

    const togglePayModal = () => {
        setModalPayControl(!modalPayControl);
    }

    const updateRecords = async () => {
        console.log('updating');
        const result = await fetchRecords(RESOURCE,idCondominio);

        if(result) {
            setRecords(result);
        }
    };

    const handleClickMesAnterior = () => {

        const table = document.getElementById('recordTable');
        table.classList.remove('fadeInLeft');

        table.classList.add('fadeOut');

        setTimeout(() => {  table.classList.add('fadeInLeft'); }, 1000);

        /*
        table.classList.remove('fadeOut');
        setTimeout(() => {  console.log('await') }, 1000);

        table.classList.add('fadeInRight');*/


    };

    const rowStyle = (row) => {

        if(row.esActiva === 1) {
            return { backgroundColor: '#A2F8B1' };
        }else{
            return { backgroundColor: '#F4F4F6' };
        }
    };

    const columns = [{
        dataField: 'nombre',
        text: 'Nombre',
        sort: true,
    },{
        dataField: 'monto',
        text: 'Monto',
        sort: true,
    },{
        dataField: 'tipoCuota',
        text: 'Tipo de Cuota',
        sort: true,
    },{
        dataField: 'fechaSigCobro',
        text: 'Siguiente Cobro',
        sort: true,
    },{
        dataField: 'tipoPeriodicidad',
        text: 'Periodicidad',
        sort: true,
    },{
        dataField: 'actions',
        text: 'Acciones',
        isDummyField: true,
        csvExport: false,
        formatter: actionsFormatter,
        headerStyle: { textAlign:'center', width: 206}
    }];

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

    const contentTable = ({ paginationProps, paginationTableProps }) => (
        <div className="">
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
            <PayModal
                title={selectedRecordTitle}
                togglePayModal={togglePayModal}
                modalControl={modalPayControl}
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
                <Row>
                    <Col>
                        <Button onClick={handleClickMesAnterior} className="btnAction">
                            <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                            {' '}
                            {moment().subtract(1, 'months').format("MMMM")}
                        </Button>
                    </Col>
                    <Col className="text-center">
                        <h4>Cuotas periodo actual ({moment().format("MMMM")})</h4>
                    </Col>
                    <Col className="text-right">
                        <Button className="btnAction">
                            {moment().add(1, 'months').format("MMMM")}
                            {' '}
                            <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
                        </Button>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col className="col-3">
                    </Col>
                    <div id="recordTable" className="animate one">
                        <PaginationProvider
                            pagination={paginationFactory(options(records))}>
                            {contentTable}
                        </PaginationProvider>
                    </div>

                </Row>
            </div>

        );
    }else{
        return(<div style={{ fontSize: 20, lineHeight: 2 }}>
            <h1>{<Skeleton />}</h1>
            {<Skeleton count={5} />}
        </div>);
    }
};

export default CuotaTableResidente;
