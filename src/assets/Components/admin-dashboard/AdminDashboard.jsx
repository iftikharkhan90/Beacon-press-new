import React, { useState } from "react";
import sunshine from "../../images/sunshine.jpg";
import { MdOutlineCancelPresentation } from "react-icons/md";
import axios from "axios"; // <-- install axios
import config from "../../../common/config";

const AdminDashboard = () => {
  const [editpopup, seteditpopup] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

 const handleSubmit = async () => {
  if (!title || !description || !image) {
    alert("Please fill all fields");
    return;
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("image", image);

  try {
    
    const token = localStorage.getItem("token");
    console.log(token, 'token');
    
    const res = await axios.post(
      `${config.Journal_API_URL}/api/journals/create`,
      formData,
      {
         headers: {
                Authorization: `Bearer ${token}`,
              },
      }
    );
    

    alert(res.data.message);
    seteditpopup(false);
    setTitle("");
    setDescription("");
    setImage(null);
  } catch (error) {
    console.error(error);
    alert(
      error.response?.data?.message ||
      "Upload failed. Token may be missing or invalid."
    );
  }
};
  return (
    <div className="p-6">
      <div className="justify-end flex px-10 pb-5">
        <button
          onClick={() => seteditpopup(true)}
          className="bg-blue-600 border border-blue-900 rounded-xl hover:bg-blue-700 text-xl p-2 text-white"
        >
          Add journals
        </button>
      </div>

      {/* Example Journal Card */}
      <div className="flex gap-6">
        <div className="bg-blue-200 h-auto border border-gray-600 w-2/5 p-4 rounded-lg">
          <img className="h-20 w-full object-cover rounded" src={sunshine} alt="example" />
          <div className="text-xl mt-2">Description: Example description</div>
          <div className="text-xl mt-1">Title: Example Title</div>
        </div>
      </div>

      {/* Popup Modal */}
      {editpopup && (
        <div className="bg-black/50 fixed inset-0 z-10 flex justify-center items-center">
          <div className="bg-slate-100 rounded-sm w-[30%]">
            <div className="flex justify-end p-2">
              <MdOutlineCancelPresentation
                className="text-red-600 hover:bg-red-600 hover:text-white text-2xl cursor-pointer"
                onClick={() => seteditpopup(false)}
              />
            </div>

            <h1 className="text-blue-800 text-2xl font-bold text-center mb-4">
              Add Journal
            </h1>

            <div className="px-4 pb-4 space-y-3">
              {/* Upload Image */}
              <div>
                <label className="text-lg font-semibold">Upload Image:</label>
                <input
                  className="border w-full rounded-sm px-2 border-black mt-1"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-lg font-semibold">Description:</label>
                <input
                  className="border w-full rounded-sm h-8 text-xl p-1 border-black mt-1"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Title */}
              <div>
                <label className="text-lg font-semibold">Title:</label>
                <input
                  className="border w-full rounded-sm h-8 text-xl p-1 border-black mt-1"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Submit */}
              <div className="flex justify-end">
                <button
                  onClick={handleSubmit}
                  className="text-white text-xl px-5 py-1 hover:bg-blue-900 border border-blue-800 bg-blue-800 rounded-sm"
                >
                  Save Journal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
