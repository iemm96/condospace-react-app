import React, { useState, useEffect } from "react";
import { Col, FormGroup, Label, Row} from "reactstrap";
import {useUsuario} from "../../context/usuario-context";
import Select from "react-select";
import {fetchRecordsByParam} from "../../actions/fetchRecordsByParam";
import Form from "reactstrap/es/Form";

export const BuscadorUnidades = (props) => {
    const { idCondominio } = useUsuario();

    let input;



    const search = () => {
        props.onSearch(input.value);
    };

    const customStyles = {

        control: () => ({
            borderRadius: 10,
            border: '1px solid #979797 !important',
            position: 'relative',
            justifyContent: 'space-between',
            display: '-webkit-flex'
        }),
        dropdownIndicator: () => ({
            color: 'black',
            marginRight: 10
        }),
        indicatorSeparator: () => ({
            border: 'none',
        }),
        container: () => ({
            width: '170px'
        })
    };

    return (
        <Row className="row mb-2 justify-content-between">
            <Col sm={3}>
                <input
                    placeholder={props.placeholderText}
                    className="form-control"
                    ref={ n => input = n }
                    type="text"
                    onChange={search}
                />
            </Col>
            <Col sm={3} className="justify-content-end">
                <Form inline>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label className="mr-sm-2">Unidad</Label>
                        <Select styles={customStyles}
                                options={props.unidades}
                                placeholder="Selecciona"
                                value={props.unidades.find(op => {
                                    return op.value === props.tipoUnidad
                                })}
                                onChange={(event) => {props.setTipoUnidad(event.value)}}
                        />
                    </FormGroup>
                </Form>
            </Col>
        </Row>
    );
};
