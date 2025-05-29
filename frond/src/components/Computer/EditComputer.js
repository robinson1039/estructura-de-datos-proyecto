 import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

const EditarComputadora = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [computer, setComputer] = useState({
    serial: "",
    marca: "",
    tamaño: "",
    precio: "",
    sistema_operativo: "",
    procesador: "",
  });

  useEffect(() => {
    const fetchComputadora = async () => {
      try {
        const response = await clienteAxios.get(`/pcs/computadoras/${id}`);
        setComputer(response.data);
      } catch (error) {
        console.error("Error al cargar computadora:", error);
        Swal.fire("Error", "No se pudo cargar la computadora", "error");
      }
    };
    fetchComputadora();
  }, [id]);

  const handleChange = (e) => {
    setComputer({
      ...computer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await clienteAxios.put(`/pcs/computadoras/${id}`, computer);
      Swal.fire("Actualizado", response.data.message, "success");
      navigate("/computadoras");
    } catch (error) {
      console.error("Error al actualizar:", error);
      Swal.fire("Error", "No se pudo actualizar", "error");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center">Editar Estudiante</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded p-6 max-w-lg mx-auto"
      >
        {["serial", "marca", "tamaño", "precio", "sistema_operativo", "procesador"].map(
          (campo) => (
            <div key={campo} className="mb-4">
              <label className="block font-semibold capitalize mb-1">
                {campo.replace("_", " ")}
              </label>

              {campo === "sistema_operativo" ? (
                <select
                  name={campo}
                  value={computer[campo]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                >
                  <option value="">Seleccione un sistema operativo</option>
                  <option value="Windows 7">Windows 7</option>
                  <option value="Windows 10">Windows 10</option>
                  <option value="Windows 1|">Windows 11</option>
                  <option value="Linux">Linux</option>
                  <option value="macOS">macOS</option>
                  <option value="Ubuntu">Ubuntu</option>
                  <option value="Fedora">Fedora</option>
                </select>
              ) : campo === "procesador" ? (
                <select
                  name={campo}
                  value={computer[campo]}
                  onChange={handleChange}
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
              ) : (
                <input
                  type="text"
                  name={campo}
                  value={computer[campo]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              )}
            </div>
          )
        )}

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

export default EditarComputadora;
