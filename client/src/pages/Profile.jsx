import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>My Profile</h1>
      <form className="flex flex-col gap-4">
        <img src={currentUser.profilePicture} alt="profile" className='w-24 h-24 self-center cursor-pointer rounded-full object-cover mt-2' />
        <input defaultValue={currentUser.username} type="text" id="username" placeholder="Username" className="bg-slate-100 p-3 rounded-lg" />
        <input defaultValue={currentUser.email} type="email" id="email" placeholder="Email" className="bg-slate-100 p-3 rounded-lg" disabled />
        <input type="password" id="password" placeholder="Password" className="bg-slate-100 p-3 rounded-lg" />
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