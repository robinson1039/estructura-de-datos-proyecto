import React, { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/homePage/home';
import Estudiantes from './components/Estudent/RegisterStudent';
import EstudiantesIngenieria from './components/Estudent/EngineeringStudents';
import EditarEstudiante from './components/Estudent/EditStudent';
import './App.css';

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/estudiantes-ingenieria" element={<EstudiantesIngenieria />} />
          <Route path="/registro-ingenieria" element={<Estudiantes />} />
          <Route path="/editar-estudiante/:id" element={<EditarEstudiante />} />
        </Routes>
      </BrowserRouter>
    </Fragment>

  );
}

export default App;
