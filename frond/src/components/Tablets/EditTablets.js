import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

const EditarTablet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tablet, setTablet] = useState({
    serial: "",
    marca: "",
    tamaño: "",
    precio: "",
    almacenamiento: "",
    peso: "",
  });

  useEffect(() => {
    const fetchTablets = async () => {
      try {
        const response = await clienteAxios.get(`/tab/tablets/${id}`);
        setTablet(response.data);
      } catch (error) {
        console.error("Error al cargar tablet:", error);
        Swal.fire("Error", "No se pudo cargar tablet", "error");
      }
    };
    fetchTablets();
  }, [id]);

  const handleChange = (e) => {
    setTablet({
      ...tablet,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await clienteAxios.put(`/tab/tablets/${id}`, tablet);
      Swal.fire("Actualizado", response.data.message, "success");
      navigate("/tablets");
    } catch (error) {
      console.error("Error al actualizar:", error);
      Swal.fire("Error", "No se pudo actualizar el estudiante", "error");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center">Editar Estudiante</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded p-6 max-w-lg mx-auto"
      >
        {["serial", "marca", "tamaño", "precio", "almacenamiento", "peso"].map(
          (campo) => (
            <div key={campo} className="mb-4">
              <label className="block font-semibold capitalize mb-1">
                {campo.replace("_", " ")}
              </label>

              {campo === "almacenamiento" ? (
                <select
                  name={campo}
                  value={tablet[campo]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                >
                  <option value="">Seleccione almacenamiento</option>
                  <option value="256 GB">256 GB</option>
                  <option value="512 GB">512 GB</option>
                  <option value="1 TB">1 TB</option>
                </select>
              ) : (
                <input
                  type="text"
                  name={campo}
                  value={tablet[campo]}
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

export default EditarTablet;
