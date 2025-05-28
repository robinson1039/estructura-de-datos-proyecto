import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../../config/axios.js";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const RentTablet = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const estudiante = location.state?.estudiante;

  const [tablets, setTablets] = useState([]);

  const fetchTablets = async () => {
    try {
      const response = await clienteAxios.get("tab/tablets");
      setTablets(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleRentarPc = async (tablet) => {
    try {
      // 1. Actualizar estudiante con el serial del PC
      await clienteAxios.put(`/diseño/estudiantes-diseño/${estudiante.id}`, {
        ...estudiante,
        serial: tablet.serial,
      });

      // 2. Marcar el PC como no disponible
      await clienteAxios.put("/tab/tablets/rentar", {
        tablet_id: tablet.id,
        estudiante_id: estudiante.id,
      });

      // 3. Confirmar y redirigir
      Swal.fire("¡Éxito!", "Tablet rentada correctamente", "success");
      navigate("/estudiantes-diseño");
    } catch (error) {
      console.error("Error al rentar tablet:", error);
      Swal.fire("Error", "No se pudo completar la renta", "error");
    }
  };

  useEffect(() => {
    fetchTablets();
  }, []);

  if (!estudiante) {
    // Si no hay estudiante redirecciona
    navigate("/estudiantes-diseño");
    return null;
  }
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Tablets disponibles para rentar
      </h1>

      <div className="overflow-x-auto mb-4">
        <table className="w-full bg-white rounded-lg shadow">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-2 text-center">Serial</th>
              <th className="px-4 py-2 text-center">Marca</th>
              <th className="px-4 py-2 text-center">Tamaño</th>
              <th className="px-4 py-2 text-center">Precio</th>
              <th className="px-4 py-2 text-center">Almacenamiento</th>
              <th className="px-4 py-2 text-center">Peso</th>
              <th className="px-4 py-2 text-center">Disponible</th>
              <th className="px-4 py-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tablets.length > 0 ? (
              tablets
                .filter((pc) => pc.disponible)
                .map((pc) => (
                  <tr key={pc.id}>
                    <td className="px-4 py-2 text-center">{pc.serial}</td>
                    <td className="px-4 py-2 text-center">{pc.marca}</td>
                    <td className="px-4 py-2 text-center">{pc.tamaño}</td>
                    <td className="px-4 py-2 text-center">{pc.precio}</td>
                    <td className="px-4 py-2 text-center">
                      {pc.almacenamiento}
                    </td>
                    <td className="px-4 py-2 text-center">{pc.peso}</td>
                    <td className="px-4 py-2 text-center">
                      {pc.disponible ? "Si" : "No"}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleRentarPc(pc)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                        >
                          Rentar
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

      <Link
        to={`/estudiantes-diseño`}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Cancelar
      </Link>
    </div>
  );
};

export default RentTablet;
