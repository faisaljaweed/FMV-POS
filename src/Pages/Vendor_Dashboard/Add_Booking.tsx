import { useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
const Add_Booking = () => {
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [totalGuest, settotalGuest] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [bookingStatus, setBookingStatus] = useState<string | null>(null);
  const [userBookedProducts] = useState<string[]>([]);
  const { id } = useParams();
  return (
    <div>
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm mx-auto">
        <div className="bg-[#4f46e5] text-white items-center text-center h-14 py-2 rounded-t-2xl font-bold">
          Book Now
        </div>
        <form
          className="space-y-4 mt-4 "
          // onSubmit={addBooking}
        >
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
  );
};

export default Add_Booking;
