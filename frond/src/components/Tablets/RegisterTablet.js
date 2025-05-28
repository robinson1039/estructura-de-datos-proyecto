import React, { useState } from "react";
import clienteAxios from "../../config/axios.js";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

const AddTablets = () => {
  const navigate = useNavigate();
  const [tablets, saveTablets] = useState({
    serial: "",
    marca: "",
    tamaño: "",
    precio: "",
    almacenamiento: "",
    peso: "",
    registrado: "",
  });

  const updateEstate = async (e) => {
    saveTablets({
      ...tablets,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.name + ":" + e.target.value);
  };

  const addTablet = async (e) => {
    e.preventDefault();
    try {
      const response = await clienteAxios.post("/tab/tablets", tablets);
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
        navigate("/tablets");
      }
    } catch (error) {
      console.error("Error al registrar la tablet:", error);
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
        onSubmit={addTablet}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-lg space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Registro de Tablets</h2>

        <div>
          <label htmlFor="serial" className="block mb-1 font-semibold">
            Serial
          </label>
          <input
            id="serial"
            type="text"
            name="serial"
            placeholder="Serial"
            onChange={updateEstate}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="marca" className="block mb-1 font-semibold">
            Marca
          </label>
          <input
            id="marca"
            type="text"
            name="marca"
            placeholder="Marca"
            onChange={updateEstate}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="tamaño" className="block mb-1 font-semibold">
            Tamaño
          </label>
          <input
            id="tamaño"
            type="text"
            name="tamaño"
            placeholder="Tamaño"
            onChange={updateEstate}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="precio" className="block mb-1 font-semibold">
            Precio
          </label>
          <input
            id="precio"
            type="text"
            name="precio"
            placeholder="Precio"
            onChange={updateEstate}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="almacenamiento" className="block mb-1 font-semibold">
            Almacenamiento
          </label>
          <select
            id="almacenamiento"
            name="almacenamiento"
            onChange={updateEstate}
            className="w-full border border-gray-300 p-2 rounded"
            required
          >
            <option value="">Seleccione almacenamiento</option>
            <option value="256 GB">256 GB</option>
            <option value="512 GB">512 GB</option>
            <option value="1 TB">1 TB</option>
          </select>
        </div>

        <div>
          <label htmlFor="peso" className="block mb-1 font-semibold">
            Peso
          </label>
          <input
            id="peso"
            type="text"
            name="peso"
            placeholder="Peso"
            onChange={updateEstate}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div className="mt-4 flex gap-4">
          <Link
            to="/tablets"
            className="px-6 py-3 bg-red-600 text-white rounded-2xl hover:bg-red-700 transition"
          >
            Cancelar
          </Link>

          <button
            type="submit"
            className="flex-grow bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTablets;
