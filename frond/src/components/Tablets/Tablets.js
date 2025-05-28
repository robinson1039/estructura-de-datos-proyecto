import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../../config/axios.js";
import Swal from "sweetalert2";

const EstudiantesDiseño = () => {
  const [tablets, setTablets] = useState([]);

  const [busqueda, setBusqueda] = useState({
    marca: "",
    serial: "",
  });

  const [resultado, setResultado] = useState([]);

  const handleChange = (e) => {
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  const searchTablet = async () => {
    try {
      const { marca, serial } = busqueda;
      const response = await clienteAxios.get("/tab/tablets/buscar", {
        params: {
          marca,
          serial,
        },
        withCredentials: true,
      });
      setResultado(response.data);
    } catch (error) {
      console.error("Error al buscar tablet:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.mensaje || "Error desconocido",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await clienteAxios.delete(`/tab/tablets/${id}`);
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
        fetchTablet();
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

  const fetchTablet = async () => {
    try {
      const response = await clienteAxios.get("/tab/tablets");
      setTablets(response.data);
      setResultado([]);
      //console.log("Estudiantes:", response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchTablet();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Inventario de tablets
      </h1>

      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={fetchTablet}
        >
          Ver todos
        </button>
        <Link
          to="/registro-tablets"
          className="px-6 py-3 bg-green-600 text-white rounded-2xl hover:bg-green-700 transition"
        >
          Ingresar tablet al Inventario
        </Link>
      </div>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          name="marca"
          placeholder="Marca"
          value={busqueda.marca}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded w-1/2"
        />

        <input
          type="text"
          name="serial"
          placeholder="Serial"
          value={busqueda.serial}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded w-1/2"
        />

        <button
          onClick={searchTablet}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Buscar
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-2 text-center">Serial</th>
              <th className="px-4 py-2 text-center">Marca</th>
              <th className="px-4 py-2 text-center">Tamaño</th>
              <th className="px-4 py-2 text-center">Precio</th>
              <th className="px-4 py-2 text-center">Almacenamiento</th>
              <th className="px-4 py-2 text-center">Peso</th>
              <th className="px-4 py-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {resultado.length > 0 || tablets.length > 0 ? (
              (resultado.length > 0 ? resultado : tablets).map((student) => (
                <tr key={student.id}>
                  <td className="px-4 py-2 text-center">{student.serial}</td>
                  <td className="px-4 py-2 text-center">{student.marca}</td>
                  <td className="px-4 py-2 text-center">{student.tamaño}</td>
                  <td className="px-4 py-2 text-center">{student.precio}</td>
                  <td className="px-4 py-2 text-center">
                    {student.almacenamiento}
                  </td>
                  <td className="px-4 py-2 text-center">{student.peso}</td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex justify-center gap-2">
                      <Link
                        to={`/editar-tablet/${student.id}`}
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
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center px-4 py-2 text-red-500">
                  No hay resultados en la búsqueda
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex gap-4 mb-4 mt-4">
        <Link
          to="/estudiantes-diseño"
          className="px-6 py-3 bg-red-600 text-white rounded-2xl hover:bg-green-700 transition"
        >
          Salir
        </Link>
      </div>
    </div>
  );
};

export default EstudiantesDiseño;
