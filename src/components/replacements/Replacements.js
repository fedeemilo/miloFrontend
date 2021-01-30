import React, { useState } from "react";
import { NavBar, RepForm } from "../";
import Plus from "../../assets/img/plus.svg";

function Replacements() {
  const [repArr, setRepArr] = useState([]);

  return (
    <div className="components">
      <NavBar />

      {/* header */}
      <div className="components__header">
        <h3>Reemplazos en repuestos</h3>
        <a href="#">
          <img src={Plus} alt="plus" />
        </a>
      </div>

      {/* form */}
      <div className="components__form d-flex mt-5">
        <div className="col-lg-6 ml-5">
          <RepForm repArr={repArr} setRepArr={setRepArr} />
        </div>
        <div className="rep-results d-none">
          {repArr &&
            repArr.map((rep) => (
              <p key={rep}>
                {rep.COMPONENTE}
                {rep.DESCRIPCION
                  ? ` (${rep.DESCRIPCION.toLowerCase()})`
                  : " (sin descripción)"}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Replacements;
