import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { toast } from "react-toastify";
import {
  AddBooking,
  GetBooking,
  GetSpecificBooking,
} from "../../Api/Booking_Api";

const Add_Booking = () => {
  const { id } = useParams();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [bookedDates, setBookedDates] = useState<Date[]>([]); // Track booked dates
  const [userBookedProducts] = useState<string[]>([]); // Store user booked products
  const [bookingStatus, setBookingStatus] = useState<string | null>(null);

  // Form to add booking
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [totalGuest, settotalGuest] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const userId = localStorage.getItem("user") ?? "";
  const vendorId = localStorage.getItem("user") ?? "";
  // useEffect(() => {
  //   const fetchBookedDates = async (id: string) => {
  //     try {
  //       GetSpecificBooking(id).then((response) => {
  //         if (response && response.data && response.data.data) {
  //           console.log(response.data.data);
  //           const dates = response.data.data.map(
  //             (dateString: string) => new Date(dateString)
  //           );
  //           setBookedDates(dates);
  //         } else {
  //           console.error("Response or data is undefined");
  //         }
  //       });

  //       // Booked dates ko state mein set karein
  //     } catch (error) {
  //       console.error("Error fetching booked dates:", error);
  //     }
  //   };

  //   if (id) {
  //     fetchBookedDates(id);
  //   }
  // }, [id]);

  // useEffect(() => {
  //   const fetchBookings = async () => {
  //     try {
  //       GetBooking().then((response) => {
  //         const currentDate = new Date();
  //         const activeBooking = response?.data?.data?.find(
  //           (booking: {
  //             bookingDate: string;
  //             productId: string;
  //             status: string;
  //           }) =>
  //             new Date(booking.bookingDate) >= currentDate &&
  //             booking.productId === id
  //         );

  //         if (activeBooking) {
  //           setBookingStatus(activeBooking.status); // Set booking status
  //           if (activeBooking.status === "approved") {
  //             setStartDate(new Date(activeBooking.bookingDate));
  //           }
  //         }
  //       });
  //     } catch (error) {
  //       console.error("Error fetching bookings:", error);
  //     }
  //   };

  //   fetchBookings();
  // }, [id]);

  const addBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields with proper user feedback
    if (!startDate) {
      toast.error("Please select a booking date");
      return;
    }

    // if (!id) {
    //   toast.error("Product information is not available. Please try again.");
    //   return;
    // }

    // Additional validation for other required fields
    if (!name || !startTime || !endTime || !totalGuest || !email) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const bookingDate = startDate.toISOString();
      const response = await AddBooking(
        bookingDate,
        id ?? "",
        name,
        startTime,
        endTime,
        totalGuest,
        message,
        email,
        userId,
        vendorId
      );

      if (response?.status === 200) {
        toast.success("Booking request sent successfully!");
        // Reset form after successful submission
        setName("");
        setStartDate(null);
        setStartTime("");
        setEndTime("");
        settotalGuest("");
        setMessage("");
        setEmail("");
      } else {
        toast.error(response?.data?.message || "Booking submission failed");
      }
    } catch (error: any) {
      console.error("Booking error:", error);
      toast.error(error.response?.data?.message || "Failed to submit booking");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Booking Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm mx-auto">
            <div className="bg-[#4f46e5] text-white items-center text-center h-14 py-2 rounded-t-2xl font-bold">
              Book Now
            </div>
            <form className="space-y-4 mt-4 " onSubmit={addBooking}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border-[1.5px] border-black rounded-lg p-2"
                required
              />
              <div className="flex items-center  border-[1.5px] border-black rounded-lg p-2">
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date | null) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={startDate}
                  placeholderText="Start Date"
                  className="w-full outline-none "
                  minDate={new Date()}
                  excludeDates={bookedDates} // Disable booked dates
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full rounded-lg p-2 border-[1.5px] border-black"
                  required
                >
                  <option>Starts</option>
                  <option value={"01:00 am"}>01:00 am</option>
                  <option value={"01:30 am"}>01:30 am</option>
                  <option value={"02:00 am"}>02:00 am</option>
                  <option value={"02:30 am"}>02:30 am</option>
                  <option value={"03:00 am"}>03:00 am</option>
                  <option value={"03:30 am"}>03:30 am</option>
                  <option value={"04:00 am"}>04:00 am</option>
                  <option value={"04:30 am"}>04:30 am</option>
                  <option value={"05:00 am"}>05:00 am</option>
                  <option value={"05:30 am"}>05:30 am</option>
                  <option value={"06:00 am"}>06:00 am</option>
                  <option value={"06:30 am"}>06:30 am</option>
                  <option value={"07:00 am"}>07:00 am</option>
                  <option value={"07:30 am"}>07:30 am</option>
                  <option value={"08:00 am"}>08:00 am</option>
                  <option value={"08:30 am"}>08:30 am</option>
                  <option value={"09:00 am"}>09:00 am</option>
                  <option value={"09:30 am"}>09:30 am</option>
                  <option value={"10:00 am"}>10:00 am</option>
                  <option value={"10:30 am"}>10:30 am</option>
                  <option value={"11:00 am"}>11:00 am</option>
                  <option value={"11:30 am"}>11:30 am</option>
                  <option value={"12:00 am"}>12:00 am</option>
                </select>
                <select
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full border-[1.5px] border-black rounded-lg p-2"
                  required
                >
                  <option>Ends</option>
                  <option value={"01:00 am"}>01:00 am</option>
                  <option value={"01:30 am"}>01:30 am</option>
                  <option value={"02:00 am"}>02:00 am</option>
                  <option value={"02:30 am"}>02:30 am</option>
                  <option value={"03:00 am"}>03:00 am</option>
                  <option value={"03:30 am"}>03:30 am</option>
                  <option value={"04:00 am"}>04:00 am</option>
                  <option value={"04:30 am"}>04:30 am</option>
                  <option value={"05:00 am"}>05:00 am</option>
                  <option value={"05:30 am"}>05:30 am</option>
                  <option value={"06:00 am"}>06:00 am</option>
                  <option value={"06:30 am"}>06:30 am</option>
                  <option value={"07:00 am"}>07:00 am</option>
                  <option value={"07:30 am"}>07:30 am</option>
                  <option value={"08:00 am"}>08:00 am</option>
                  <option value={"08:30 am"}>08:30 am</option>
                  <option value={"09:00 am"}>09:00 am</option>
                  <option value={"09:30 am"}>09:30 am</option>
                  <option value={"10:00 am"}>10:00 am</option>
                  <option value={"10:30 am"}>10:30 am</option>
                  <option value={"11:00 am"}>11:00 am</option>
                  <option value={"11:30 am"}>11:30 am</option>
                  <option value={"12:00 am"}>12:00 am</option>
                </select>
              </div>
              <div className="flex items-center border-[1.5px] border-black rounded-lg p-2">
                <input
                  type="number"
                  placeholder="totalGuest"
                  value={totalGuest}
                  onChange={(e) => settotalGuest(e.target.value)}
                  className="w-full outline-none"
                  required
                />
              </div>
              <textarea
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border-[1.5px] border-black rounded-lg p-2"
                required
              ></textarea>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-[1.5px] border-black rounded-lg p-2"
                required
              />

              <div className="mt-6 flex justify-center">
                {bookingStatus ? (
                  <div>
                    <p className="text-lg font-semibold">
                      Booking Status:{" "}
                      <span
                        className={`${
                          bookingStatus === "pending"
                            ? "text-yellow-500"
                            : bookingStatus === "approved"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {bookingStatus.toUpperCase()}
                      </span>
                    </p>
                    {bookingStatus === "approved" && startDate && (
                      <p className="mt-2 text-blue-600">
                        Booked Date: {startDate.toDateString()}
                      </p>
                    )}
                  </div>
                ) : (
                  <button
                    disabled={userBookedProducts.includes(id as string)}
                    className={`px-6 py-3 ${
                      userBookedProducts.includes(id as string)
                        ? "bg-gray-400 cursor-not-allowed"
                        : "w-full bg-[#4f46e5] text-white py-2 rounded-lg font-bold hover:bg-pink-600"
                    } text-white font-semibold rounded-lg shadow-lg transition`}
                  >
                    Book Now
                  </button>
                )}
              </div>
              <p className="text-center text-gray-500 text-sm">
                © Venue Will Respond Shortly
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add_Booking;
