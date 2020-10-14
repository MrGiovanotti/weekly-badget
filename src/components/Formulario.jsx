import React, { useState } from 'react';
import Error from './Error';
import shortid from 'shortid';
import PropTypes from 'prop-types';

const Formulario = ({ restante, setGasto, setMostrarGastos }) => {

  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState(0);
  const [error, setError] = useState(false);

  const agregarGasto = e => {
    e.preventDefault();

    // Validar
    if (nombre.trim() === '' || cantidad < 1 || isNaN(cantidad) || cantidad > restante) {
      setError(true);
      return;
    }
    setError(false);

    // Construir el gasto
    const gasto = {
      nombre,
      cantidad,
      id: shortid.generate()
    }

    // Pasar el gasto al componente principal
    setGasto(gasto);

    setMostrarGastos(true);

    // Resetear el form
    setNombre('');
    setCantidad(0);
  }

  return (
    <form
      onSubmit = { agregarGasto }
    >
      <h2>Agrega tus gastos aquí</h2>
      {
        error?
        <Error mensaje = "Error en los campos del formulario" />
        : null
      }
      <div className = "campo">
        <label>Nombre gasto</label>
        <input
          type = "text"
          className = "u-full-width"
          placeholder = "Ej. Transporte"
          value = { nombre }
          onChange = {e => setNombre(e.target.value)}
        />
        <label>Cantidad gasto</label>
        <input
          type = "number"
          className = "u-full-width"
          placeholder = "Ej. 300"
          value = { cantidad }
          onChange = {e => setCantidad(e.target.value)}
        />
        <input
          type = "submit"
          value = "Agregar gasto"
          className = "button-primary u-full-width"
        />
      </div>
    </form>
  );
}

Formulario.propTypes = {
  restante: PropTypes.number.isRequired,
  setGasto: PropTypes.func.isRequired,
  setMostrarGastos: PropTypes.func.isRequired
}

export default Formulario;