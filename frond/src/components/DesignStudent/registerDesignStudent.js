import React, { useState } from "react";
import clienteAxios from "../../config/axios.js";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

const AddDesignStudent = () => {
  const navigate = useNavigate();
  const [estudiantes, saveEstudiantes] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    telefono: "",
    modalidad_de_estudio: "",
    cantidad_asignaturas: "",
    registrado: "",
  });

  const updateEstate = async (e) => {
    saveEstudiantes({
      ...estudiantes,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.name + ":" + e.target.value);
  };

  const addStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await clienteAxios.post(
        "/diseño/estudiantes-diseño",
        estudiantes
      );
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
        navigate("/estudiantes-diseño");
      }
    } catch (error) {
      console.error("Error al registrar el estudiante:", error);
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
        onSubmit={addStudent}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-lg space-y-4"
      >
        <h2 className="text-xl font-bold text-center">
          Registro de Estudiantes
        </h2>

        <div>
          <label htmlFor="cedula" className="block text-sm font-medium mb-1">
            Cédula
          </label>
          <input
            type="text"
            id="cedula"
            name="cedula"
            placeholder="Cédula"
            onChange={updateEstate}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="nombre" className="block text-sm font-medium mb-1">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            onChange={updateEstate}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="apellido" className="block text-sm font-medium mb-1">
            Apellido
          </label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            placeholder="Apellido"
            onChange={updateEstate}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="telefono" className="block text-sm font-medium mb-1">
            Teléfono
          </label>
          <input
            type="text"
            id="telefono"
            name="telefono"
            placeholder="Teléfono"
            onChange={updateEstate}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label
            htmlFor="modalidad_de_estudio"
            className="block text-sm font-medium mb-1"
          >
            Modalidad de estudio
          </label>
          <input
            type="text"
            id="modalidad_de_estudio"
            name="modalidad_de_estudio"
            placeholder="Modalidad de estudio"
            onChange={updateEstate}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label
            htmlFor="cantidad_asignaturas"
            className="block text-sm font-medium mb-1"
          >
            Asignaturas matriculadas
          </label>
          <input
            type="text"
            id="cantidad_asignaturas"
            name="cantidad_asignaturas"
            placeholder="Asignaturas matriculadas"
            onChange={updateEstate}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div className="mt-4">
          <Link
            to="/estudiantes-diseño"
            className="px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition"
          >
            ¿Ya se encuentra registrado?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default AddDesignStudent;
