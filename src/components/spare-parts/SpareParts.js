/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Table
} from "reactstrap";
import { CreateForm, EditForm, NavBar, SpareForm } from "../";

function SpareParts() {
  const [repuesto, setRepuesto] = useState({});
  const [repuestos, setRepuestos] = useState([]);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalCreate, setModalCreate] = useState(false);
  const [spareEdit, setSpareEdit] = useState({});
  const [editAlert, setEditAlert] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [searchValSpare, setSearchValSpare] = useState(false);

  useEffect(() => {
    if (!searchValSpare) {
      axios
        .get("https://milo-soft-backend.herokuapp.com/repuestos")
        .then((res) => {
          const data = res.data;
          setRepuestos(data);
        })
        .catch((err) => console.log(err));
    }
  }, [repuestos, searchValSpare]);

  const toggleEdit = () => {
    setModalEdit(!modalEdit);
    setRepuestos((repuestos) => [...repuestos]);
  };

  const toggleDelete = (rep) => {
    setModalDelete(!modalDelete);

    if (rep) {
      setRepuesto(rep);
    }
  };

  const toggleCreate = () => {
    setModalCreate(!modalCreate);
  };

  const handleEdit = (e, rep) => {
    e.preventDefault();
    toggleEdit();
    setSpareEdit(rep);
    onEditDismiss();
  };

  const handleDelete = (e) => {
    e.preventDefault();

    if (repuesto) {
      let id = repuesto._id;

      axios
        .delete(`http://localhost:8000/repuestos/${id}`)
        .then(() => setDeleteAlert(true))
        .catch((err) => console.log(err));

      setRepuestos((repuestos) => [...repuestos]);
      toggleDelete();
    }
  };

  const onEditDismiss = () => setEditAlert(false);

  const onDeleteDismiss = () => setDeleteAlert(false);

  return (
    <div className="components">
      <NavBar />

      {/* header */}
      <div className="components__header d-flex justify-content-between">
        <h3 className="ml-5">Repuestos/Componentes</h3>
        <a href="#" onClick={toggleCreate} className="mr-3">
          <ion-icon name="add-circle-outline"></ion-icon>
        </a>
      </div>

      {/* form */}
      <div className="components__form d-flex justify-content-between">
        <div className="col-lg-6 ml-5">
          <SpareForm
            repuestos={repuestos}
            setRepuestos={setRepuestos}
            setSearchValSpare={setSearchValSpare}
          />
        </div>
        {/* alert */}
        <div>
          <Alert
            color="success"
            isOpen={editAlert}
            toggle={onEditDismiss}
            fade={false}
            className="mt-5 mr-3"
            style={{ position: "relative", top: "5rem" }}
          >
            Componente editado con éxito!
          </Alert>
          <Alert
            color="danger"
            isOpen={deleteAlert}
            toggle={onDeleteDismiss}
            fade={false}
            className="mt-5 mr-3"
            style={{ position: "relative", top: "5rem" }}
          >
            Componente eliminado con éxito!
          </Alert>
        </div>
      </div>

      {/* table of spare-parts */}
      <div className="components__table mt-5 mx-auto p-2">
        <Table dark bordered hover className="text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Cantidad</th>
              <th>Ubicación</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {repuestos.map((rep, i) => (
              <tr key={rep._id}>
                <th scope="row">{i + 1}</th>
                <td>{rep.nombre.toUpperCase()}</td>
                <td>
                  {rep.descripcion
                    ? rep.descripcion
                    : "(Sin Descripción)"}
                </td>
                <td>{rep.cantidad}</td>
                <td>{rep.ubicacion.toUpperCase()}</td>
                <td className="d-flex justify-content-center">
                  {/* edit */}
                  <a
                    href="#"
                    className="ion-edit no-dec"
                    onClick={(e) => handleEdit(e, rep)}
                  >
                    <ion-icon name="create-outline"></ion-icon>
                  </a>
                  {/* delete */}
                  <a
                    href="#"
                    className="ion-delete no-dec ml-3"
                    onClick={() => toggleDelete(rep)}
                  >
                    <ion-icon name="trash-outline"></ion-icon>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* modal for edition */}
      <div>
        <Modal isOpen={modalEdit} toggleEdit={toggleEdit}>
          <ModalHeader toggleEdit={toggleEdit}>
            Editar Repuesto/Componente
          </ModalHeader>
          <ModalBody>
            <EditForm
              spare={spareEdit}
              toggleEdit={toggleEdit}
              setEditAlert={setEditAlert}
            />
          </ModalBody>
        </Modal>
      </div>

      {/* modal for deletion */}
      <div>
        <Modal isOpen={modalDelete} toggleDelete={toggleDelete}>
          <ModalHeader toggleDelete={toggleDelete}>
            ¿Deseas eliminar este componente?
          </ModalHeader>
          <ModalBody>
            <Button
              color="primary"
              className="mr-2"
              onClick={handleDelete}
            >
              Aceptar
            </Button>
            <Button color="danger" onClick={toggleDelete}>
              Cancelar
            </Button>
          </ModalBody>
        </Modal>
      </div>

      {/* modal for creation */}
      <div>
        <Modal isOpen={modalCreate} toggleCreate={toggleCreate}>
          <ModalHeader toggleCreate={toggleCreate}>
            Crear Nuevo Repuesto/Componente
          </ModalHeader>

          <ModalBody>
            <CreateForm toggleCreate={toggleCreate} />
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
}

export default SpareParts;
