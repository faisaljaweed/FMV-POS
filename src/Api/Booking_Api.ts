import axios from "axios";

// export const AddBooking = async () => {
//   try {
//     const response = await axios.post(
//       `http://localhost:3000/api/v1/booking/add-booking`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//         },
//       }
//     );
//     return response;
//   } catch (error) {
//     console.log("Error in AddBooking API: ", error);
//   }
// };

export const AddBooking = async (
  bookingDate: string,
  productId: string,
  name: string,
  startTime: string,
  endTime: string,
  totalGuest: string,
  message: string,
  email: string,
  vendorId: string,
  userId: string
) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/v1/booking/add-booking`,
      {
        bookingDate,
        productId,
        name,
        startTime,
        endTime,
        totalGuest,
        message,
        email,
        vendorId,
        userId,
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
      `http://localhost:3000/api/v1/booking/get-user-bookings`,
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

export const UpdateBooking = async (id: any) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/v1/booking/update-booking/${id}`
    );
    return response;
  } catch (error) {
    console.log("Error in UpdateBooking API: ", error);
  }
};

export const DeleteBooking = async (id: any) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/v1/booking/delete-booking/${id}`
    );
    return response;
  } catch (error) {
    console.log("Error in DeleteBooking API: ", error);
  }
};

export const GetSpecificBooking = async (id: any) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/v1/booking/get-specific-booking/${id}`,
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
