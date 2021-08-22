import React, { useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input
} from "reactstrap";
import { setFilterOption } from "../utils/functions";
import SearchIcon from "../utils/SearchIcon";
import { useDispatch } from "react-redux";
import { updateSparesAction } from "../../redux/spareDucks";
import { updateClientsAction } from "../../redux/clientDucks";

const BoxForm = ({ setSearchValElem, arrFilters, boxTitle }) => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filterSearch = (searchVal, filterElem) => {
    if (boxTitle === "Clientes") {
      dispatch(updateClientsAction(searchVal, filterElem));
    }

    if (boxTitle === "Repuestos | Componentes") {
      dispatch(updateSparesAction(searchVal, filterElem));
    }
  };

  const handleSearch = e => {
    let searchVal = e.target.value;

    setSearchValElem(true);

    if (searchVal.length > 0) {
      filterSearch(searchVal, filter);
    } else {
      setSearchValElem(false);
    }
  };

  const handleFilter = e => {
    setFilter(setFilterOption(e.target.innerText));
  };

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <>
      <div className="components__form d-flex flex-row justify-content-center align-items-center">
        <div className="col-lg-6 ml-4 text-center">
          <Form>
            <FormGroup>
              <div className="d-flex flex-column mt-3 user-select-none">
                <div className="m-1">
                  <SearchIcon />
                  <Input
                    id="componenteIn"
                    className="text-center"
                    style={{ height: "3rem", fontSize: "1.4rem" }}
                    type="text"
                    name="componente"
                    onChange={handleSearch}
                    disabled={filter === ""}
                    placeholder={
                      filter
                        ? `Buscar por ${filter}`
                        : "Elige un filtro para la búsqueda"
                    }
                  />
                </div>
              </div>
            </FormGroup>
          </Form>
        </div>

        <div>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>
              {filter ? filter : "Filtros"}
            </DropdownToggle>
            <DropdownMenu>
              {arrFilters.map((filter, idx) => (
                <DropdownItem key={idx} onClick={handleFilter}>
                  {filter}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default BoxForm;
