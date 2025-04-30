import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  deleteUserThunk,
  getUserThunk,
  selectUserList,
} from "../../store/userSlice";
import { toast } from "react-toastify";
import {
  Avatar,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

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
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Bookings
      </Typography>

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
      <Paper className="shadow-md rounded-lg overflow-x-auto">
        <Table>
          <TableHead sx={{ backgroundColor: "#F9FAFB" }}>
            <TableRow>
              <TableCell>UserName</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>CreatedAt</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((booking) => (
                <TableRow key={booking._id} hover>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Avatar sx={{ bgcolor: "teal", mr: 2 }}>
                        {booking.username.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography fontWeight={500}>
                          {booking.username}
                        </Typography>
                        <Typography variant="caption">
                          ID: {booking._id.slice(-6)}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{booking.email}</TableCell>
                  <TableCell>{booking.role}</TableCell>
                  <TableCell>{booking.createdAt}</TableCell>
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

export default Get_Vendor;
