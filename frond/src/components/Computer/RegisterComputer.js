import React, { useState } from "react";
import clienteAxios from "../../config/axios.js";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

const AddComputers = () => {
  const navigate = useNavigate();
  const [computers, saveComputer] = useState({
    serial: "",
    marca: "",
    tamaño: "",
    precio: "",
    sistema_operativo: "",
    procesador: "",
    registrado: "",
  });

  const updateEstate = async (e) => {
    saveComputer({
      ...computers,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.name + ":" + e.target.value);
  };

  const addComputer = async (e) => {
    e.preventDefault();
    try {
      const response = await clienteAxios.post("/pcs/computadoras", computers);
      console.log(response.data);
      const messageError =
        response.data?.message?.errors?.[0]?.msg ||
        response.data?.message?.errors?.[0]?.message ||
        "Error desconocido";
      if (response.status !== 201) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: messageError,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          text: response.data.message,
        });
        navigate("/computadoras");
      }
    } catch (error) {
      console.error("Error al registrar la computadora:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.error || "Error desconocido",
        confirmButtonColor: "###3085d6",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={addComputer}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-lg space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Registro de computadora</h2>

        <div>
          <label htmlFor="serial" className="block text-sm font-medium mb-1">
            Serial
          </label>
          <input
            type="text"
            name="serial"
            id="serial"
            onChange={updateEstate}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="marca" className="block text-sm font-medium mb-1">
            Marca
          </label>
          <input
            type="text"
            name="marca"
            id="marca"
            onChange={updateEstate}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="tamaño" className="block text-sm font-medium mb-1">
            Tamaño
          </label>
          <input
            type="text"
            name="tamaño"
            id="tamaño"
            onChange={updateEstate}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="precio" className="block text-sm font-medium mb-1">
            Precio
          </label>
          <input
            type="text"
            name="precio"
            id="precio"
            onChange={updateEstate}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="sistema_operativo" className="block text-sm font-medium mb-1">
            Sistema Operativo
          </label>
          <select
            id="sistema_operativo"
            name="sistema_operativo"
            type="text"
            onChange={updateEstate}
            className="w-full border border-gray-300 p-2 rounded"
            required
          >
            <option value="">Seleccione un sistema operativo</option>
            <option value="Windows 7">Windows 7</option>
            <option value="Windows 10">Windows 10</option>
            <option value="Windows 11">Windows 11</option>
            <option value="Linux">Linux</option>
            <option value="macOS">macOS</option>
            <option value="Ubuntu">Ubuntu</option>
            <option value="Fedora">Fedora</option>
          </select>
        </div>

        <div>
          <label htmlFor="procesador" className="block text-sm font-medium mb-1">
            Procesador
          </label>
          <select
            id="procesador"
            name="procesador"
            type="text"
            onChange={updateEstate}
            className="w-full border border-gray-300 p-2 rounded"
            required
          >
            <option value="">Seleccione un procesador</option>
            <option value="AMD Ryzen 5">AMD Ryzen 5</option>
            <option value="AMD Ryzen 7">AMD Ryzen 7</option>
            <option value="Intel Core i3">Intel Core i3</option>
            <option value="Intel Core i5">Intel Core i5</option>
            <option value="Intel Core i7">Intel Core i7</option>
            <option value="AMD Ryzen 3">AMD Ryzen 3</option>
            <option value="Apple M1">Apple M1</option>
            <option value="Apple M2">Apple M2</option>
          </select>
        </div>

        <div className="mt-4 flex justify-between">
          <Link
            to="/computadoras"
            className="px-6 py-2 bg-red-600 text-white rounded-2xl hover:bg-red-700 transition"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddComputers;
