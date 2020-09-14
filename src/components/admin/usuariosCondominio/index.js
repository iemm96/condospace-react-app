import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "reactstrap";
import {Link, useHistory, withRouter} from "react-router-dom";
import MUIDataTable from "mui-datatables";
import {muiTableOptions} from "../../../constants/muiTableOptions";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const UsuariosCondominio = props => {
    const [ records, setRecords ] = useState([]);
    const history = useHistory();
    const idCondominio  = props.match.params.idRegistro;

    useEffect(() => {

    },[]);



    const getRecords = () => {

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
                        <Button type="Button" title="Revisar Ensaye" onClick={() => {

                            //Redirect al formulario de edición
                            history.push(`/capturista/ensayes/revisar/${tableMeta.rowData[0]}`);

                        }} className="mr-2 btnAction"><FontAwesomeIcon icon={faEdit}/>
                        </Button>
                    </div>
                );
            }
        }
    }];

    return(
        <div>
            <Row className="justify-content-end">
                <Col sm={3} className="text-right">
                    <Link to={`/admin/usuariosCondominio/${idCondominio}/agregar`}>
                        <Button className="primary">
                            Agregar usuario
                        </Button>
                    </Link>

                </Col>
            </Row>
            <Row className="mt-4">
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