import React, { useState } from "react";
import clienteAxios from "../../config/axios.js";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

const AddEstudiantes = () => {
  const navigate = useNavigate();
  const [estudiantes, saveEstudiantes] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    telefono: "",
    semestre_actual: "",
    promedio_acumulado: "",
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
      const response = await clienteAxios.post("/estudiantes", estudiantes);
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
        navigate("/estudiantes-ingenieria");
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
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-lg space-y-4 mx-auto"
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
            name="cedula"
            id="cedula"
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
            name="nombre"
            id="nombre"
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
            name="apellido"
            id="apellido"
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
            name="telefono"
            id="telefono"
            onChange={updateEstate}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label
            htmlFor="semestre_actual"
            className="block text-sm font-medium mb-1"
          >
            Semestre actual
          </label>
          <input
            type="text"
            name="semestre_actual"
            id="semestre_actual"
            onChange={updateEstate}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label
            htmlFor="promedio_acumulado"
            className="block text-sm font-medium mb-1"
          >
            Promedio acumulado
          </label>
          <input
            type="text"
            name="promedio_acumulado"
            id="promedio_acumulado"
            onChange={updateEstate}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div className="mt-4 text-center">
          <Link
            to="/estudiantes-ingenieria"
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

export default AddEstudiantes;
