import React from 'react';
import { Link } from 'react-router-dom';    

const Home = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-6">
        <h1 className="text-2xl font-semibold mb-4">¿Quién eres?</h1>
        
        <Link
          to="/estudiantes-ingenieria"
          className="px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition"
        >
          Yo soy estudiante de ingeniería
        </Link>
  
        <Link
          to="/estudiantes"
          className="px-6 py-3 bg-green-600 text-white rounded-2xl hover:bg-green-700 transition"
        >
          Yo soy estudiante de diseño
        </Link>
      </div>
    );
  };

export default Home;
