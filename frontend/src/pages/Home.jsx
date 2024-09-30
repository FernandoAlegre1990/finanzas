import React from 'react';

const Home = () => {
  return (
    <div className="home-container" style={styles.container}>
      <h1 style={styles.heading}>Bienvenido a tu aplicación de Finanzas</h1>
      <p style={styles.text}>
        Aquí podrás gestionar tus ingresos, gastos y obtener un resumen financiero detallado.
      </p>
      <p style={styles.text}>
        Usa el menú de navegación para acceder a las secciones de ingresos, gastos y resumen.
      </p>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  heading: {
    fontSize: '36px',
    color: '#333',
    marginBottom: '20px',
  },
  text: {
    fontSize: '18px',
    color: '#666',
  },
};

export default Home;
