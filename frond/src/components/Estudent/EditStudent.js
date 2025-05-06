import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

const EditarEstudiante = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [estudiante, setEstudiante] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    telefono: "",
    semestre_actual: "",
    promedio_acumulado: "",
    serial: "",
  });

  useEffect(() => {
    const fetchEstudiante = async () => {
      try {
        const response = await clienteAxios.get(`/estudiantes/${id}`);
        setEstudiante(response.data);
      } catch (error) {
        console.error("Error al cargar estudiante:", error);
        Swal.fire("Error", "No se pudo cargar el estudiante", "error");
      }
    };
    fetchEstudiante();
  }, [id]);

  const handleChange = (e) => {
    setEstudiante({
      ...estudiante,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await clienteAxios.put(`/estudiantes/${id}`, estudiante);
      Swal.fire("Actualizado", response.data.message, "success");
      navigate("/estudiantes-ingenieria");
    } catch (error) {
      console.error("Error al actualizar:", error);
      Swal.fire("Error", "No se pudo actualizar el estudiante", "error");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center">Editar Estudiante</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow rounded p-6 max-w-lg mx-auto">
        {["nombre", "apellido", "cedula", "telefono", "semestre_actual", "promedio_acumulado", "serial"].map((campo) => (
          <div key={campo} className="mb-4">
            <label className="block font-semibold capitalize mb-1">{campo.replace("_", " ")}</label>
            <input
              type="text"
              name={campo}
              value={estudiante[campo]}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditarEstudiante;
