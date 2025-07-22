import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../api/axiosInstance.js";
import CropImage from "../utils/Imagecrop.js";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isOpen , setIsopen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null);
  const imgbbAPIKey = import.meta.env.VITE_IMGBB_KEY;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await api.get("/api/v1/User");
        setUser(res.data.user);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!selectedImage) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const imgbbRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
        formData
      );

      const imageUrl = imgbbRes.data.data.url;

      const res = await api.put("/api/v1/update", { image: imageUrl });
      setUser(res.data.user);
      setSelectedImage(null);
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
    }
  };

  if (!user) {
    return <div className="text-center text-gray-500 mt-10">Loading Profile...</div>;
  }

  const handleEdit = () => {
    setIsopen(true)
    CropImage()
  }

  const handleclose = () => {
    setIsopen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <img
            src={user.image}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-2 border-amber-500"
          />
          <h2 className="text-2xl font-semibold text-amber-800">{user.name}</h2>
          <p className="text-sm text-gray-600">{user.email}</p>
          <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
            {user.role}
          </span>
          <span onClick={handleEdit}>edit</span>
          {
            isOpen && (
              <div>
                <img src={user.image} alt="" />
                <button onClick={handleclose}>Cancel</button>
              </div>
            )
          }
        </div>

        <div className="space-y-2 text-amber-900">
          <div>
            <label className="font-medium">Phone:</label>
            <p className="text-gray-700">{user.phone_no || "Not Provided"}</p>
          </div>
          <div>
            <label className="font-medium">Address:</label>
            <p className="text-gray-700">{user.address || "Not Provided"}</p>
          </div>
          <div>
            <label className="font-medium">Profile Created:</label>
            <p className="text-gray-700">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <form onSubmit={handleUpdateProfile} className="space-y-4 border-t pt-4">
          <div>
            <label className="block mb-1 font-medium text-amber-900">
              Upload New Profile Image:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-amber-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
          </div>

          {selectedImage && (
            <div className="flex justify-center">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                className="w-24 h-24 rounded-full object-cover border mt-2"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700 transition"
          >
            Update Profile Image
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
