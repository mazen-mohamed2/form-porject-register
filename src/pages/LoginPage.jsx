import { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
// import image from "../assets/auction womn-01.svg";
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Here you replace 'YOUR_LOGIN_ENDPOINT' with your actual login API endpoint
      const response = await axios.post('http://192.168.1.46:8000/api/dashboard/login', {
        email,
        password,
      });

      // Assuming the API returns a token on successful authentication
      // You might want to adjust this based on your API response structure
      if (response.data && response.data?.data?.token) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem("token",response.data?.data?.token); // Store the token

        navigate('/user');
      } else {
        // Handle login failure (e.g., display an error message)
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      // Optionally, handle/display error message to the user
    }
  };

  return (
    // <div className="min-h-screen flex items-center justify-center bg-gray-100">
    //   <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
    //     <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
    //     <form onSubmit={handleSubmit}>
    //       <div className="mb-4">
    //         <label htmlFor="email" className="block text-sm font-medium text-gray-700">
    //           Email
    //         </label>
    //         <input
    //           type="email"
    //           id="email"
    //           name="email"
    //           value={email}
    //           onChange={handleEmailChange}
    //           className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
    //           required
    //         />
    //       </div>
    //       <div className="mb-6">
    //         <label htmlFor="password" className="block text-sm font-medium text-gray-700">
    //           Password
    //         </label>
    //         <input
    //           type="password"
    //           id="password"
    //           name="password"
    //           value={password}
    //           onChange={handlePasswordChange}
    //           className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
    //           required
    //         />
    //       </div>
    //       <button
    //         type="submit"
    //         className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors"
    //       >
    //         Sign In
    //       </button>
    //     </form>
    //   </div>
    // </div>
    <div className="overflow-y-auto">
      <Header
        title="Sign In form"
        type={"SignIn"}
        description="Email and Password"
      />
      <main className="relative grid place-items-center">
        <div className="bg-transparent bg-opacity-80  p-8 w-full max-w-4xl relative z-30 ">
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
            {/* email */}
            <div className="flex flex-col">
              <label className="px-0 py-3 font-semibold">Email</label>
              <input
                className="border-2 border-secondary rounded-lg py-1 px-2"
                type="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="px-0 py-3 font-semibold">Password</label>
              <input
                className="border-2 border-secondary rounded-lg py-1 px-2"
                type="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>

            {/* --------------------------- */}
            <button
              className="btn bg-secondary text-black rounded-md w-24 py-2 font-medium"
              type="submit"
            >
              Sign In
            </button>
          </form>
        </div>
        {/* <img src={image} className="absolute w-[23rem] top-0 z-0 " /> */}
      </main>
    </div>
  );
};

export default LoginPage;
