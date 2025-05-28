import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../../config/axios.js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const EstudiantesDiseño = () => {
  const navigate = useNavigate();

  const [Estudents, setEstudents] = useState([]); // Lista completa de estudiantes

  const [busqueda, setBusqueda] = useState({
    nombre: "",
    cedula: "",
  });

  const [resultado, setResultado] = useState([]); // Resultado de la búsqueda

  const handleChange = (e) => {
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  const searchStudents = async () => {
    try {
      const { nombre, cedula } = busqueda;
      const response = await clienteAxios.get(
        "/diseño/estudiantes-diseño/buscar",
        {
          params: {
            nombre,
            cedula,
          },
          withCredentials: true,
        }
      );
      setResultado(response.data);
    } catch (error) {
      console.error("Error al buscar estudiantes:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.mensaje || "Error desconocido",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await clienteAxios.delete(
        `/diseño/estudiantes-diseño/${id}`
      );
      if (response.status !== 200) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Eliminado Correctamente",
          text: response.data.message,
        });
        fetchEstudents();
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.error || "Error desconocido",
      });
    }
  };

  const fetchEstudents = async () => {
    try {
      const response = await clienteAxios.get("/diseño/estudiantes-diseño");
      setEstudents(response.data);
      setResultado([]);
      //console.log("Estudiantes:", response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleRentar = (student) => {
    navigate("/alquilar-tablet", { state: { estudiante: student } });
  };

  const handleDevolverTablet = async (student) => {
    console.log("Devolviendo tablet para el estudiante:", student);
    try {
      await clienteAxios.put("/tab/tablets/devolver", {
        serial: student.FK_serial,
        estudiante_id: student.id,
      });
      Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: "Tablet devuelta correctamente",
      });
      fetchEstudents();
    } catch (error) {
      console.error("Error al devolver tablet:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.error || "Error desconocido",
      });
    }
  };

  useEffect(() => {
    fetchEstudents();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Estudiantes de Diseño
      </h1>

      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={fetchEstudents}
        >
          Ver todos
        </button>
        <Link
          to="/registro-diseño"
          className="px-6 py-3 bg-green-600 text-white rounded-2xl hover:bg-green-700 transition"
        >
          Agregar estudiante
        </Link>
        <Link
          to="/tablets"
          className="px-6 py-3 bg-orange-600 text-white rounded-2xl hover:bg-orange-700 transition"
        >
          Inventario
        </Link>
      </div>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={busqueda.nombre}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded w-1/2"
        />

        <input
          type="text"
          name="cedula"
          placeholder="Cédula"
          value={busqueda.cedula}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded w-1/2"
        />

        <button
          onClick={searchStudents}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Buscar
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow text-center">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-2">Cédula</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Apellido</th>
              <th className="px-4 py-2">Teléfono</th>
              <th className="px-4 py-2">Modalidad de estudio</th>
              <th className="px-4 py-2">Asignaturas matriculadas</th>
              <th className="px-4 py-2">Serial</th>
              <th className="px-4 py-2">Tiene tablet asignada</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {resultado.length > 0 || Estudents.length > 0 ? (
              (resultado.length > 0 ? resultado : Estudents).map((student) => (
                <tr key={student.id}>
                  <td className="px-4 py-2">{student.cedula}</td>
                  <td className="px-4 py-2">{student.nombre}</td>
                  <td className="px-4 py-2">{student.apellido}</td>
                  <td className="px-4 py-2">{student.telefono}</td>
                  <td className="px-4 py-2">{student.modalidad_de_estudio}</td>
                  <td className="px-4 py-2">{student.cantidad_asignaturas}</td>
                  <td className="px-4 py-2">{student.FK_serial}</td>
                  <td className="px-4 py-2">
                    {student.tablet_asignado ? "Sí" : "No"}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2 justify-center flex-wrap">
                      <Link
                        to={`/editar-estudiante-diseño/${student.id}`}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Editar
                      </Link>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        onClick={() => handleDelete(student.id)}
                      >
                        Eliminar
                      </button>
                      <button
                        className={`px-3 py-1 rounded text-white ${
                          student.tablet_asignado
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                        }`}
                        onClick={() => handleRentar(student)}
                        disabled={student.tablet_asignado}
                      >
                        Rentar Tablet
                      </button>
                      <button
                        className={`px-3 py-1 rounded text-white ${
                          !student.tablet_asignado
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                        }`}
                        onClick={() => handleDevolverTablet(student)}
                        disabled={!student.tablet_asignado}
                      >
                        Devolver Tablet
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center px-4 py-2 text-red-500">
                  No hay resultados en la búsqueda
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex gap-4 mb-4 mt-4">
        <Link
          to="/"
          className="px-6 py-3 bg-red-600 text-white rounded-2xl hover:bg-green-700 transition"
        >
          Salir
        </Link>
      </div>
    </div>
  );
};

export default EstudiantesDiseño;
