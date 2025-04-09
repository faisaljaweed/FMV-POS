// import { useState } from "react";
// import SearchIcon from "@mui/icons-material/Search";
// interface Booking {
//   _id: string;
//   clientId?: {
//     username?: string;
//   };
//   productId?: {
//     name?: string;
//   };
//   bookingDate: string;
//   status: string;
// }

// const GetProduct = () => {
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error] = useState(null);
//   const [search, setSearch] = useState<string>("");
//   // useEffect(() => {
//   //   const getBooking = async () => {
//   //     const token = localStorage.getItem("accessToken");
//   //     try {
//   //       const response = await axios.get(
//   //         `http://localhost:3000/api/v1/booking/get-booking-only-admin`,
//   //         {
//   //           headers: {
//   //             Authorization: `Bearer ${token}`,
//   //           },
//   //         }
//   //       );
//   //       setBookings(response.data.data); // Assuming the response has a `data` field
//   //       setLoading(false);
//   //     } catch (error) {
//   //       console.error(error);
//   //       // setError("Failed to fetch bookings");
//   //       setLoading(false);
//   //     }
//   //   };
//   //   getBooking();
//   // }, []);

//   // const handleDelete = (id: string) => {
//   //   const token = localStorage.getItem("accessToken");
//   //   axios
//   //     .delete(`http://localhost:3000/api/v1/booking/delete-booking/${id}`, {
//   //       headers: {
//   //         Authorization: `Bearer ${token}`,
//   //       },
//   //     })
//   //     .then((res) => {
//   //       setBookings(bookings.filter((booking) => booking._id !== id));
//   //       console.log(res);
//   //     })
//   //     .catch((err) => console.log(err));
//   // };
//   // if (loading) {
//   //   return (
//   //     <div className="flex justify-center items-center h-screen">
//   //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//   //     </div>
//   //   );
//   // }

//   const filteredUsers = bookings.filter(
//     (user) =>
//       user.clientId?.username?.toLowerCase().includes(search.toLowerCase()) ||
//       user.productId?.name?.toLowerCase().includes(search.toLowerCase()) ||
//       user.bookingDate.toLowerCase().includes(search.toLowerCase())
//   );

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-red-500 text-xl">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">
//           Check Booking Details
//         </h1>
//         <div className="mb-4 flex items-center bg-white shadow-md rounded-lg p-2">
//           <SearchIcon className="text-gray-400 mr-2" aria-hidden="true" />
//           <input
//             type="text"
//             placeholder="Search users..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full p-2 outline-none"
//           />
//         </div>
//         <div className="bg-white shadow-md rounded-lg overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-200">
//               <tr>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Client Name
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Product Name
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Booking Date
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Action
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredUsers.map((booking) => (
//                 <tr key={booking._id}>
//                   <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
//                     {booking.clientId?.username || "N/A"}
//                   </td>
//                   <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
//                     {booking.productId?.name || "N/A"}
//                   </td>
//                   <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
//                     {new Date(booking.bookingDate).toLocaleDateString()}
//                   </td>
//                   <td className="px-4 py-2 whitespace-nowrap">
//                     <span
//                       className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                         booking.status === "approved"
//                           ? "bg-green-100 text-green-800"
//                           : booking.status === "rejected"
//                           ? "bg-red-100 text-red-800"
//                           : "bg-yellow-100 text-yellow-800"
//                       }`}
//                     >
//                       {booking.status}
//                     </span>
//                   </td>
//                   <td className="px-4 py-2 whitespace-nowrap">
//                     <button
//                       // onClick={() => handleDelete(booking._id)}
//                       className="px-3 py-1 text-xs font-semibold rounded bg-red-500 text-white hover:bg-red-600 transition duration-200"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GetProduct;

import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
interface Product {
  _id: string;
  name: string;
  description: string;
  location: string;
  type: string;
  price: number;
  vendorId: string;
  standingCapacity: number;
  seatedCapacity: number;
  size: number;
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
}

const Get_Product = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  // useEffect(() => {
  //   const getBooking = async () => {
  //     const token = localStorage.getItem("accessToken");
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:3000/api/v1/booking/get-booking-only-admin`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       setBookings(response.data.data); // Assuming the response has a `data` field
  //       setLoading(false);
  //     } catch (error) {
  //       console.error(error);
  //       // setError("Failed to fetch bookings");
  //       setLoading(false);
  //     }
  //   };
  //   getBooking();
  // }, []);

  // const handleDelete = (id: string) => {
  //   const token = localStorage.getItem("accessToken");
  //   axios
  //     .delete(`http://localhost:3000/api/v1/booking/delete-booking/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       setBookings(bookings.filter((booking) => booking._id !== id));
  //       console.log(res);
  //     })
  //     .catch((err) => console.log(err));
  // };
  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  //     </div>
  //   );
  // }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-6">
          Get All Products
        </h1>

        <div className="mb-4 flex items-center bg-white shadow-md rounded-lg p-2">
          <SearchIcon className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 outline-none"
          />
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Capacity
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Size
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Feature
              </th>
            </tr>
          </thead>
        </table>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white p-4 shadow-md rounded-lg"
            >
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="mt-2 text-sm text-gray-500">
                Location: {product.location}
              </p>
              <p className="text-sm">Price: Rs. {product.price}</p>
              <p className="text-sm">
                Capacity: {product.standingCapacity} standing /{" "}
                {product.seatedCapacity} seated
              </p>
              <p className="text-sm">Size: {product.size} sq ft</p>
              <div className="mt-2 text-sm">
                Features:
                <ul className="list-disc ml-5">
                  {Object.entries(product.features).map(([key, value]) => (
                    <li
                      key={key}
                      className={value ? "text-green-600" : "text-red-500"}
                    >
                      {key}: {value ? "Yes" : "No"}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Get_Product;
