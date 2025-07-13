import { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const token = localStorage.getItem("token");

  const imgbbAPIKey = "8b5097dd5b994e10a6691313c7b4e27a";

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/User", {
          headers: {
            Authorization: token,
          },
        });
        setUser(res.data.user);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchUserProfile();
  }, [token]);

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
      // 1️⃣ Upload image to ImageBB
      const imgbbRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
        selectedImage
      );

      const imageUrl = imgbbRes.data.data.url;
      console.log("Uploaded image URL:", imageUrl);

      // 2️⃣ Send image URL to your backend to update profile
      const res = await axios.put(
        "http://localhost:5000/api/v1/update",
        { image: imageUrl },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log("Profile updated:", res.data);
      setUser(res.data.user); // update UI with new profile
      setSelectedImage(null);
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
    }
  };

  if (!user) {
    return <div className="text-center text-gray-500 mt-10">Loading Profile...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-6">
      <div className="flex justify-center">
        <img
          src={user.image || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-2 border-blue-500"
        />
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
        <p className="text-sm text-gray-500">{user.email}</p>
        <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
          {user.role}
        </span>
      </div>

      <div className="space-y-2">
        <div>
          <h3 className="font-medium text-gray-700">Phone Number:</h3>
          <p className="text-gray-600">{user.phone_no || "Not Provided"}</p>
        </div>

        <div>
          <h3 className="font-medium text-gray-700">Address:</h3>
          <p className="text-gray-600">{user.address || "Not Provided"}</p>
        </div>

        <div>
          <h3 className="font-medium text-gray-700">Account Created:</h3>
          <p className="text-gray-600">
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Image Upload Form */}
      <form onSubmit={handleUpdateProfile} className="space-y-4 pt-6 border-t">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Upload New Profile Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-gray-700"
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
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Update Profile Image
        </button>
      </form>
    </div>
  );
};

export default Profile;
