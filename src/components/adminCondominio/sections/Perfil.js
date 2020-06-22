import React, {useState, useEffect} from 'react';
import {Button, FormGroup, Label, Col, Row, UncontrolledDropdown} from 'reactstrap';
import {storeRecord} from "../../../actions/storeRecord";
import {useUsuario} from "../../../context/usuario-context";
import { useForm } from "react-hook-form";
import Skeleton from 'react-loading-skeleton';
import {store} from "react-notifications-component";
import {useHistory} from 'react-router';
import Select from "react-select";
import {updateRecord} from "../../../actions/updateRecord";
import {faBriefcase, faCamera} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const Perfil = (props) => {
    const {cargandoUsuario,idCondominio,usuario,setTema,setFondo,fondo,tema} = useUsuario();
    const { register, handleSubmit, errors } = useForm();
    const [updatePassword,setUpdatePassword] = useState(false);
    const [profileImg,setProfileImg] = useState(null);

    useEffect(() => {

        if(usuario.user.fotoPerfil) {
            setProfileImg(usuario.user.fotoPerfil)
        }
    });
    let history = useHistory();

    const onSubmit = async data => {
        data.tema = tema;
        data.fondo = fondo;

        if(profileImg) {
            data.fotoPerfil = profileImg;
        }

        try {
            await updateRecord(data,'usuarios',usuario.user.id,idCondominio);
            //history.push(`/${props.match.params.condominio}/unidades`);
        }catch (e) {
            console.log(e);
            store.addNotification({
                title: "Ocurrió un error al agregar el condominio",
                message: "Revisa tu conexión a internet",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });
        }
    };

    const handleChangeTema = async value => {
        setTema(value);
    };

    const handleChangeFondo = fondo => {
        setFondo(fondo);
    };

    const customStyles = {

        control: () => ({
            borderRadius: 10,
            border: '1px solid #979797 !important',
            position: 'relative',
            justifyContent: 'space-between',
            display: '-webkit-flex',
        }),
        dropdownIndicator: () => ({
            color: fondo === 'white' ? 'black' : 'white',
            marginRight: 10
        }),
        indicatorSeparator: () => ({
            border: 'none',
        }),
        singleValue: () => ({
            color: fondo === 'white' ? '' : 'white',
        }),
    };

    const opcionesTema = [
        {value:"amatista",label:'Amatista',name:'idTema'},
        {value:"aqua",label:'Aqua',name:'idTema '},
        {value:"coral",label:'Coral',name:'idTema'},
        {value:"esmeralda",label:'Esmeralda',name:'idTema'},
        {value:"ocaso",label:'Ocaso',name:'idTema'},
        {value:"pastel",label:'Pastel',name:'idTema'},
    ];

    const handleUpdatePassword = () => {
    };

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const handleClick = () => {
        document.getElementById('hiddenFileInput').click();
    };

    const handleChange = async event => {
        const fileUploaded = event.target.files[0];
        const img = await toBase64(fileUploaded);

        setProfileImg(img);
    };

    if(cargandoUsuario) {
        return(
            <Row className="">
                <Col>
                    <Row className="justify-content-center">
                        <Col sm={8}>
                            <h1 style={{fontSize: 60}}>{<Skeleton />}</h1>
                        </Col>
                    </Row>

                    <Row className="justify-content-center">
                        <Col sm={8}>
                            <div>
                                <Row>
                                    <Col sm={6}>
                                        <div style={{fontSize: 50}} >
                                            {<Skeleton/>}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={3}>
                                        <div style={{fontSize: 50}} >
                                            {<Skeleton/>}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={8}>
                                        <div style={{fontSize: 50}} >
                                            {<Skeleton/>}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={6}>
                                        <div style={{fontSize: 50}} >
                                            {<Skeleton/>}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={10}>
                                        <div style={{fontSize: 50}} >
                                            {<Skeleton/>}
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="">
                                    <Col className="d-flex justify-content-around">
                                        <div style={{fontSize: 50}} >
                                            {<Skeleton/>}
                                        </div>

                                    </Col>
                                </Row>

                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }else{
        return(
            <Row className="justify-content-end">
                <Col>
                    <Row className="text-center">
                        <Col>
                            <h4>Datos del perfil</h4>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col className="text-center">
                            <img src={profileImg ? profileImg : require('./../../../assets/images.png')} width={80} height={80} className="rounded-circle"/><br/>
                            <input id="hiddenFileInput"
                                   type="file"
                                   style={{display:'none'}}
                                   onChange={handleChange}
                            />
                            <Button onClick={handleClick} className="btnAction mt-2"  type="submit">
                                <FontAwesomeIcon icon={faCamera}/>
                            </Button>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col sm={8}>
                            <form id="form" onSubmit={handleSubmit(onSubmit)}>
                                <Row className="ml-5">
                                    <Col sm={8}>
                                        <FormGroup>
                                            <Label>Nombre</Label>
                                            <input name="name"
                                                   class="form-control"
                                                   type="text"
                                                   defaultValue={usuario ? usuario.user.name : undefined}
                                                   ref={register}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row className="ml-5">
                                    <Col sm={6}>
                                        <FormGroup>
                                            <Label>Email</Label>
                                            <input name="email"
                                                   class="form-control"
                                                   type="email"
                                                   defaultValue={usuario ? usuario.user.email : undefined}
                                                   ref={register}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row className="ml-5">
                                    <Col>
                                        <a href="#" onClick={() => setUpdatePassword(!updatePassword)}>Actualizar mi contraseña</a>
                                    </Col>
                                </Row>
                                {updatePassword ? (
                                    <Row className="mt-1 ml-5 animate fadeIn one">
                                        <Col sm={6}>
                                            <FormGroup>
                                                <Label>* Nueva contraseña</Label>
                                                <input name="password"
                                                       className="form-control"
                                                       type="password"
                                                       ref={register({ required: true })}/>
                                            </FormGroup>
                                        </Col>
                                        <Col sm={6}>
                                            <FormGroup>
                                                <Label>* Repite tu contraseña</Label>
                                                <input name="rtpassword"
                                                       className="form-control"
                                                       type="password"
                                                       ref={register({ required: true })}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                ) : ''}
                                <Row className="mt-2 ml-5">
                                    <Col sm={6}>
                                        <FormGroup>
                                            <Label>Tema</Label>
                                            <Select styles={customStyles}
                                                    options={opcionesTema}
                                                    placeholder="Selecciona una opción..."
                                                    value={opcionesTema.find(op => {
                                                        return op.value === usuario.user.tema
                                                    })}
                                                    onChange={(event) => {handleChangeTema(event.value)}}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row className="ml-5">
                                    <Col sm={10}>
                                        <FormGroup >
                                            <Label for="">Color del fondo</Label><br/>
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="radio"
                                                       value="1"
                                                       className="custom-control-input"
                                                       id="radioWhite"
                                                       name="colorFondo"
                                                       ref={register({ required: true })}
                                                       defaultChecked={usuario.user.fondo === 'white'}
                                                       onChange={() => handleChangeFondo('white')}
                                                />
                                                <label className="custom-control-label" htmlFor="radioWhite">Claro</label>
                                            </div>
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="radio"
                                                       value="0"
                                                       className="custom-control-input"
                                                       id="radioDark"
                                                       name="colorFondo"
                                                       defaultChecked={usuario.user.fondo === 'dark'}
                                                       ref={register({ required: true })}
                                                       onChange={() => handleChangeFondo('dark')}
                                                />
                                                <label className="custom-control-label" htmlFor="radioDark">Oscuro</label>
                                            </div>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row className="mt-5">
                                    <Col className="d-flex justify-content-around">
                                        <Button className="neutralButton">Regresar</Button>
                                        <Button className="confirmButton"  type="submit">Guardar mis datos</Button>
                                    </Col>
                                </Row>
                            </form>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }

}


