import React, { useState, useEffect } from "react";

const ImageBox = ({ img, setArrCancelImgs }) => {
  const [boxSelected, setBoxSelected] = useState(false);

  useEffect(() => {
    if (boxSelected) {
      setArrCancelImgs(arr =>
        arr.concat(img.public_id)
      );
    } else {
      setArrCancelImgs(arr =>
        arr.filter(public_id => public_id !== img.public_id)
      );
    }
  }, [boxSelected, img, setArrCancelImgs]);


  return (
    <div
      className={`image-box -2 ${
        boxSelected ? "box-selected" : ""
      }`}
      onClick={() => setBoxSelected(!boxSelected)}
    >
      <img src={img.url} alt={`img-${img.public_id}`} />
    </div>
  );
};

export default ImageBox;
