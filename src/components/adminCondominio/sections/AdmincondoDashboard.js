import React, {useState, useEffect} from 'react';
import {PieChart, Pie, Cell,Tooltip, Legend} from 'recharts';
import {Button,Col,Row,Card,CardBody,CardTitle,CardSubtitle} from 'reactstrap';
import {useHistory} from 'react-router';
import Container from "reactstrap/es/Container";
import {faBell, faCalendarWeek, faCoins, faDoorOpen, faFileInvoiceDollar, faHome, faMoneyCheckAlt, faTree, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fetchRecords} from "../../../actions/fetchRecords";
import {useUsuario} from "../../../context/usuario-context";
import moment from 'moment';
import 'moment/locale/es';
import CountUp from 'react-countup';
import {Link, useLocation} from "react-router-dom";

const AdmincondoDashboard = (props) => {
    const { idCondominio } = useUsuario();
    const [chartData,setChartData] = useState([]);
    const [unidades, setUnidades] = useState([]);
    const [cantidades, setCantidades] = useState(null);
    let location = useLocation();

    let arrUrl = location.pathname.split('/');

    const COLORS = ['#00C49F', '#FF8042'];

    useEffect(() => {

        async function getIngresosEgresos() {


            moment().locale('es');
            let $mes = moment().format("M");

            try {
                const resultadoIngresosEgresos = await fetchRecords(`getIngresosEgresos/${idCondominio}/${$mes}`);
                if(resultadoIngresosEgresos) {
                    setChartData([
                        { name: 'Ingresos', value: resultadoIngresosEgresos.ingresos },
                        { name: 'Egresos', value: resultadoIngresosEgresos.egresos },
                    ])
                }
            }catch (e) {
                console.log(e);
            }
        }
        /*
               async function getCantidadElementos() {

                   try {
                       const [
                           unidades,
                           anuncios,
                           transacciones,
                           cuotas,
                           cuentas,
                           eventos,
                           visitas,
                           areas,
                           usuarios,
                       ] = await Promise.all([
                           fetchRecords(`unidades/countRecords/${idCondominio}`),
                           fetchRecords(`anuncios/countRecords/${idCondominio}`),
                           fetchRecords(`transacciones/countRecords/${idCondominio}`),
                           fetchRecords(`cuotas/countRecords/${idCondominio}`),
                           fetchRecords(`cuentas/countRecords/${idCondominio}`),
                           fetchRecords(`eventos/countRecords/${idCondominio}`),
                           fetchRecords(`visitas/countRecords/${idCondominio}`),
                           fetchRecords(`areas/countRecords/${idCondominio}`),
                           fetchRecords(`usuarios/countRecords/${idCondominio}`),
                       ]);

                       setCantidades([
                           {unidades:unidades},
                           {anuncios:anuncios},
                           {transacciones:transacciones},
                           {cuotas:cuotas},
                           {cuentas:cuentas},
                           {eventos:eventos},
                           {visitas:visitas},
                           {areas:areas},
                           {usuarios:usuarios},
                       ]);

                       console.log(cantidades);
                   }catch (e) {
                       console.log(e);
                   }
               }*/

        getIngresosEgresos();
        //getCantidadElementos();
    },[]);
    
    const chartIngresEgreso = (
        <PieChart
            width={700} height={150} >
            <Tooltip />
            <Legend />
            <Pie
                data={chartData}
                cx={200}
                cy={100}
                startAngle={180}
                endAngle={0}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
            >
                {
                    chartData.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                }
            </Pie>
        </PieChart>
    );



    return(
        <Container>
            <Row className="text-center">
                <Col>
                    <h3>Tablero de control</h3>
                </Col>
            </Row>
            <Row>
                <Col sm="6">
                    <Card>
                        <CardBody className="text-center">
                            <CardTitle>
                                <h3>Periodo actual ({moment().format("MMMM")})</h3>
                            </CardTitle>
                            {chartIngresEgreso}
                        </CardBody>
                    </Card>
                </Col>
                <Col sm="6">
                    <Card >
                        <CardBody className="text-center" style={{height:228}}>
                            <CardTitle>
                                <h3>Porcentaje de Morosidad</h3>
                            </CardTitle>
                            <h1 className="mt-5" style={{color:'#FF8042'}} id="porcentaje"><CountUp end={40} />%</h1>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-1">
                <Col xs="4">
                    <Card>
                        <CardBody className="text-center">
                            <CardTitle>
                                <h3><FontAwesomeIcon icon={faHome} className="mr-2"/>Unidades</h3>
                            </CardTitle>
                            {cantidades ?
                                <h2>{cantidades.unidades}</h2> : ''
                            }
                            <Link to={`/${arrUrl[1]}/unidades`}>
                                <Button className="mt-2 actionButton" >Seleccionar</Button>
                            </Link>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs="4">
                    <Card>
                        <CardBody className="text-center">
                            <CardTitle>
                                <h3><FontAwesomeIcon icon={faBell} className="mr-2"/>Anuncios</h3>
                            </CardTitle>
                            <Link to={`/${arrUrl[1]}/anuncios`}>
                                <Button className="mt-2 actionButton" >Seleccionar</Button>
                            </Link>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs="4">
                    <Card>
                        <CardBody className="text-center">
                            <CardTitle>
                                <h3><FontAwesomeIcon icon={faMoneyCheckAlt} className="mr-2"/>Transacciones</h3>
                            </CardTitle>

                            <Link to={`/${arrUrl[1]}/transacciones`}>
                                <Button className="mt-2 actionButton" >Seleccionar</Button>
                            </Link>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs="4">
                    <Card>
                        <CardBody className="text-center">
                            <CardTitle>
                                <h3><FontAwesomeIcon icon={faCoins} className="mr-2"/>Cuotas</h3>
                            </CardTitle>

                            <Link to={`/${arrUrl[1]}/cuotas`}>
                                <Button className="mt-2 actionButton" >Seleccionar</Button>
                            </Link>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs="4">
                    <Card>
                        <CardBody className="text-center">
                            <CardTitle>
                                <h3><FontAwesomeIcon icon={faFileInvoiceDollar} className="mr-2"/>Cuentas</h3>
                            </CardTitle>

                            <Link to={`/${arrUrl[1]}/cuentas`}>
                                <Button className="mt-2 actionButton" >Seleccionar</Button>
                            </Link>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs="4">
                    <Card>
                        <CardBody className="text-center">
                            <CardTitle>
                                <h3><FontAwesomeIcon icon={faCalendarWeek} className="mr-2"/>Eventos</h3>
                            </CardTitle>

                            <Link to={`/${arrUrl[1]}/eventos`}>
                                <Button className="mt-2 actionButton" >Seleccionar</Button>
                            </Link>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs="4">
                    <Card>
                        <CardBody className="text-center">
                            <CardTitle>
                                <h3><FontAwesomeIcon icon={faDoorOpen} className="mr-2"/>Visitas</h3>
                            </CardTitle>

                            <Link to={`/${arrUrl[1]}/visitas`}>
                                <Button className="mt-2 actionButton" >Seleccionar</Button>
                            </Link>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs="4">
                    <Card>
                        <CardBody className="text-center">
                            <CardTitle>
                                <h3><FontAwesomeIcon icon={faTree} className="mr-2"/>Áreas Comunes</h3>
                            </CardTitle>

                            <Link to={`/${arrUrl[1]}/areas`}>
                                <Button className="mt-2 actionButton" >Seleccionar</Button>
                            </Link>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs="4">
                    <Card>
                        <CardBody className="text-center">
                            <CardTitle>
                                <h3><FontAwesomeIcon icon={faUser} className="mr-2"/>Usuarios</h3>
                            </CardTitle>

                            <Link to={`/${arrUrl[1]}/usuarios`}>
                                <Button className="mt-2 actionButton" >Seleccionar</Button>
                            </Link>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AdmincondoDashboard;