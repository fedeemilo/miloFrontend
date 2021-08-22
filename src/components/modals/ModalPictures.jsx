import React, { useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import Carousel from "react-bootstrap/Carousel";

const ModalPictures = ({
  modalImages,
  toggleImages,
  repImages
}) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const slides = repImages.map(item => {
    return (
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={item.src}
          alt={item.altText}
        />
      </Carousel.Item>
    );
  });

  return (
    <>
      <Modal size="lg" isOpen={modalImages} toggle={toggleImages}>
        <div className="d-flex justify-content-center">
          <h3 className="pt-3 fweight800">
            Imágenes del Repuesto | Componente
          </h3>
        </div>
        <ModalBody className="mx-auto">
          {repImages && (
            <Carousel
              interval={null}
              activeIndex={index}
              onSelect={handleSelect}
            >
              {slides}
            </Carousel>
          )}
        </ModalBody>
      </Modal>
    </>
  );
};

export default ModalPictures;
