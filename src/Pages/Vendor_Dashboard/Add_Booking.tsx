import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { AddBooking, GetBooking } from "../../Api/Booking_Api";
import { useAppDispatch } from "../../store/hooks";
import { getProductThunk } from "../../store/productSlice";
import { BookingTypes, ProductTypes } from "../../Types/types";
import {
  Banquet_Checkbox,
  Banquet_Input,
  Farm_House_Checkbox,
  Farm_House_Input,
  Villas_Checkbox,
  Villas_Input,
} from "./check_boxes";

const Add_Booking = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [bookedDates, setBookedDates] = useState<Date[]>([]); // Track booked dates
  const [products, setProducts] = useState<ProductTypes[]>([]);
  const [, setBookingDate] = useState<string>("");
  // Form to add booking
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [totalGuest, settotalGuest] = useState("");
  const [message, setMessage] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<{
    productId: string;
    vendorId: string;
  } | null>(null);
  const [type, setType] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("unpaid");
  const [advancePaid, setAdvancePaid] = useState<number>();
  const [totalPrice, setTotalPrice] = useState<number>();
  const [specialRequests, setSpecialRequests] = useState("");
  // Farm House Details and Checkboxes
  const [farmHouseDetails, setFarmHouseDetails] = useState({
    poolAccess: false,
    overnightStay: false,
    catering: false,
    numberOfRooms: 0,
    numberOfBeds: 0,
    kitchen: false,
    parking: false,
    wifi: false,
    generator: false,
    security: false,
    barbecueArea: false,
    playArea: false,
  });
  // Banquet Details and Checkboxes
  const [banquetDetails, setBanquetDetails] = useState({
    guestCapacity: 0,
    cateringService: false,
    // menuTypes: ""
    inHouseDecoration: false,
    stageAvailable: false,
    djMusic: false,
    valetParking: false,
    changingRoom: false,
    // eventTypesAllowed: String;
    acAvailable: false,
    projectorAvailable: false, // 🆕 new
    photographyService: false, // 🆕 new
  });
  // Villas Details and Checkboxes
  const [villas, setVillas] = useState({
    floors: 0,
    bedrooms: 0,
    bathrooms: 0,
    privatePool: false,
    kitchenType: "open",
    // enum: ["open", "closed", "shared"];
    maidService: false,
    gardenArea: false, // 🆕 new
    gymAccess: false,
  });

  const dispatch = useAppDispatch();
  const userString = localStorage.getItem("user");
  const currentUser = userString ? JSON.parse(userString) : null;
  const currentVendorId = currentUser ? currentUser._id : null;
  const timeSlots = [
    "01:00 ",
    "01:30 ",
    "02:00 ",
    "02:30 ",
    "03:00 ",
    "03:30 ",
    "04:00 ",
    "04:30 ",
    "05:00 ",
    "05:30 ",
    "06:00 ",
    "06:30 ",
    "07:00 ",
    "07:30 ",
    "08:00 ",
    "08:30 ",
    "09:00 ",
    "09:30 ",
    "10:00 ",
    "10:30 ",
    "11:00 ",
    "11:30 ",
    "12:00 ",
  ];

  useEffect(() => {
    if (selectedProduct) {
      // Get all bookings for this selected product
      GetBooking()
        .then((res) => {
          const allBookings: BookingTypes[] = res?.data.data;

          const selectedProductBookings = allBookings.filter(
            (booking) =>
              booking.productId === selectedProduct.productId &&
              booking.status === "approved"
          );

          // Convert booked dates into Date objects
          const booked = selectedProductBookings.map(
            (booking) => new Date(booking.bookingDate)
          );

          setBookedDates(booked); // Set the disabled dates in calendar
        })
        .catch((err) => {
          console.log("Error fetching bookings for selected product:", err);
        });
    } else {
      setBookedDates([]); // Reset if no product is selected
    }
  }, [selectedProduct]);

  useEffect(() => {
    console.log("Booked Dates:", bookedDates);
  }, [bookedDates]);

  const addBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields with proper user feedback
    if (!startDate) {
      toast.error("Please select a booking date");
      return;
    }

    // Additional validation for other required fields
    if (
      !name ||
      !startTime ||
      !endTime ||
      !totalGuest ||
      !contactNumber ||
      !selectedProduct
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const bookingDate = startDate.toISOString().split("T")[0];
      const response = await AddBooking(
        bookingDate,
        selectedProduct.productId,
        name,
        startTime,
        endTime,
        Number(totalGuest),
        message,
        Number(contactNumber),
        type,
        currentVendorId,
        paymentStatus,
        Number(advancePaid),
        Number(totalPrice),
        specialRequests,
        farmHouseDetails,
        banquetDetails,
        villas,
        selectedProduct.vendorId
      );
      console.log(response);

      toast.success("Booking request sent successfully!");
      // Reset form after successful submission
      setName("");
      setStartDate(null);
      setStartTime("");
      setEndTime("");
      settotalGuest("");
      setMessage("");
      setContactNumber("");
      setSelectedProduct(null);
      setPaymentStatus("");
      setAdvancePaid(0);
      setTotalPrice(0);
      setSpecialRequests("");
      setFarmHouseDetails({
        poolAccess: false,
        overnightStay: false,
        catering: false,
        numberOfRooms: 0,
        numberOfBeds: 0,
        kitchen: false,
        parking: false,
        wifi: false,
        generator: false,
        security: false,
        barbecueArea: false,
        playArea: false,
      });
      setBanquetDetails({
        guestCapacity: 0,
        cateringService: false,
        inHouseDecoration: false,
        stageAvailable: false,
        djMusic: false,
        valetParking: false,
        changingRoom: false,
        acAvailable: false,
        projectorAvailable: false, // 🆕 new
        photographyService: false, // 🆕 new
      });
      setVillas({
        floors: 0,
        bedrooms: 0,
        bathrooms: 0,
        privatePool: false,
        kitchenType: "open",
        maidService: false,
        gardenArea: false, // 🆕 new
        gymAccess: false,
      });
      setType("");
    } catch (error: any) {
      console.error("Booking error:", error);
      toast.error(error.response?.data?.message || "Failed to submit booking");
    }
  };

  // console.log(currentVendorId);
  useEffect(() => {
    dispatch(getProductThunk())
      .unwrap()
      .then((res) => {
        const allProduct: ProductTypes[] = res.data;

        // Debug all products' vendorId

        // Filter products by current vendor
        const filteredProducts = currentVendorId
          ? allProduct.filter((product) => product.vendorId === currentVendorId)
          : [];

        setProducts(filteredProducts);
        // console.log(filteredProducts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);
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
              <select
                className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">Select Type</option>
                <option value="farm house">Farm House</option>
                <option value="banquet">Banquet</option>
                <option value="villas">Villas</option>
              </select>
              <div className="flex items-center border-[1.5px] border-black rounded-lg p-2 bg-white shadow-sm">
                <select
                  className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={(e) => {
                    const selected = JSON.parse(e.target.value);
                    setSelectedProduct({
                      productId: selected.id,
                      vendorId: selected.vendorId,
                    });
                  }}
                  required
                >
                  <option value="">Select Venue</option>
                  {products.map((product, index) => (
                    <option
                      key={index}
                      value={JSON.stringify({
                        id: product._id,
                        vendorId: product.vendorId,
                      })}
                    >
                      {product.VenuName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center  border-[1.5px] border-black rounded-lg p-2">
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date | null) => {
                    setStartDate(date);
                    setBookingDate(date ? date.toISOString() : "");
                  }}
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
                  <option value="">Starts</option>
                  {timeSlots.map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
                </select>

                <select
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full border-[1.5px] border-black rounded-lg p-2"
                  required
                >
                  <option value="">Ends</option>
                  {timeSlots.map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
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
                type="number"
                placeholder="Your Number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="w-full border-[1.5px] border-black rounded-lg p-2"
                required
              />
              <input
                type="number"
                placeholder="Advance Paid"
                value={advancePaid}
                onChange={(e) => setAdvancePaid(Number(e.target.value))}
                className="w-full border-[1.5px] border-black rounded-lg p-2"
                required
              />
              <input
                type="number"
                placeholder="Total Price"
                value={totalPrice}
                onChange={(e) => setTotalPrice(Number(e.target.value))}
                className="w-full border-[1.5px] border-black rounded-lg p-2"
                required
              />
              <input
                type="text"
                placeholder="Special Requests"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="w-full border-[1.5px] border-black rounded-lg p-2"
                required
              />
              <select
                className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setPaymentStatus(e.target.value)}
                required
              >
                <option value="">Payment Status</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
                <option value="refund">Refund</option>
                <option value="partial">Partial</option>
              </select>
              {/* Farm House CheckBox  */}
              {type === "farm house" && (
                <div className="space-y-4">
                  {/* Checkboxes in a row */}
                  <div className="flex flex-wrap gap-4">
                    {Farm_House_Checkbox.map((val) => (
                      <div key={val.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          checked={Boolean(
                            farmHouseDetails[
                              val.id as keyof typeof farmHouseDetails
                            ]
                          )}
                          onChange={(e) =>
                            setFarmHouseDetails({
                              ...farmHouseDetails,
                              [val.id]: e.target.checked,
                            })
                          }
                        />
                        <label className="text-sm text-gray-700">
                          {val.label}
                        </label>
                      </div>
                    ))}
                  </div>

                  {/* Number inputs in a column */}
                  <div className="grid grid-cols-1 gap-4">
                    {Farm_House_Input.map((value) => (
                      <div key={value.id} className="flex flex-col">
                        <label className="mb-1 text-sm font-medium text-gray-700">
                          {value.label}
                        </label>
                        <input
                          type="number"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          value={Number(
                            farmHouseDetails[
                              value.id as keyof typeof farmHouseDetails
                            ]
                          )}
                          onChange={(e) =>
                            setFarmHouseDetails({
                              ...farmHouseDetails,
                              [value.id]: Number(e.target.value),
                            })
                          }
                          min="0"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Banquet CheckBox */}
              {type === "banquet" && (
                <div className="space-y-4">
                  {/* Checkboxes in a row */}
                  <div className="flex flex-wrap gap-4">
                    {Banquet_Checkbox.map((val) => (
                      <div key={val.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          checked={Boolean(
                            banquetDetails[
                              val.id as keyof typeof banquetDetails
                            ]
                          )}
                          onChange={(e) =>
                            setBanquetDetails({
                              ...banquetDetails,
                              [val.id]: e.target.checked,
                            })
                          }
                        />
                        <label className="text-sm text-gray-700">
                          {val.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  {/* Banquet Input */}
                  <div className="grid grid-cols-1 gap-4">
                    {Banquet_Input.map((value) => (
                      <div key={value.id} className="flex flex-col">
                        <label className="mb-1 text-sm font-medium text-gray-700">
                          {value.label}
                        </label>
                        <input
                          type="number"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          value={Number(
                            banquetDetails[
                              value.id as keyof typeof banquetDetails
                            ]
                          )}
                          onChange={(e) =>
                            setBanquetDetails({
                              ...banquetDetails,
                              [value.id]: Number(e.target.value),
                            })
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Villas CheckBox */}
              {type === "villas" && (
                <div className="space-y-4">
                  {/* Checkboxes in a row */}
                  <div className="flex flex-wrap gap-4">
                    {Villas_Checkbox.map((val) => (
                      <div key={val.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          checked={Boolean(
                            villas[val.id as keyof typeof villas]
                          )}
                          onChange={(e) =>
                            setVillas({
                              ...villas,
                              [val.id]: e.target.checked,
                            })
                          }
                        />
                        <label className="text-sm text-gray-700">
                          {val.label}
                        </label>
                      </div>
                    ))}
                  </div>

                  {/* Villas Input */}
                  <div className="grid grid-cols-1 gap-4">
                    {Villas_Input.map((value) => (
                      <div key={value.id} className="flex flex-col">
                        <label className="mb-1 text-sm font-medium text-gray-700">
                          {value.label}
                        </label>
                        <input
                          type="number"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          value={Number(
                            villas[value.id as keyof typeof villas]
                          )}
                          onChange={(e) =>
                            setVillas({
                              ...villas,
                              [value.id]: Number(e.target.value),
                            })
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-center">
                <button className="w-full bg-[#4f46e5] text-white py-2 rounded-lg font-bold hover:bg-pink-600">
                  Book Now
                </button>
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
