import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineDollarCircle,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlinePieChart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/userApiSlice";
import { logout } from "../../redux/features/auth/authSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [showSidebar, setShowSidebar] = useState(false);

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

  return (
    <div
      onMouseEnter={() => setShowSidebar(true)}
      onMouseLeave={() => setShowSidebar(false)}
      className={`flex flex-col justify-between p-4 text-white bg-[#000] h-[100vh] fixed transition-all duration-300 ${
        showSidebar ? "w-[15%]" : "w-[4%]"
      }`}
      style={{ zIndex: 9999 }}
    >
      {/* Links principales */}
      <div className="flex flex-col justify-center space-y-4">
        <Link
          to="/"
          className="flex items-center transition-transform hover:translate-x-2"
        >
          <AiOutlineHome className="mr-2" size={26} />
          <span className={`ml-2 ${showSidebar ? "block" : "hidden"}`}>
            HOME
          </span>
        </Link>

        <Link
          to="/incomes"
          className="flex items-center text-green-500 transition-transform hover:translate-x-2"
        >
          <AiOutlineDollarCircle className="mr-2" size={26} />
          <span className={`ml-2 ${showSidebar ? "block" : "hidden"}`}>
            INGRESOS
          </span>
        </Link>

        <Link
          to="/expenses"
          className="flex items-center text-red-700 transition-transform hover:translate-x-2"
        >
          <AiOutlineDollarCircle className="mr-2" size={26} />
          <span className={`ml-2 ${showSidebar ? "block" : "hidden"}`}>
            GASTOS
          </span>
        </Link>

        <Link
          to="/summary"
          className="flex items-center transition-transform hover:translate-x-2"
        >
          <AiOutlinePieChart className="mr-2" size={26} />
          <span className={`ml-2 ${showSidebar ? "block" : "hidden"}`}>
            RESUMEN
          </span>
        </Link>
      </div>

      {/* Usuario o Login/Registro */}
      <div className="relative">
        {userInfo ? (
          <>
            <button className="flex items-center text-gray-800 focus:outline-none">
              <span className="text-white">
                {userInfo.username}
              </span>
            </button>
            <button
              onClick={logoutHandler}
              className="flex items-center text-gray-800 mt-4"
            >
              <span className={`ml-2 ${showSidebar ? "block" : "hidden"}`}>
                Logout
              </span>
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
                <span className={`ml-2 ${showSidebar ? "block" : "hidden"}`}>
                  LOGIN
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="flex items-center mt-5 transition-transform hover:translate-x-2"
              >
                <AiOutlineUserAdd size={26} />
                <span className={`ml-2 ${showSidebar ? "block" : "hidden"}`}>
                  REGISTER
                </span>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navigation;
