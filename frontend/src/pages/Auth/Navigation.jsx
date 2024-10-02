import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineDollarCircle,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlinePieChart,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/userApiSlice";
import { logout } from "../../redux/features/auth/authSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMouseEnter = () => {
    setShowSidebar(true);
  };

  const handleMouseLeave = () => {
    setShowSidebar(false);
  };

  return (
    <div>
      {/* Ícono menú hamburguesa para vistas móviles */}
      <div className="md:hidden p-4 text-white bg-black flex justify-between items-center">
        <button onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <AiOutlineClose size={26} /> : <AiOutlineMenu size={26} />}
        </button>
      </div>

      {/* Menú desplegable en vistas móviles */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black text-white fixed top-16 left-0 right-0 z-50 flex flex-col items-center space-y-4 p-4">
          <Link to="/" className="text-lg" onClick={toggleMobileMenu}>
            <AiOutlineHome className="inline mr-2" /> HOME
          </Link>
          <Link to="/incomes" className="text-lg text-green-500" onClick={toggleMobileMenu}>
            <AiOutlineDollarCircle className="inline mr-2" /> INGRESOS
          </Link>
          <Link to="/expenses" className="text-lg text-red-700" onClick={toggleMobileMenu}>
            <AiOutlineDollarCircle className="inline mr-2" /> GASTOS
          </Link>
          <Link to="/summary" className="text-lg" onClick={toggleMobileMenu}>
            <AiOutlinePieChart className="inline mr-2" /> RESUMEN
          </Link>
          {userInfo ? (
            <button className="text-lg" onClick={logoutHandler}>
              LOGOUT
            </button>
          ) : (
            <>
              <Link to="/login" className="text-lg" onClick={toggleMobileMenu}>
                <AiOutlineLogin className="inline mr-2" /> LOGIN
              </Link>
              <Link to="/register" className="text-lg" onClick={toggleMobileMenu}>
                <AiOutlineUserAdd className="inline mr-2" /> REGISTER
              </Link>
            </>
          )}
        </div>
      )}

      {/* Menú lateral en vistas más grandes */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`hidden md:flex flex-col justify-between p-4 text-white bg-black h-[100vh] fixed transition-all duration-300 ${
          showSidebar ? "w-64" : "w-0 overflow-hidden" // Cambiado para ocultar sidebar
        }`}
        style={{ zIndex: 9999 }}
      >
        {/* Links principales */}
        <div className={`flex flex-col justify-center space-y-4 ${showSidebar ? "block" : "hidden"}`}>
          <Link to="/" className="flex items-center transition-transform hover:translate-x-2">
            <AiOutlineHome className="mr-2" size={26} />
            <span className={`ml-2`}>HOME</span>
          </Link>

          <Link
            to="/incomes"
            className="flex items-center text-green-500 transition-transform hover:translate-x-2"
          >
            <AiOutlineDollarCircle className="mr-2" size={26} />
            <span className={`ml-2`}>INGRESOS</span>
          </Link>

          <Link
            to="/expenses"
            className="flex items-center text-red-700 transition-transform hover:translate-x-2"
          >
            <AiOutlineDollarCircle className="mr-2" size={26} />
            <span className={`ml-2`}>GASTOS</span>
          </Link>

          <Link
            to="/summary"
            className="flex items-center transition-transform hover:translate-x-2"
          >
            <AiOutlinePieChart className="mr-2" size={26} />
            <span className={`ml-2`}>RESUMEN</span>
          </Link>
        </div>

        {/* Usuario o Login/Registro */}
        <div className="relative">
          {userInfo ? (
            <>
              <button className="flex items-center text-gray-800 focus:outline-none">
                <span className="text-white">{userInfo.username}</span>
              </button>
              <button onClick={logoutHandler} className="flex items-center text-gray-800 mt-4">
                <span className={`ml-2`}>Logout</span>
              </button>
            </>
          ) : (
            <ul>
              <li>
                <Link
                  to="/login"
                  className="flex items-center mt-5 transition-transform hover:translate-x-2"
                >
                  <AiOutlineLogin className="mr-2" size={26} />
                  <span className={`ml-2`}>LOGIN</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="flex items-center mt-5 transition-transform hover:translate-x-2"
                >
                  <AiOutlineUserAdd size={26} />
                  <span className={`ml-2`}>REGISTER</span>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
