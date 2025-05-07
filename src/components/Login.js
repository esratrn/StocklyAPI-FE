import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';


function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('http://192.168.1.49:7080/api/auth/login', { email, password });
      console.log("Giriş başarılı", response.data);
      localStorage.setItem('token', response.data.token);

      navigate('/dashboard'); 
    } catch (error) {
      console.error("Giriş başarısız:", error.response?.data || error.message);
      alert('incorrect login!');
    }
  };

  return (
    
    <div className="">
      <div className="flex justify-end p-4">
  <a href="/register" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition">
    SIGN UP
  </a>
</div>

      <div className="p-8 lg:w-1/2 mx-auto">
        
      <div className="bg-gray-100 rounded-lg py-12 px-4 lg:px-24">
      <h2 className="text-xl text-gray-800 font-semibold uppercase text-left mb-4">
  Log In
</h2>
         
          <form onSubmit={handleLogin} className="mt-6">
            <div className="relative">
              <input
                className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600 transition rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="absolute left-0 inset-y-0 flex items-center pl-3 pointer-events-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-gray-400"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
      </svg>
  </div>
        
            </div>
            <div className="relative mt-3">
              <input
                className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600 transition rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="absolute left-0 inset-y-0 flex items-center pl-3 pointer-events-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-gray-400"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
      </svg>
  </div>
            </div>
            <div className="mt-4 flex items-center text-gray-500">
  <input
    type="checkbox"
    checked={rememberMe}
    onChange={() => setRememberMe(!rememberMe)}
    className="mr-3"
    id="remember"
  />
  <label htmlFor="remember">Remember me</label>
</div>

            <div className="flex items-center justify-center mt-8">
              <button
                type="submit"
                className="text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
