import React, { useState, useEffect } from 'react';
import Pregunta from './components/Pregunta';
import Formulario from './components/Formulario';
import Listado from './components/Listado';
import ControlPresupuesto from './components/ControlPresupuesto';

function App() {

  const [presupuesto, setPresupuesto] = useState(0);
  const [restante, setRestante] = useState(0);
  const [mostrarPregunta, setMostrarPregunta] = useState(true);
  const [gastos, setGastos] = useState([]);
  const [gasto, setGasto] = useState({});
  const [mostrarGastos, setMostrarGastos] = useState(false);

  // useEfect que actualiza el restante
  useEffect(() => {
    if (mostrarGastos) {
      setGastos([...gastos, gasto]);
      const presupuestoRestante = restante - gasto.cantidad;
      setRestante(presupuestoRestante);
      setMostrarGastos(false);
    }
  }, [gasto, gastos, mostrarGastos, restante]);

  return (
    <div className = "container">
      <header>
        <h1>Presupuesto semanal</h1>
        <div className = "contenido-principal contenido">
          {
            mostrarPregunta
            ?
            <Pregunta
              setPresupuesto = { setPresupuesto }
              setRestante = { setRestante }
              setMostrarPregunta = { setMostrarPregunta }
            />
            :
              <div className = "row">
                <div className = "one-half column">
                  <Formulario
                    restante = { restante }
                    setGasto = { setGasto }
                    setMostrarGastos = { setMostrarGastos }
                  />
                </div>

                <div className = "one-half column">
                  <Listado
                    gastos = { gastos }
                  />
                  <ControlPresupuesto
                    presupuesto = { presupuesto }
                    restante = { restante }
                  />
                </div>
              </div>
          }

        </div>
      </header>
    </div>
  );
}

export default App;
