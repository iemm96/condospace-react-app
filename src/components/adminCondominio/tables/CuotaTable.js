import React, {useEffect, useState} from "react";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {PaginationListStandalone, PaginationProvider} from "react-bootstrap-table2-paginator";
import {Button, Col, Spinner, TabContent, TabPane, NavItem, NavLink, Nav} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight, faEdit, faEye, faPause, faPlay, faTrash} from "@fortawesome/free-solid-svg-icons";
import {fetchRecords} from "../../../actions/fetchRecords";
import Skeleton from 'react-loading-skeleton';
import {Buscador} from './../common/buscador';
import {options} from "../../../constants/tables_options";
import {DeleteRecordModal} from "../modals/DeleteRecordModal";
import {url_base} from "./../../../constants/api_url";
import ModalRecord from "../modals/ModalCuota";
import {useUsuario} from "../../../context/usuario-context";
import axios from "axios";
import CookieService from "../../../services/CookieService";
import Row from "reactstrap/es/Row";
import moment from "moment";
import classnames from 'classnames';
import {BuscadorUnidades} from "../BuscadorUnidades";
import {fetchRecordsByParam} from "../../../actions/fetchRecordsByParam";
const RESOURCE = 'cuotas'; //API
const NEW_BUTTON_TEXT = 'Nueva Cuota';
const PLACEHOLDER_SEARCH_TEXT = `Buscar ${RESOURCE}...`;
const api_url = url_base;

const CuotaTable = () => {
    const [activeTab, setActiveTab] = useState('1');

    const { idCondominio } = useUsuario();
    const [records,setRecords] = useState(null);
    const [modalControl,setModalControl] = useState(false);
    const [modalDeleteControl,setModalDeleteControl] = useState(false);
    const [selectedRecordId,setSelectedRecordId] = useState(null);
    const [selectedRecordTitle,setSelectedRecordTitle] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const [expanded,setExpanded] = useState([]);
    const [unidades,setUnidades] = useState([]);
    const [tipoUnidad,setTipoUnidad] = useState(null);

    useEffect(() => {
        async function getRecords() {
            try {
                const result = await fetchRecords(RESOURCE,idCondominio);
                setRecords(result);
            }catch (e) {
                console.log(e);
            }
        }

        async function getUnidades() {

            try {
                const resultadoUnidades = await fetchRecordsByParam('getUnidadesByCondominio',idCondominio,idCondominio);

                let opcionesUnidades = [];

                if(resultadoUnidades) {
                    resultadoUnidades.map((val,index) => {
                        if(index === 0) {
                            setTipoUnidad(val.idUnidad);
                        }
                        opcionesUnidades.push({value:val.idUnidad,label:`${'Unidad ' + val.idUnidad}`,name:'idUnidad'});
                    });

                    setUnidades(opcionesUnidades);
                }
            }catch (e) {

            }
        }

        getUnidades();

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

            <Button type="Button" onClick={(e) => toggleActiva(e,row.idCuota,row)} className="btn mr-1 btnAction">
                {isLoading ? <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                /> : <FontAwesomeIcon icon={row.esActiva === 1 ? faPause  : faPlay}/>}

            </Button>
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
        headerStyle: { textAlign:'center', width: 204}
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
            <ToolkitProvider
                keyField="id"
                columns={ columns }
                data={ records }
                search>
                {
                    toolkitprops => (
                        <div>
                            <BuscadorUnidades prepareNewModal={prepareNewModal}
                                              unidades={unidades}
                                              setTipoUnidad={setTipoUnidad}
                                              tipoUnidad={tipoUnidad}
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

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    if(records) {

        return(
            <div className="mt-4">
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '1' }) + ' gray'}
                            onClick={() => { toggle('1'); }}
                        >
                            Pago de Cuotas por Unidad
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' }) + ' gray'}
                            onClick={() => { toggle('2'); }}
                        >
                            Administrar Cuotas
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <Row className="mt-4">
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
                    </TabPane>
                    <TabPane tabId="2">
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
                    </TabPane>
                </TabContent>
            </div>
        );
    }else{
        return(<div style={{ fontSize: 20, lineHeight: 2 }}>
            <h1>{<Skeleton />}</h1>
            {<Skeleton count={5} />}
        </div>);
    }
};

export default CuotaTable;
