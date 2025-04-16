export type UserTypes = {
  _id: string;
  username: string;
  email: string;
  role: string;
  password: string;
  confirmPassword: string;
  createdAt: string;
  updatedAt: string;
};

export type ProductTypes = {
  _id: string;
  VenuName: string;
  description: string;
  location: string;
  type: string;
  price: string;
  vendorId: string;
  standingCapacity: string;
  seatedCapacity: string;
  size: string;
  features: {
    swimmingPool: boolean;
    parking: boolean;
    wifi: boolean;
    secuirty: boolean;
    kitchen: boolean;
    bbqArea: boolean;
    airCondition: boolean;
  };
  createdAt: string;
  updatedAt: string;
};
export type BookingTypes = {
  bookingDate: string;
  productId: string;
  name: string;
  startTime: string;
  endTime: string;
  totalGuest: string;
  message: string;
  email: string;
  userId: string;
  vendorId: string;
};
