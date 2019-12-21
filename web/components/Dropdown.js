import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const Dropdown = (props) => {
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  return (
    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        Realizar encuesta
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem href="encuesta/cuestionario">Calculo Diferencial (A)</DropdownItem>
        <DropdownItem href="encuesta/cuestionario">Calculo Diferencial (B)</DropdownItem>
        <DropdownItem href="encuesta/cuestionario">Taller de Etica (A)</DropdownItem>
        <DropdownItem href="encuesta/cuestionario">Taller de Etica (B)</DropdownItem>
        <DropdownItem href="encuesta/cuestionario">Matematicas Discretas (A)</DropdownItem>
        <DropdownItem href="encuesta/cuestionario">Matematicas Discretas (B)</DropdownItem>
        <DropdownItem href="encuesta/cuestionario">Fundamentos de investigacion (A)</DropdownItem>
        <DropdownItem href="encuesta/cuestionario">Fundamentos de investigacion (B)</DropdownItem>
        <DropdownItem href="encuesta/cuestionario">Taller de Administracion (A)</DropdownItem>
        <DropdownItem href="encuesta/cuestionario">Taller de Administracion (B)</DropdownItem>
        <DropdownItem href="encuesta/cuestionario">Fundamentos de programacion (A)</DropdownItem>
        <DropdownItem href="encuesta/cuestionario">Fundamentos de programacion (B)</DropdownItem>
      
      </DropdownMenu>
    </ButtonDropdown>
  );
}

export default Dropdown;