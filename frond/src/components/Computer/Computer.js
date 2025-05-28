import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../../config/axios.js";
import Swal from "sweetalert2";

const Computers = () => {
  const [computers, setComputers] = useState([]);

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

  const searchComputer = async () => {
    try {
      const { marca, serial } = busqueda;
      const response = await clienteAxios.get("/pcs/computadoras/buscar", {
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
      const response = await clienteAxios.delete(`/pcs/computadoras/${id}`);
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
        fetchComputer();
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

  const fetchComputer = async () => {
    try {
      const response = await clienteAxios.get("/pcs/computadoras");
      setComputers(response.data);
      setResultado([]);
      //console.log("Estudiantes:", response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchComputer();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Inventario de Computadoras
      </h1>

      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={fetchComputer}
        >
          Ver todos
        </button>
        <Link
          to="/registro-computadoras"
          className="px-6 py-3 bg-green-600 text-white rounded-2xl hover:bg-green-700 transition"
        >
          Ingresar computador al Inventario
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
          onClick={searchComputer}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Buscar
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow text-center">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-2">serial</th>
              <th className="px-4 py-2">marca</th>
              <th className="px-4 py-2">tamaño</th>
              <th className="px-4 py-2">precio</th>
              <th className="px-4 py-2">sistema operativo</th>
              <th className="px-4 py-2">procesador</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {resultado.length > 0 || computers.length > 0 ? (
              (resultado.length > 0 ? resultado : computers).map((computer) => (
                <tr key={computer.id} className="text-center">
                  <td className="px-4 py-2">{computer.serial}</td>
                  <td className="px-4 py-2">{computer.marca}</td>
                  <td className="px-4 py-2">{computer.tamaño}</td>
                  <td className="px-4 py-2">{computer.precio}</td>
                  <td className="px-4 py-2">{computer.sistema_operativo}</td>
                  <td className="px-4 py-2">{computer.procesador}</td>
                  <td className="px-4 py-2">
                    <div className="flex justify-center gap-2">
                      <Link
                        to={`/editar-computadora/${computer.id}`}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Editar
                      </Link>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        onClick={() => handleDelete(computer.id)}
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
          to="/estudiantes-ingenieria"
          className="px-6 py-3 bg-red-600 text-white rounded-2xl hover:bg-green-700 transition"
        >
          Salir
        </Link>
      </div>
    </div>
  );
};

export default Computers;
