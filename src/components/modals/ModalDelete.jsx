import React from "react";
import { Modal, ModalBody, Button } from "reactstrap";

const ModalDelete = ({ modalDelete, toggleDelete, handleDelete, item }) => {
  return (
    <div>
      <Modal isOpen={modalDelete} toggleDelete={toggleDelete}>
        <h4 className="fweight800 text-center pt-3">
          ¿Deseas eliminar este componente?
        </h4>
        <h1 className="text-center">{item && item.nombre}</h1>
        <ModalBody className="d-flex justify-content-center">
          <Button color="primary" className="mr-2" onClick={handleDelete}>
            Aceptar
          </Button>
          <Button color="danger" onClick={toggleDelete}>
            Cancelar
          </Button>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ModalDelete;
