import React, { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/homePage/home';
import Estudiantes from './components/Estudent/RegisterStudent';
import RegistrarEstudianteDiseño from './components/DesignStudent/registerDesignStudent';
import EstudiantesIngenieria from './components/Estudent/EngineeringStudents';
import EstudiantesDiseno from './components/DesignStudent/DesignStudent';
import EditarEstudiante from './components/Estudent/EditStudent';
import EditarEstudianteDiseño from './components/DesignStudent/EditDesignStudent';
import RentarPc from './components/Estudent/RentPc';
import RentarTablet from './components/DesignStudent/RentTablet';
import Tablets from './components/Tablets/Tablets';
import EditarTablets from './components/Tablets/EditTablets';
import RegistroTablets from './components/Tablets/RegisterTablet';
import Computers from './components/Computer/Computer';
import EditarComputadora from './components/Computer/EditComputer';
import RegistrarComputadora from './components/Computer/RegisterComputer';
import './App.css';


function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/estudiantes-ingenieria" element={<EstudiantesIngenieria />} />
          <Route path="/estudiantes-diseño" element={<EstudiantesDiseno />} />
          <Route path="/registro-ingenieria" element={<Estudiantes />} />
          <Route path="/editar-estudiante/:id" element={<EditarEstudiante />} />
          <Route path="/editar-estudiante-diseño/:id" element={<EditarEstudianteDiseño />} />
          <Route path="/alquilar-pc" element={<RentarPc />} />
          <Route path="/alquilar-tablet" element={<RentarTablet />} />
          <Route path="/registro-diseño" element={<RegistrarEstudianteDiseño />} />
          <Route path="/tablets" element={<Tablets />} />
          <Route path="/editar-tablet/:id" element={<EditarTablets />} />
          <Route path="/registro-tablets" element={<RegistroTablets />} />
          <Route path="/computadoras" element={<Computers />} />
          <Route path="/editar-computadora/:id" element={<EditarComputadora />} />
          <Route path="/registro-computadoras" element={<RegistrarComputadora />} />
        </Routes>
      </BrowserRouter>
    </Fragment>

  );
}

export default App;
