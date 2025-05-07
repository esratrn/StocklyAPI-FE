import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import API from '../services/api';

function Register() {
  const navigate = useNavigate();

  // State'ler
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  // Form submit
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await API.post("/register", {
        firstName: name,
        lastName: surname,
        email,
        password,
        jobTitle: role,
    });
    
    

      alert('Kayıt başarılı!');
      navigate('/dashboard'); // kayıt sonrası yönlendirme
    } catch (error) {
      console.error(error);
      alert('Kayıt sırasında hata oluştu.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="p-8 lg:w-1/2 mx-auto">
        <div className="bg-gray-100 rounded-lg py-12 px-4 lg:px-24">
          <h2 className="text-xl text-gray-800 font-semibold uppercase text-left mb-4">
            Add User
          </h2>

          <form className="mt-6" onSubmit={handleRegister}>
            {/* Name */}
            <div className="relative">
              <input
                type="text"
                placeholder="Name"
                className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md rounded-md w-full py-3 text-gray-600"
                value={name}
                onChange={(e) => setName(e.target.value)}
              /><div className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              </div> 
            </div>

            {/* Surname */}
            <div className="relative mt-3">
              <input
                type="text"
                placeholder="Surname"
                className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md rounded-md w-full py-3 text-gray-600"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
              <div className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              </div>
            </div>

            {/* Email */}
            <div className="relative mt-3">
              <input
                type="email"
                placeholder="Email"
                className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md rounded-md w-full py-3 text-gray-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
             <div className="absolute left-3 inset-y-0 flex items-center">
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

            {/* Password */}
            <div className="relative mt-3">
              <input
                type="password"
                placeholder="Password"
                className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md rounded-md w-full py-3 text-gray-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="absolute left-3 inset-y-0 flex items-center">

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

            {/* Role */}
            <div className="relative mt-3">
              <input
                type="text"
                placeholder="Job Title"
                className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md rounded-md w-full py-3 text-gray-600"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
              <div className="absolute left-3 inset-y-0 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 16 16">
      <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5m1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0M1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5"/>
    </svg>
  </div>
            </div>

            {/* Password strength göstergesi */}
            <p className="mt-4 italic text-gray-500 font-light text-xs">
              Password strength: <span className="font-bold text-green-400">strong</span>
            </p>

            {/* Submit butonu */}
            <div className="flex items-center justify-center mt-8">
              <button
                type="submit"
                className="text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
