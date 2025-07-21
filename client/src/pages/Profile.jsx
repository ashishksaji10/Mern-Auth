  import { useSelector } from "react-redux";
  import { useRef, useState } from "react";

  const Profile = () => {
    const { currentUser } = useSelector((state) => state.user);
    const fileRef = useRef(null);
    const [image, setImage] = useState(undefined);
    const [uploadStatus, setUploadStatus] = useState("");
    const [uploadError, setUploadError] = useState("");

    const [formData, setFormData] = useState({
      username: currentUser.username || "",
      email: currentUser.email || "",
      password: "",
      profilePicture: currentUser.profilePicture || "",
    });

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setUploadError("");
      setUploadStatus("Updating...");


      try {
        let updatedFormData = { ...formData };

        if(image) {
          if (image.size > 2 * 1024 * 1024) {
            setUploadError("Image size must be less than 2MB.");
            setUploadStatus("");
            return;
          }

          setUploadStatus("Uploading image...");
          const data = new FormData();
          data.append("file", image);
          data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
          data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

          const uploadRes = await fetch(import.meta.env.VITE_CLOUDINARY_UPLOAD_URL, {
            method: "POST",
            body: data,
          });

          if (!uploadRes.ok) {
            throw new Error("Failed to upload image");
          }
  
          const uploadResult = await uploadRes.json();
          console.log(uploadResult, "UR");
          
            updatedFormData = { ...formData, profilePicture: uploadResult.secure_url };
            setFormData(updatedFormData);
            setImage(undefined); 
          }

          const res = await fetch("/api/user/updateProfile", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(updatedFormData),
          });
    
          if (!res.ok) {
            throw new Error("Profile update failed.");
          }
    
          const result = await res.json();
          console.log(result, "res");
          
          setUploadStatus("Profile updated successfully!");
      } catch (error) {
        setUploadError("Failed to update profile. Please try again.");
        setUploadStatus("");
        console.error("Profile update error:", error);
      }
    }

    return (
      <div className="p-3 max-w-lg mx-auto">
        <h1 className='text-3xl font-semibold text-center my-7'>My Profile</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input type="file" ref={fileRef} hidden accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
          <img src={formData.profilePicture} alt="profile" className='w-24 h-24 self-center cursor-pointer rounded-full object-cover mt-2' onClick={() => fileRef.current.click()} />
          
          {uploadStatus && (
          <p className="text-green-800 text-center">{uploadStatus}</p>
          )}
          {uploadError && (
            <p className="text-red-800 text-center">{uploadError}</p>
          )}

          <input defaultValue={currentUser.username} type="text" id="username" placeholder="Username" className="bg-slate-100 p-3 rounded-lg" onChange={handleChange} />
          <input defaultValue={currentUser.email} type="email" id="email" placeholder="Email" className="bg-slate-100 p-3 rounded-lg" disabled />
          <input type="password" id="password" placeholder="Password" className="bg-slate-100 p-3 rounded-lg" onChange={handleChange} />
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Update</button>
        </form>
        <div className="flex justify-between mt-5">
          <span className="text-red-700 cursor-pointer">Delete Account</span>
          <span className="text-red-700 cursor-pointer">Sign Out</span>
        </div>
      </div>
    )
  }

  export default Profile