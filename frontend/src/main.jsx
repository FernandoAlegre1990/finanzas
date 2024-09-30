import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute"; // Para proteger rutas privadas
import store from "./redux/store"; // Asegúrate de importar tu store

// Importación de páginas
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home.jsx";
import IncomePage from "./pages/IncomePage.jsx";
import ExpensePage from "./pages/ExpensePage.jsx";
import Summary from "./pages/Summary.jsx";

// Definir el router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<Home />} /> {/* Ruta raíz / */}
      <Route path="/login" element={<Login />} /> {/* Ruta pública para login */}
      <Route path="/register" element={<Register />} /> {/* Ruta pública para registro */}

      {/* Ejemplo de ruta privada para IncomeList */}
      <Route path="/incomes" element={<IncomePage />} />
      <Route path="/expenses" element={<ExpensePage />} />
      <Route path="/summary" element={<Summary />} />

    </Route>
  )
);

// Renderizado de la aplicación
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}> {/* Proporcionar el store a toda la aplicación */}
    <RouterProvider router={router} />
  </Provider>
);
