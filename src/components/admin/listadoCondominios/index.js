import React, {useState, useEffect} from 'react';
import {Button, Card, CardBody, CardSubtitle, CardTitle, Col, Row, Spinner} from "reactstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash, faUser} from "@fortawesome/free-solid-svg-icons";
import './styles.scss';

const ListadoCondominios = props => {

    const [actualHovering,setActualHovering] = useState(false);
    const [isHovering,setIsHovering] = useState(false);
    const [list,setList] = useState([]);
    const [result,setResult] = useState([]);

    const handleClickDelete = (title,idRecord) => {
        props.setSelectedRecordId(idRecord);
        props.setModalDeleteControl(true);
        props.setSelectedRecordTitle(title);
    };

    const handleClickEdit = (title,idRecord) => {
        props.setSelectedRecordId(idRecord);
        props.toggleModal();
    };

    useEffect(() => {

        const buffer = [];
        props.list.map((value, index) => {
            buffer.push(
                <Col xs="12" md="6" lg="4" className="mt-4" classname="justify-content-center">
                    <Card onMouseEnter={() => handleMouseHover(index)}
                          onMouseLeave={() => setIsHovering(false)}
                          className={ 'cardCondominio ' + (isHovering && actualHovering === index && 'shadow') }
                          >

                        { isHovering && actualHovering === index && <Button onClick={() => handleClickDelete(value.nombreCondominio,value.idCondominio)} className="action">
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>}

                        <CardBody  className="text-center m-1">
                            <CardTitle>
                                <h3>
                                    {value.nombreCondominio}
                                </h3>
                            </CardTitle>
                            <CardSubtitle className="mb-xs-1 mt-xs-1">{value.unidades.length == '1' ? `${value.unidades.length} Unidad` : `${value.unidades.length} Unidades`}</CardSubtitle>

                            <Link to={`/admin/usuariosCondominio/${value.idCondominio}`}>
                                <a><FontAwesomeIcon className="mr-2" icon={faUser}/>Administrar usuarios</a>
                            </Link><br/>
                            <Link to={'#'}>
                                <a onClick={() => handleClickEdit(value.nombreCondominio,value.idCondominio)}><FontAwesomeIcon className="mr-2" icon={faEdit}/>Editar condominio</a>
                            </Link>
                        </CardBody>
                    </Card>
                </Col>);
        });

        setResult(buffer);
    },[actualHovering,isHovering,props.list]);

    const handleMouseHover = index => {

        setActualHovering(index);

        setIsHovering(true);

    };

    return result;
};

export default ListadoCondominios;
