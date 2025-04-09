import axios from "axios";

export const AddBooking = async () => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/v1/booking/add-booking`
    );
    return response;
  } catch (error) {
    console.log("Error in AddBooking API: ", error);
  }
};

export const GetBooking = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/v1/booking/get-user-bookings`
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
      `http://localhost:3000/api/v1/booking/get-specific-booking/${id}`
    );
    return response;
  } catch (error) {
    console.log("Error in GetSpecificBooking API: ", error);
  }
};
