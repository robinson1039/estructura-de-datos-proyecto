import React, { useState } from 'react';
import clienteAxios from '../../config/axios.js';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddEstudiantes = () => {

    const navigate = useNavigate();
    const [estudiantes, saveEstudiantes] = useState({
        nombre: '',
        apellido: '',
        cedula: '',
        telefono: '',
        semestre_actual: '',
        promedio_acumulado: '',
        serial: '',
        registrado: ''
    });

 const updateEstate = async (e) => {
    saveEstudiantes({
        ...estudiantes,
        [e.target.name]: e.target.value
    })
    console.log( e.target.name + ':' + e.target.value)
}

const addStudent = async (e) => {
    e.preventDefault();
    try {
        const response = await clienteAxios.post('/estudiantes', estudiantes);
        console.log(response.data);
        const messageError = response.data?.message?.errors?.[0]?.msg || response.data?.message?.errors?.[0]?.message || "Error desconocido"
        if (response.status !== 201) {
            Swal.fire({
                icon: 'error',
                title: "Error",
                text: messageError
            })
        }else {
            Swal.fire({
                icon: 'success',
                title: "Registro exitoso",
                text: response.data.message
            })
            navigate('/estudiantes-ingenieria');
        }
    } catch (error) {
        console.error('Error al registrar el estudiante:', error);
        Swal.fire({
            icon: 'error',
            title: "Error",
            text: error.response?.data?.message || "Error desconocido"
        })

    }
}

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={addStudent}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-lg space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Registro de Estudiantes</h2>

        <input
          type="text"
          name="cedula"
          placeholder="Cédula"
          onChange={updateEstate}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />

        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          onChange={updateEstate}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />

        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          onChange={updateEstate}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />

        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          onChange={updateEstate}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />

        <input
          type="text"
          name="semestre_actual"
          placeholder="semestre actual"
          onChange={updateEstate}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />

        <input
          type="text"
          name="promedio_acumulado"
          placeholder="Promedio acumulado"
          onChange={updateEstate}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />

        <input
          type="text"
          name="serial"
          placeholder="Serial"
          onChange={updateEstate}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />

        <div className="mt-4">
        <Link
          to="/estudiantes-ingenieria"
          className="px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition"
        >
          Ya se encuentra registrado?
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
