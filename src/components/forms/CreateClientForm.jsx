import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import { handleSetValue } from "../utils/functions";
import { clientFormData, __db__ } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import { createNewClientAction } from "../../redux/clientDucks";
import { alertSuccessOffAction } from "../../redux/globalDucks";

const CreateClientForm = ({ toggleCreate }) => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [direccion, setDirec] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [observaciones, setObs] = useState("");

    // redux
    const dispatch = useDispatch();
    const spinnerOn = useSelector(store => store.global.spinnerOn);

    // handle submittion
    const handleSubmitClient = async e => {
        e.preventDefault();

        let body = {
            nombre,
            apellido,
            direccion,
            telefono,
            email,
            observaciones
        };

        dispatch(createNewClientAction(body, toggleCreate));

        setTimeout(() => {
            dispatch(alertSuccessOffAction());
        }, 3000);
    };

    const CLIENT_FORM_DATA = clientFormData(
        handleSetValue,
        setNombre,
        setApellido,
        setDirec,
        setTelefono,
        setEmail,
        setObs
    );

    return (
        <div className="user-select-none">
            <Form onSubmit={handleSubmitClient}>
                <div className="d-flex justify-content-around">
                    {CLIENT_FORM_DATA.map((data, i) => (
                        <div key={i} className={i === 0 && "width40"}>
                            {data.map(
                                 ({
                                    id,
                                    type,
                                    label,
                                    name,
                                    placeholder,
                                    onChange
                                }) => (
                                    <FormGroup>
                                        <Label for={name}>{label}</Label>
                                        <Input
                                            id={id}
                                            type={type}
                                            name={name}
                                            placeholder={placeholder}
                                            onChange={onChange}
                                        />
                                    </FormGroup>
                                )
                            )}
                        </div>
                    ))}
                </div>
                <Spinner
                    color="primary"
                    style={{ marginLeft: "34rem" }}
                    className={`${!spinnerOn ? "d-none" : ""}`}
                />
                <Button
                    color="danger"
                    className="float-right ml-2"
                    onClick={() => toggleCreate()}
                >
                    Cancelar
                </Button>
                <Button type="submit" color="primary" className="float-right">
                    Crear
                </Button>
            </Form>
        </div>
    );
};

export default CreateClientForm;
