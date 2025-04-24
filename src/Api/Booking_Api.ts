import axios from "axios";
export const AddBooking = async (
  bookingDate: string,
  productId: string,
  name: string,
  startTime: string,
  endTime: string,
  totalGuest: number,
  message: string,
  contactNumber: number,
  type: string,
  userId: string,
  paymentStatus: string,
  advancePaid: number,
  totalPrice: number,
  specialRequests: string,
  farmHouseDetails: {
    poolAccess: boolean;
    overnightStay: boolean;
    catering: boolean;
    numberOfRooms: number;
    numberOfBeds: number;
    kitchen: boolean;
    parking: boolean;
    wifi: boolean;
    generator: boolean;
    security: boolean;
    barbecueArea: boolean;
    playArea: boolean;
  },
  banquetDetails: {
    guestCapacity: number;
    cateringService: Boolean;
    // menuTypes: String;
    inHouseDecoration: Boolean;
    stageAvailable: Boolean;
    djMusic: Boolean;
    valetParking: Boolean;
    changingRoom: Boolean;
    // eventTypesAllowed: String;
    acAvailable: Boolean;
    projectorAvailable: Boolean; // 🆕 new
    photographyService: Boolean; // 🆕 new
  },
  villaDetails: {
    floors: number;
    bedrooms: number;
    bathrooms: number;
    privatePool: Boolean;
    kitchenType: String;
    // enum: ["open", "closed", "shared"];
    maidService: Boolean;
    gardenArea: Boolean; // 🆕 new
    gymAccess: Boolean; // 🆕 new
  },
  // booking: Partial<BookingTypes>,
  vendorId: string
) => {
  try {
    const response = await axios.post(
      `https://fmv-pos-backend.vercel.app/api/v1/booking/add-booking`,
      {
        bookingDate,
        productId,
        name,
        startTime,
        endTime,
        totalGuest,
        message,
        contactNumber,
        userId,
        type,
        paymentStatus,
        advancePaid,
        totalPrice,
        specialRequests,
        farmHouseDetails,
        banquetDetails,
        villaDetails,
        vendorId,
        status: "pending",
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error in AddBooking API: ", error);
    throw error;
  }
};

export const GetBooking = async () => {
  try {
    const response = await axios.get(
      `https://fmv-pos-backend.vercel.app/api/v1/booking/get-user-bookings`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log("Error in GetBooking API: ", error);
  }
};

export const UpdateBooking = async (id: string, data: { status: string }) => {
  try {
    const response = await axios.put(
      `https://fmv-pos-backend.vercel.app/api/v1/booking/update-booking/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log("Error in UpdateBooking API: ", error);
  }
};

export const DeleteBooking = async (id: any) => {
  try {
    const response = await axios.delete(
      `https://fmv-pos-backend.vercel.app/api/v1/booking/delete-booking/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log("Error in DeleteBooking API: ", error);
  }
};

export const GetSpecificBooking = async (id: string) => {
  try {
    const response = await axios.get(
      `https://fmv-pos-backend.vercel.app/api/v1/booking/get-specific-booking/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log("Error in GetSpecificBooking API: ", error);
  }
};
