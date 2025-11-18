// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { fetchUsers } from "../app/UserSlice";

// const UpdateProduct = () => {
//   const { id } = useParams(); // e.g. /update/123
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { data, loading, error } = useSelector((state) => state.product);

//   const [uname, setUname] = useState("");
//   const [uemail, setUEmail] = useState("");
//   const [urole, setUrole] = useState("");

//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     dispatch(fetchUsers());
//   }, [dispatch]);

//   useEffect(() => {
//     if (data.length > 0) {
//       const existingUser = data.find((user) => user.id == id || user._id == id);

//       console.log(existingUser);

//       if (existingUser) {
//         setUname(existingUser.name);
//         setUEmail(existingUser.email);
//         setUrole(existingUser.role);
//       }
//     }
//   }, [data, id]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p className="text-red-600">Error: {error}</p>;

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     if (!uname || !uemail || !urole) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {
//       setSaving(true);

//       const result = await dispatch(
//         updateUserApi({
//           id: id,
//           name: uname,
//           email: uemail,
//           role: urole,
//         })
//       );

//       // alert("User updated successfully!")

//       console.log(" User updated:", result);
//       alert("User updated successfully!");
//       navigate("/admin");
//     } catch (err) {
//       console.error(" Update failed:");
//       alert("Error updating user: " + err);
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="mx-9 my-10">
//       <form onSubmit={submitHandler} className="flex flex-col gap-3">
//         <label>Name</label>
//         <input
//           className="outline outline-1 p-2"
//           type="text"
//           placeholder="Enter name"
//           onChange={(e) => setUname(e.target.value)}
//           value={uname}
//         />

//         <label>Email</label>
//         <input
//           className="outline outline-1 p-2"
//           type="email"
//           placeholder="Enter email"
//           onChange={(e) => setUEmail(e.target.value)}
//           value={uemail}
//         />

//         <label>Role</label>
//         <input
//           className="outline outline-1 p-2"
//           type="text"
//           placeholder="Enter role"
//           onChange={(e) => setUrole(e.target.value)}
//           value={urole}
//         />

//         <button
//           type="submit"
//           disabled={saving}
//           className={`${
//             saving ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
//           } text-white py-2 px-4 mt-3 rounded`}
//         >
//           {saving ? "Updating..." : "Update Product"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateProduct;   // this file is currently in no use ;



