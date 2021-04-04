import React, { useState, useEffect } from "react";

const ImageBox = ({ img, arrCancelImgs, setArrCancelImgs }) => {
  const [boxSelected, setBoxSelected] = useState(false);

  useEffect(() => {
    if (boxSelected) {
      console.log(img);
      setArrCancelImgs(arrCancelImgs =>
        arrCancelImgs.concat(img.public_id)
      );
    } else {
      setArrCancelImgs(arrCancelImgs =>
        arrCancelImgs.filter(public_id => public_id !== img.public_id)
      );
    }
  }, [boxSelected, img, setArrCancelImgs]);


  return (
    <div
      className={`image-box border-black-2 ${
        boxSelected ? "box-selected" : ""
      }`}
      onClick={() => setBoxSelected(!boxSelected)}
    >
      <img src={img.url} alt={`img-${img.public_id}`} />
    </div>
  );
};

export default ImageBox;
