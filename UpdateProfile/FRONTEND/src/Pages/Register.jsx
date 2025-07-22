import { useState } from "react";
import { api } from "../api/axiosInstance.js";

function Register() {
    const initialFormdata = {
      name: "",
      email: "",
      password: "",
      phone_no: "",
      address: "",
    };

    const dummyUser = {
      name: "Gaurav Kadam",
      email: "gaurav@example.com",
      password: "Test@1234",
      phone_no: "9876543210",
      address: "Mumbai, India",
    };

  const [formData, setFormData] = useState(initialFormdata);

  const handleChange = (e) => {
    const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const response = api.post('/api/v1/register' , formData)
        .then(()=>{
           console.log('Data pushed successfully' , response.message)
        })
        .catch((err)=>{
            console.error("Error while data pushing" , err)
        })
    
    setFormData(initialFormdata)
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-amber-800">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-amber-900">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-amber-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-amber-900">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-amber-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-amber-900">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-amber-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-amber-900">
              Phone
            </label>
            <input
              type="tel"
              name="phone_no"
              value={formData.phone_no}
              onChange={handleChange}
              className="w-full border border-amber-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-amber-900">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-amber-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700 transition mt-4"
          >
            Register
          </button>
          <button
            type="button"
            onClick={() => setFormData(dummyUser)}
            className="w-full bg-amber-400 text-white py-2 rounded hover:bg-amber-500 transition"
          >
            Fill Dummy User
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;

