import { useState, useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { editProductThunk, getProductThunk } from "../../store/productSlice";
import { ProductTypes } from "../../Types/types";
import CustomButton from "../../Components/Button";

const Get_Product = () => {
  const [products, setProducts] = useState<ProductTypes[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductTypes | null>(
    null
  );

  // full screen image
  const [isImageOpen, setIsImageOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  //
  const dispatch = useAppDispatch();
  const userString = localStorage.getItem("user");
  const currentUser = userString ? JSON.parse(userString) : null;
  const currentVendorId = currentUser ? currentUser._id : null;

  // clicl top open image close full screen

  const openImage = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsImageOpen(true);
  };

  // Function to close the image
  const closeImage = () => {
    setIsImageOpen(false);
    setSelectedImage("");
  };

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
        console.log(filteredProducts);
        setProducts(filteredProducts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  // const handleEdit = (product: ProductTypes) => {
  //   setSelectedProduct(product);
  //   setIsModalOpen(true);
  // };

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

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">
              No venues found matching your search
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="mb-4">
                    {product.pics && product.pics.length > 0 && (
                      <>
                        {/* First image - large */}
                        <div className="mb-2">
                          <img
                            src={product.pics[0]}
                            alt="Main Venue"
                            className="w-full h-64 object-cover rounded-lg"
                            onClick={() => {
                              openImage(product.pics[0]);
                            }}
                          />
                        </div>

                        {/* Other images - thumbnails */}
                        <div className="grid grid-cols-4 gap-2">
                          {product.pics.slice(1).map((pic, index) => (
                            <img
                              key={index}
                              src={pic}
                              alt={`Thumbnail ${index + 1}`}
                              className="h-20 w-full object-cover rounded-md"
                              onClick={() => {
                                openImage(pic);
                              }}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

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
                      // onClick={() => handleEdit(product)}
                      className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                    >
                      Edit
                    </CustomButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl relative">
            <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const updateProduct = {
                  VenuName: selectedProduct.VenuName,
                  location: selectedProduct.location,
                  price: selectedProduct.price,
                  size: selectedProduct.size,
                  description: selectedProduct.description,
                  seatedCapacity: selectedProduct.seatedCapacity,
                  standingCapacity: selectedProduct.standingCapacity,
                  type: selectedProduct.type,
                  // features: selectedProduct.features,
                };
                dispatch(
                  editProductThunk({ id: selectedProduct._id, updateProduct })
                )
                  .unwrap()
                  .then(() => setIsModalOpen(false));
              }}
              className="space-y-4"
            >
              <input
                type="text"
                className="w-full border p-2"
                placeholder="Venue Name"
                value={selectedProduct.VenuName}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    VenuName: e.target.value,
                  })
                }
              />
              <input
                type="text"
                className="w-full border p-2"
                placeholder="Location"
                value={selectedProduct.description}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    description: e.target.value,
                  })
                }
              />

              <input
                type="number"
                className="w-full border p-2"
                placeholder="Price"
                value={selectedProduct.price}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    price: e.target.value,
                  })
                }
              />
              <input
                type="text"
                className="w-full border p-2"
                placeholder="Venue Name"
                value={selectedProduct.seatedCapacity}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    seatedCapacity: e.target.value,
                  })
                }
              />
              <input
                type="text"
                className="w-full border p-2"
                placeholder="Venue Name"
                value={selectedProduct.standingCapacity}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    standingCapacity: e.target.value,
                  })
                }
              />
              <input
                type="text"
                className="w-full border p-2"
                placeholder="Venue Name"
                value={selectedProduct.location}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    location: e.target.value,
                  })
                }
              />
              <input
                type="text"
                className="w-full border p-2"
                placeholder="Venue Name"
                value={selectedProduct.size}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    size: e.target.value,
                  })
                }
              />
              <select
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                id="type"
                name="type"
                required
              >
                <option value="" disabled>
                  Select Product Type
                </option>
                <option value="farm house">Farm House</option>
                <option value="hall">Hall</option>
                <option value="banquet">Banquet</option>
                <option value="villas">Villas</option>
                <option value="murqee">Murqee</option>
              </select>
              <input
                type="text"
                className="w-full border p-2"
                placeholder="Venue Name"
                value={selectedProduct.size}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    size: e.target.value,
                  })
                }
              />
              {/* Add other fields as needed */}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isImageOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
          <img
            src={selectedImage}
            alt="Full Screen"
            className="max-w-full max-h-full"
          />
          <button
            onClick={closeImage}
            className="absolute top-4 right-4 text-white text-4xl font-bold"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default Get_Product;
