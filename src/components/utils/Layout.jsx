/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import BoxForm from "../forms/BoxForm";
import Header from "../main/Header";
import { spareFilters, clientFilters } from "../../helpers/filtersArrays";
import { Table, Modal, ModalBody, Alert } from "reactstrap";
import TableBodySpares from "../tables/TableBodySpares";
import TableBodyClients from "../tables/TableBodyClients";
import CreateClientForm from "../forms/CreateClientForm";
import CreateSpareForm from "../forms/CreateSpareForm";
import {
    alertSuccessOffAction,
    alertDeleteOffAction,
    alertOffErrorAction
} from "../../redux/globalDucks";
import { useDispatch, useSelector } from "react-redux";

const Layout = ({ title, arrTableThs, h1, h3 }) => {
    const dispatch = useDispatch();
    const alertSuccess = useSelector(store => store.global.alertSuccess);
    const alertDelete = useSelector(store => store.global.alertDelete);

    const alertError = useSelector(store => store.global.alertError);
    const alertMsg = useSelector(store => store.global.alertMsg);
    const alertErrorMsg = useSelector(store => store.global.alertErrorMsg);

    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [modalCreate, setModalCreate] = useState(false);


    // spares
    const [repuestos, setRepuestos] = useState([]);
    const [repuesto, setRepuesto] = useState({});

    // clients
    const [clientes, setClientes] = useState([]);
    const [cliente, setCliente] = useState([]);

    const [searchValElem, setSearchValElem] = useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);

    const toggleCreate = () => {
        setModalCreate(!modalCreate);
    };

    const renderTable = title => {
        switch (title) {
            case "spares":
                return (
                    <TableBodySpares
                        repuesto={repuesto}
                        setRepuesto={setRepuesto}
                        repuestos={repuestos}
                        setRepuestos={setRepuestos}
                    />
                );
            case "clients":
                return (
                    <TableBodyClients
                        cliente={cliente}
                        setCliente={setCliente}
                    />
                );
            default:
                return null;
        }
    };

    const renderCreateForm = title => {
        switch (title) {
            case "spares":
                return <CreateSpareForm toggleCreate={toggleCreate} />;
            case "clients":
                return (
                    <CreateClientForm
                        toggleCreate={toggleCreate}
                        clientes={clientes}
                        setClientes={setClientes}
                        cliente={cliente}
                        setCliente={setCliente}
                    />
                );
            default:
                return null;
        }
    };

    const mapFilter = title => {
        switch (title) {
            case "clients":
                return clientFilters;
            case "spares":
                return spareFilters;
            default:
                return [];
        }
    };

    const onCreateDismiss = () => dispatch(alertSuccessOffAction());
    const onDeleteDismiss = () => dispatch(alertDeleteOffAction());
    const onErrorDismiss = () => dispatch(alertOffErrorAction());

    return (
        <div className="components">
            <Header
                headerTitle={h1}
                toggleCreate={toggleCreate}
                tooltipOpen={tooltipOpen}
                toggle={toggle}
            />

            <BoxForm
                boxTitle={h1}
                arrFilters={mapFilter(title)}
                setSearchValElem={setSearchValElem}
            />

            {/* alerts */}
            <div
                className="position-absolute"
                style={{ top: "-17.5rem", width: "100%" }}
            >
                {/* success alert */}
                <Alert
                    color="success"
                    isOpen={alertSuccess}
                    toggle={onCreateDismiss}
                    fade={true}
                    className="mt-5 mr-3"
                    style={{
                        position: "absolute",
                        top: "15rem",
                        left: "1rem"
                    }}
                >
                    {alertMsg}
                </Alert>

                {/* error alert */}

                <Alert
                    color="warning"
                    isOpen={alertError}
                    toggle={onErrorDismiss}
                    fade={true}
                    className="mt-5 mr-3"
                    style={{
                        position: "absolute",
                        top: "15rem",
                        left: "1rem"
                    }}
                >
                    {alertErrorMsg}
                </Alert>

                {/* delete alert */}
                <Alert
                    color="danger"
                    isOpen={alertDelete}
                    toggle={onDeleteDismiss}
                    fade={true}
                    className="mt-5 mr-3"
                    style={{
                        position: "absolute",
                        top: "15rem",
                        left: "1rem"
                    }}
                >
                    Componente eliminado con éxito!
                </Alert>
            </div>

            {/* Table */}
            <div className="components__table mt-4 mx-auto p-2">
                <Table
                    id="myTable"
                    dark
                    bordered
                    hover
                    responsive
                    className="text-center w-100"
                >
                    <thead>
                        <tr>
                            {arrTableThs?.map((thTitle, idx) => (
                                <th key={idx}>{thTitle}</th>
                            ))}
                        </tr>
                    </thead>

                    {renderTable(title)}
                </Table>
            </div>

            {/* modal for creation */}
            <div>
                <Modal
                    size="lg"
                    isOpen={modalCreate}
                    toggleCreate={toggleCreate}
                >
                    <div className="d-flex justify-content-center">
                        <h3 className="pt-3 fweight800 user-select-none">
                            Crear Nuevo {h3}
                        </h3>
                    </div>

                    <hr className="mx-2 mt-1" />
                    <ModalBody>{renderCreateForm(title)}</ModalBody>
                </Modal>
            </div>
        </div>
    );
};

export default Layout;
