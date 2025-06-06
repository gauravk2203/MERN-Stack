import { useState } from "react";

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const FormValidation = (e) => {
    e.preventDefault();
    let formErrors = {};

    if (!formData.name.trim()) {
      formErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      formErrors.password = "Password is required";
    }

    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      setSuccessMessage("Submitted successfully! 🎉");

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      });

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col max-w-sm mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg relative">
      <h2 className="text-2xl font-semibold mb-6 text-center">Create Account</h2>

      {successMessage && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 mt-[-2.5rem] bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300">
          {successMessage}
        </div>
      )}

      <form onSubmit={FormValidation} noValidate>
        <label className="flex flex-col mb-4">
          <span className="text-gray-700 mb-1">Name</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className={`border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-400`}
          />
          {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name}</span>}
        </label>

        <label className="flex flex-col mb-4">
          <span className="text-gray-700 mb-1">Email</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={`border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-400`}
          />
          {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
        </label>

        <label className="flex flex-col mb-4">
          <span className="text-gray-700 mb-1">Password</span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className={`border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-400`}
          />
          {errors.password && <span className="text-red-500 text-sm mt-1">{errors.password}</span>}
        </label>

        <label className="flex flex-col mb-6">
          <span className="text-gray-700 mb-1">Confirm Password</span>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            className={`border ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            } rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-400`}
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm mt-1">{errors.confirmPassword}</span>
          )}
        </label>

        <button
          type="submit"
          className="bg-amber-400 hover:bg-amber-500 text-white font-semibold p-2 rounded-lg transition duration-200"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default Form;
