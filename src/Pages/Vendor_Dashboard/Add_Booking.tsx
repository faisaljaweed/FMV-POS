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
import { Calendar } from "lucide-react";

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
      <div className="py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Add New Booking
        </h1>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <form onSubmit={addBooking}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Customer Name */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Customer Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                      required
                    />
                  </div>
                </div>
                {/* Service Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service Type
                  </label>
                  <select
                    name="serviceType"
                    onChange={(e) => setType(e.target.value)}
                    className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="farm house">Farm House</option>
                    <option value="banquet">Banquet</option>
                    <option value="villas">Villas</option>
                  </select>
                </div>
                {/* Select Product */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product
                  </label>
                  <select
                    name="serviceType"
                    onChange={(e) => {
                      const selected = JSON.parse(e.target.value);
                      setSelectedProduct({
                        productId: selected.id,
                        vendorId: selected.vendorId,
                      });
                    }}
                    className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
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
                {/* Date Pick */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
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
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                      minDate={new Date()}
                      excludeDates={bookedDates} // Disable booked dates
                    />
                  </div>
                </div>

                {/* Start Time  */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Time
                  </label>
                  <select
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                    required
                  >
                    <option value="">Starts</option>
                    {timeSlots.map((time, index) => (
                      <option key={index} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
                {/* End Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Time
                  </label>
                  <select
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
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

                {/* total Guest */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Guest
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="totalGuest"
                      value={totalGuest}
                      onChange={(e) => settotalGuest(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                      required
                    />
                  </div>
                </div>
                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <div className="relative">
                    <textarea
                      placeholder="Message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                      required
                    />
                  </div>
                </div>
                {/* Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Number
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="Your Number"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                      required
                    />
                  </div>
                </div>
                {/* Advance Paid */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Advance Paid
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="Advance Paid"
                      value={advancePaid}
                      onChange={(e) => setAdvancePaid(Number(e.target.value))}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                      required
                    />
                  </div>
                </div>
                {/* Total Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Price
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="Total Price"
                      value={totalPrice}
                      onChange={(e) => setTotalPrice(Number(e.target.value))}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                      required
                    />
                  </div>
                </div>
                {/* Special Request */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Request
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Special Requests"
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                      required
                    />
                  </div>
                </div>
                {/* Payment Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Status
                  </label>
                  <select
                    className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                    onChange={(e) => setPaymentStatus(e.target.value)}
                    required
                  >
                    <option value="">Payment Status</option>
                    <option value="paid">Paid</option>
                    <option value="unpaid">Unpaid</option>
                    <option value="refund">Refund</option>
                    <option value="partial">Partial</option>
                  </select>
                </div>
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
                    {/* Farm House inputs  */}
                    <div className="grid grid-cols-1 gap-4">
                      {Farm_House_Input.map((value) => (
                        <div key={value.id} className="flex flex-col">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {value.label}
                          </label>
                          <input
                            type="number"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
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
                    {/* Benquet Input */}
                    <div className="grid grid-cols-1 gap-4">
                      {Banquet_Input.map((value) => (
                        <div key={value.id} className="flex flex-col">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {value.label}
                          </label>
                          <input
                            type="number"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
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
                            min="0"
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
                    <div className="grid grid-cols-1 gap-4">
                      {Villas_Input.map((value) => (
                        <div key={value.id} className="flex flex-col">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {value.label}
                          </label>
                          <input
                            type="number"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                            value={Number(
                              villas[value.id as keyof typeof villas]
                            )}
                            onChange={(e) =>
                              setVillas({
                                ...villas,
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

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="mr-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 flex items-center"
                  >
                    Create Booking
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add_Booking;
