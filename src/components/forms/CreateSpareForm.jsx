import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import { spareFormData, __db__ } from "../../constants";
import { handleSetMultimedia, handleSetValue } from "../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { createNewSpareAction } from "../../redux/spareDucks";
import { alertSuccessOffAction } from "../../redux/globalDucks";

const CreateSpareForm = ({ toggleCreate }) => {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [loc, setLoc] = useState("");
    const [images, setImages] = useState([]);
    const [datasheet, setDatasheet] = useState([]);
    const [quant, setQuant] = useState(0);

    const dispatch = useDispatch();
    const spinnerOn = useSelector(store => store.global.spinnerOn);

    const handleCreateSubmit = async e => {
        e.preventDefault();

        let fData = new FormData();

        let body = {
            nombre: name,
            descripcion: desc,
            cantidad: quant,
            ubicacion: loc
        };

        for (let key in body) {
            fData.append(key, body[key]);
        }

        images.forEach(img => {
            fData.append("images", img);
        });

        datasheet.forEach(sheet => {
            fData.append("datasheet", sheet);
        });

        dispatch(createNewSpareAction(fData, toggleCreate));

        setTimeout(() => {
            dispatch(alertSuccessOffAction());
        }, 3000);
    };

    const SPARE_FORM_DATA = spareFormData(
        handleSetValue,
        handleSetMultimedia,
        setName,
        setDesc,
        setQuant,
        setLoc,
        setImages,
        setDatasheet
    );

    return (
        <div className="edit-form user-select-none">
            <Form onSubmit={handleCreateSubmit} encType="multipart/form-data">
                <div className="d-flex justify-content-around">
                    {SPARE_FORM_DATA.map((data, i) => (
                        <div key={i} className={i === 0 && "width40"}>
                            {data.map(
                                ({
                                    id,
                                    type,
                                    label,
                                    name,
                                    placeholder,
                                    onChange,
                                    multiple
                                }) => (
                                    <FormGroup>
                                        <Label for={name}>{label}</Label>
                                        <Input
                                            id={id}
                                            type={type}
                                            name={name}
                                            placeholder={placeholder}
                                            onChange={onChange}
                                            multiple={multiple}
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

export default CreateSpareForm;
