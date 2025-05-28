import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../../config/axios.js";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const RentPc = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const estudiante = location.state?.estudiante;

  const [pcs, setPcs] = useState([]); // Lista completa de estudiantes

  const fetchPc = async () => {
    try {
      const response = await clienteAxios.get("pcs/computadoras");
      setPcs(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleRentarPc = async (pc) => {
    try {
      // 1. Actualizar estudiante con el serial del PC
      await clienteAxios.put(`/estudiantes/${estudiante.id}`, {
        ...estudiante,
        serial: pc.serial,
      });

      // 2. Marcar el PC como no disponible
      await clienteAxios.put("/pcs/computadoras/rentar", {
        pc_id: pc.id,
        estudiante_id: estudiante.id,
      });

      // 3. Confirmar y redirigir
      Swal.fire("¡Éxito!", "PC rentado correctamente", "success");
      navigate("/estudiantes-ingenieria");
    } catch (error) {
      console.error("Error al rentar PC:", error);
      Swal.fire("Error", "No se pudo completar la renta", "error");
    }
  };

  useEffect(() => {
    fetchPc();
  }, []);

  if (!estudiante) {
    // Si no hay estudiante redirecciona
    navigate("/estudiantes-ingenieria");
    return null;
  }
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Computadores disponibles para rentar
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow text-center">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-2">Serial</th>
              <th className="px-4 py-2">Marca</th>
              <th className="px-4 py-2">Tamaño</th>
              <th className="px-4 py-2">Sistema Operativo</th>
              <th className="px-4 py-2">Procesador</th>
              <th className="px-4 py-2">Disponible</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pcs.length > 0 ? (
              pcs
                .filter((pc) => pc.disponible)
                .map((pc) => (
                  <tr key={pc.id}>
                    <td className="px-4 py-2">{pc.serial}</td>
                    <td className="px-4 py-2">{pc.marca}</td>
                    <td className="px-4 py-2">{pc.tamaño}</td>
                    <td className="px-4 py-2">{pc.sistema_operativo}</td>
                    <td className="px-4 py-2">{pc.procesador}</td>
                    <td className="px-4 py-2">{pc.disponible ? "Sí" : "No"}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleRentarPc(pc)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Rentar
                      </button>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center px-4 py-2 text-red-500">
                  No hay resultados en la búsqueda
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Link
        to={`/estudiantes-ingenieria`}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Cancelar
      </Link>
    </div>
  );
};

export default RentPc;
