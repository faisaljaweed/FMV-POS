import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { DeleteBooking, GetBooking } from "../../Api/Booking_Api";
import {
  Box,
  Button,
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
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import DeleteIcon from "@mui/icons-material/Delete";
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
  type: string; // Added the 'type' property
}

const Get_Booking = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error] = useState(null);
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleFilterChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value);
  };

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

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = booking.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }
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
                      onClick={() => handleDelete(booking._id)}
                      size="small"
                      color="error"
                    >
                      <DeleteIcon fontSize="small" />
                    </Button>
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
    </Box>
  );
};

export default Get_Booking;
