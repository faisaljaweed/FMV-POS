import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { DeleteBooking, GetBooking } from "../../Api/Booking_Api";
interface Booking {
  _id: string;
  name: string;
  startTime: string;
  endTime: string;
  totalGuest: number;
  message: string;
  email: string;
  productId: string;
  userId: string;
  bookingDate: string;
  status: string;
  isCancel: boolean;
  vendorId: string;
  createdAt: string;
}

const Get_Booking = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error] = useState(null);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const getBooking = async () => {
      try {
        GetBooking()
          .then((response) => {
            setBookings(response?.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.error(error);
      }
    };
    getBooking();
  }, []);

  const handleDelete = (id: string) => {
    DeleteBooking(id)
      .then((res) => {
        setBookings(bookings.filter((booking) => booking._id !== id));
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const filteredUsers = bookings.filter(
    (booking) =>
      booking.name.toLowerCase().includes(search.toLowerCase()) ||
      booking.email.toLowerCase().includes(search.toLowerCase()) ||
      booking.bookingDate.toLowerCase().includes(search.toLowerCase())
  );

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">
          Check Booking Details
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
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Time
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  End Time
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Guests
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((booking) => (
                <tr key={booking._id}>
                  <td className="px-4 py-2 text-sm text-gray-900">
                    {booking.name}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900">
                    {booking.email}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900">
                    {booking.startTime}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900">
                    {booking.endTime}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900">
                    {booking.totalGuest}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900">
                    {new Date(booking.bookingDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        booking.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {booking.status}
                    </span>
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

export default Get_Booking;
