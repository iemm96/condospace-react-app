import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "reactstrap";
import {Link, useHistory, withRouter} from "react-router-dom";
import MUIDataTable from "mui-datatables";
import {muiTableOptions} from "../../../constants/muiTableOptions";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import {fetchRecords} from "../../../actions/fetchRecords";
import {DeleteRecordModal} from "../modals/DeleteRecordModal";

const UsuariosCondominio = props => {
    const [ records, setRecords ] = useState([]);
    const history = useHistory();
    const idCondominio  = props.match.params.idCondominio;
    const [modalDeleteControl,setModalDeleteControl] = useState(false);
    const [selectedRecordId,setSelectedRecordId] = useState(null);
    const [selectedRecordTitle,setSelectedRecordTitle] = useState(null);

    useEffect(() => {
        getRecords();
    },[]);

    const getRecords = async () => {
        try {
            const result = await fetchRecords(`usuarios/getRecords/${idCondominio}`);

            if(result) {
                setRecords(result);
            }

        }catch (e) {
            console.log(e);
        }
    };

    const getMuiTheme = () => createMuiTheme({
        overrides: {
            MuiPaper:{
                root:{
                    borderRadius: '20px !important'
                }
            },
            MuiToolbar: {
                root: {
                    backgroundColor: '#12101D',
                    color:'white',
                    borderRadius:'20px 20px 0 0 !important'
                },
            },
            MuiTableFooter: {
                root: {
                    '& .MuiToolbar-root': {
                        backgroundColor: 'white',
                        color:'black'
                    },
                },
            },
            MuiIconButton:{
                root:{
                    color:'white'
                }
            },
            MuiTableHead:{
                root:{
                    borderRadius:'0'
                }
            },
            MuiTableCell:{
                root:{
                    border:'none !important'
                }
            },

        }
    })

    const columns = [{
        name: "name",
        label: "Nombre",
        options: {
            filter: false,
            sort: false,
        }
    },{
        name: "apellidos",
        label: "Apellidos",
        options: {
            filter: true,
            sort: true,
        }
    },{
        name: "email",
        label: "Email",
        options: {
            filter: false,
            sort: true,
        }
    },{
        name: "id",
        label: "Acciones",
        options: {
            filter: true,
            sort: false,
            empty: true,
            customBodyRender: (value, tableMeta) => {
                return (
                    <div>
                        <Button title="Editar Usuario" onClick={() => {

                            //Redirect al formulario de edición
                            history.push(`/admin/usuariosCondominio/${idCondominio}/editar/${tableMeta.rowData[3]}`);

                        }} className="mr-2 action">
                            <FontAwesomeIcon icon={faEdit}/>
                        </Button>
                        <Button onClick={ () => {
                                setSelectedRecordId(tableMeta.rowData[3]);
                                setModalDeleteControl(!modalDeleteControl);
                                setSelectedRecordTitle(tableMeta.rowData[0])
                        }} className="action danger">
                            <FontAwesomeIcon icon={faTrash}/>
                        </Button>
                    </div>
                );
            }
        }
    }];

    return(
        <div>
            <DeleteRecordModal
                toggleDeleteModal={setModalDeleteControl}
                title={selectedRecordTitle}
                idRecord={selectedRecordId}
                deleteModal={modalDeleteControl}
                resource={'usuarios'}
                updateRecords={getRecords}
            />
            <Row className="justify-content-end">
                <Col sm={3} className="text-right">
                    <Link to={`/admin/usuariosCondominio/${idCondominio}/agregar`}>
                        <Button className="primary">
                            Agregar usuario
                        </Button>
                    </Link>

                </Col>
            </Row>
            <Row className="mt-4 mb-4">
                <Col>
                    <MuiThemeProvider theme={getMuiTheme()}>
                        <MUIDataTable
                            title={"Usuarios del Condominio"}
                            data={records}
                            columns={columns}
                            options={muiTableOptions}
                        />
                    </MuiThemeProvider>

                </Col>
            </Row>
        </div>
    );
};

export default withRouter(UsuariosCondominio);