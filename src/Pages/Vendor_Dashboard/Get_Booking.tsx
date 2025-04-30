import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField,
  InputAdornment,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Avatar,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { GetBooking, UpdateBooking } from "../../Api/Booking_Api";

interface Booking {
  _id: string;
  name: string;
  startTime: string;
  endTime: string;
  type: string;
  totalGuest: number;
  message: string;
  contactNumber: number;
  productId: string;
  userId: string;
  bookingDate: string;
  paymentStatus: string;
  advancePaid: number;
  totalPrice: number;
  specialRequests: string;
  status: string;
  isCancel: boolean;
  vendorId: string;
  createdAt: string;
}

const Get_Booking = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      const userString = localStorage.getItem("user");
      const currentUser = userString ? JSON.parse(userString) : null;
      const currentVendorId = currentUser ? currentUser._id : null;

      try {
        const response = await GetBooking();
        const allBookings = response?.data.data;
        const vendorBookings = allBookings.filter(
          (booking: Booking) => booking.userId === currentVendorId
        );
        setBookings(vendorBookings);
      } catch (error) {
        console.log("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const handleEdit = (booking: Booking) => {
    setSelectedBooking(booking);
    setStatus(booking.status);
    setModalOpen(true);
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };

  const handleFilterChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value);
  };

  const handleUpdateStatus = async () => {
    if (!selectedBooking) return;
    try {
      const response = await UpdateBooking(selectedBooking._id, { status });
      if (response?.data.success) {
        setBookings((prev) =>
          prev.map((booking) =>
            booking._id === selectedBooking._id
              ? { ...booking, status }
              : booking
          )
        );
        setModalOpen(false);
      }
    } catch (error) {
      console.log("Error updating status:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "#D1FAE5";
      case "pending":
        return "#FEF3C7";
      case "cancelled":
        return "#DBEAFE";
      default:
        return "#F3F4F6";
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = booking.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" }); // e.g. May
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Bookings
      </Typography>

      <Paper sx={{ p: 2, mb: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
        <TextField
          placeholder="Search bookings..."
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Select
          value={statusFilter}
          size="small"
          displayEmpty
          onChange={handleFilterChange}
          startAdornment={<FilterAltIcon sx={{ mr: 1 }} />}
        >
          <MenuItem value="all">All Statuses</MenuItem>
          <MenuItem value="approved">Approved</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="cancelled">Cancelled</MenuItem>
        </Select>
      </Paper>

      <Paper className="shadow-md rounded-lg overflow-x-auto">
        <Table>
          <TableHead sx={{ backgroundColor: "#F9FAFB" }}>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Date & Time</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Guests</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <TableRow key={booking._id} hover>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Avatar sx={{ bgcolor: "teal", mr: 2 }}>
                        {booking.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography fontWeight={500}>{booking.name}</Typography>
                        <Typography variant="caption">
                          ID: {booking._id.slice(-6)}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {formatDate(booking.bookingDate)}
                    </Typography>
                    <Typography variant="caption">
                      {booking.startTime} - {booking.endTime}
                    </Typography>
                  </TableCell>
                  <TableCell>{booking.type}</TableCell>
                  <TableCell>{booking.totalGuest}</TableCell>
                  <TableCell>
                    <Box
                      px={1}
                      py={0.5}
                      borderRadius={2}
                      bgcolor={getStatusColor(booking.status)}
                      display="inline-block"
                    >
                      <Typography variant="caption" fontWeight="bold">
                        {booking.status.charAt(0).toUpperCase() +
                          booking.status.slice(1)}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => handleEdit(booking)}
                    >
                      <EditIcon fontSize="small" />
                    </Button>
                    {/* <Button size="small" color="error">
                      <DeleteIcon fontSize="small" />
                    </Button> */}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No bookings found matching your criteria
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* Status Edit Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            width: 400,
            p: 4,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            mx: "auto",
            my: "20vh",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Update Booking Status
          </Typography>
          <Select
            fullWidth
            value={status}
            onChange={handleStatusChange}
            sx={{ mb: 2 }}
          >
            <MenuItem value="cancelled">Cancelled</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
          </Select>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateStatus}
          >
            Update
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Get_Booking;
