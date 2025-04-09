import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  deleteUserThunk,
  getUserThunk,
  selectUserList,
} from "../../store/userSlice";
import { toast } from "react-toastify";

const Get_Vendor = () => {
  const [search, setSearch] = useState<string>("");
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUserList);
  console.log("user List from Redux", user);
  useEffect(() => {
    dispatch(getUserThunk());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    try {
      dispatch(deleteUserThunk(id)).unwrap();
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };
  const filteredUsers = user.filter(
    (users) =>
      users.username?.toLowerCase().includes(search.toLowerCase()) ||
      users.email?.toLowerCase().includes(search.toLowerCase()) ||
      users.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">
          Get User
        </h1>
        <div className="mb-4 flex items-center bg-white shadow-md rounded-lg p-2">
          <SearchIcon className="text-gray-400 mr-2" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 outline-none"
          />
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created at
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((booking) => (
                <tr key={booking._id}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {booking.username || "N/A"}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {booking.email || "N/A"}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {booking.role || "N/A"}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {new Date(booking.createdAt).toLocaleDateString() || "N/A"}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(booking._id)}
                      className="px-3 py-1 text-xs font-semibold rounded bg-red-500 text-white hover:bg-red-600 transition duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Get_Vendor;
