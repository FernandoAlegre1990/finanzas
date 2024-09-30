import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useRegisterMutation } from "../../redux/api/userApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered");
      } catch (err) {
        console.log(err);
        toast.error(err.data.message);
      }
    }
  };

  return (
    <section className="pl-[10rem] flex flex-wrap">
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
  <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
    <h2 className="text-center text-3xl font-extrabold text-white">Register</h2>
    <form onSubmit={submitHandler} className="space-y-6">
      <div className="rounded-md shadow-sm">
        <label htmlFor="name" className="block text-sm font-medium text-white">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="mt-2 block w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white"
          placeholder="Enter name"
          value={username}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="rounded-md shadow-sm">
        <label htmlFor="email" className="block text-sm font-medium text-white">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          className="mt-2 block w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="rounded-md shadow-sm">
        <label htmlFor="password" className="block text-sm font-medium text-white">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="mt-2 block w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="rounded-md shadow-sm">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          className="mt-2 block w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <div>
        <button
          disabled={isLoading}
          type="submit"
          className="w-full flex justify-center py-3 px-4 bg-pink-600 text-white font-semibold rounded-md hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </div>

      {isLoading && <Loader />}

      <p className="text-center text-sm text-white">
        Already have an account?{" "}
        <Link
          to={redirect ? `/login?redirect=${redirect}` : "/login"}
          className="text-pink-400 hover:underline"
        >
          Login
        </Link>
      </p>
    </form>
  </div>
</div>

    
    </section>
  );
};

export default Register;