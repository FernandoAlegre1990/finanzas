import React from 'react';
import './Home.css'; // Asegúrate de que esta línea importa tu CSS correctamente

const Home = () => {
  return (
    <div className="home-container"> {/* Aplica la clase home-container aquí */}
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100 bg-opacity-60">
        <h1 className="text-4xl font-bold mb-6 text-center text-black">
          Bienvenido a tu aplicación de Finanzas
        </h1>
        <p className="text-lg mb-4 text-center text-black">
          Aquí podrás gestionar tus ingresos, gastos y obtener un resumen financiero detallado.
        </p>
        <p className="text-lg text-center text-black">
          Usa el menú de navegación para acceder a las secciones de ingresos, gastos y resumen.
        </p>
      </div>
    </div>
  );
};

export default Home;
