import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  deleteProductThunk,
  getProductThunk,
  selectProductList,
} from "../../store/productSlice";
import { toast } from "react-toastify";
import CustomButton from "../../Components/Button";

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
    (product.VenuName || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Venue Catalog
          </h1>
          <p className="text-lg text-gray-600">
            Browse and manage all available venues
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-md mx-auto">
          <div className="relative flex items-center">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search venues by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">
              No venues found matching your search
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {product.VenuName}
                    </h2>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                      {product.size} sq ft
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4">{product.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm">
                      <span className="font-medium text-gray-700 w-24">
                        Location:
                      </span>
                      <span className="text-gray-600">{product.location}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="font-medium text-gray-700 w-24">
                        Price:
                      </span>
                      <span className="text-gray-600">Rs. {product.price}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="font-medium text-gray-700 w-24">
                        Capacity:
                      </span>
                      <span className="text-gray-600">
                        {product.standingCapacity} standing /{" "}
                        {product.seatedCapacity} seated
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Features:
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(product.features).map(([key, value]) => (
                        <div key={key} className="flex items-center">
                          <span
                            className={`inline-block w-2 h-2 rounded-full mr-2 ${
                              value ? "bg-green-500" : "bg-red-500"
                            }`}
                          ></span>
                          <span className="text-sm text-gray-700">{key}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <CustomButton
                      type="button"
                      onClick={() => handleDelete(product._id)}
                      className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                    >
                      <DeleteIcon className="mr-1" fontSize="small" />
                      Delete
                    </CustomButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Get_Product;
