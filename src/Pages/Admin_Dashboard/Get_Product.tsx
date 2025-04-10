import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  deleteProductThunk,
  getProductThunk,
  selectProductList,
} from "../../store/productSlice";
import { toast } from "react-toastify";
import CustomButton from "../../Components/Button";
// interface Product {
//   _id: string;
//   name: string;
//   description: string;
//   location: string;
//   type: string;
//   price: number;
//   vendorId: string;
//   standingCapacity: number;
//   seatedCapacity: number;
//   size: number;
//   features: {
//     swimmingPool: boolean;
//     parking: boolean;
//     wifi: boolean;
//     secuirty: boolean;
//     kitchen: boolean;
//     bbqArea: boolean;
//     airCondition: boolean;
//   };
//   createdAt: string;
//   updatedAt: string;
// }

const Get_Product = () => {
  const [search, setSearch] = useState<string>("");
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProductList);
  useEffect(() => {
    dispatch(getProductThunk());
  }, []);

  const handleDelete = (id: string) => {
    try {
      dispatch(deleteProductThunk(id)).unwrap();
      toast.success("Product Deleted Successfully");
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

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
              <CustomButton
                type="submit"
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </CustomButton>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Get_Product;
