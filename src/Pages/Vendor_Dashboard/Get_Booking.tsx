import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { GetBooking, UpdateBooking } from "../../Api/Booking_Api";
import {
  Box,
  Button,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
} from "@mui/material";
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
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [status, setStatus] = useState("");

  const handleEdit = (booking: Booking) => {
    setSelectedBooking(booking);
    setStatus(booking.status);
    setModalOpen(true);
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };

  const handleUpdateStatus = async () => {
    if (!selectedBooking) return;
    try {
      const response = await UpdateBooking(selectedBooking._id, { status });

      if (response?.data.success) {
        const updatedBookings = bookings.map((booking) =>
          booking._id === selectedBooking._id ? { ...booking, status } : booking
        );
        setBookings(updatedBookings);
        setModalOpen(false);
      }
    } catch (error) {
      console.log("Error updating status:", error);
    }
  };
  useEffect(() => {
    const getBooking = async () => {
      const userString = localStorage.getItem("user");
      const currentUser = userString ? JSON.parse(userString) : null;
      const currentVendorId = currentUser ? currentUser._id : null;

      try {
        GetBooking()
          .then((response) => {
            const allBookings = response?.data.data;

            const vendorBookings = allBookings.filter(
              (booking: Booking) => booking.vendorId === currentVendorId
            );

            setBookings(vendorBookings);
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
                      onClick={() => handleEdit(booking)}
                      className="px-3 py-1 text-xs font-semibold rounded bg-red-500 text-white hover:bg-red-600 transition duration-200"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          aria-labelledby="edit-status-modal"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              maxWidth: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <h2>Update Booking Status</h2>
            <Select
              value={status}
              onChange={handleStatusChange}
              fullWidth
              sx={{ mt: 2 }}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="approved">Approved</MenuItem>
              <MenuItem value="cancelled">Rejected</MenuItem>
            </Select>
            <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateStatus}
              >
                Update
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Get_Booking;
