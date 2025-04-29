import { useState } from "react";
import { toast } from "react-toastify";
import CustomButton from "../../Components/Button";
import { useAppDispatch } from "../../store/hooks";
import { addProductThunk } from "../../store/productSlice";
const Add_Product = () => {
  const [pics, setPics] = useState<File[]>([]); // Changed to an array of files
  const [features, setFeatures] = useState({
    swimmingPool: false,
    parking: false,
    wifi: false,
    security: false,
    kitchen: false,
    bbqArea: false,
    airConditioning: false,
  });
  // const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const handleFeatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFeatures((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // const selectedFeatures = Object.entries(features)
  //   .filter(([_, value]) => value)
  //   .map(([key]) => key);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      if (selectedFiles.length > 8) {
        alert("You can only upload a maximum of 8 files.");
        return;
      }
      setPics(selectedFiles);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset features
    setFeatures({
      swimmingPool: false,
      parking: false,
      wifi: false,
      security: false,
      kitchen: false,
      bbqArea: false,
      airConditioning: false,
    });

    if (pics.length > 0) {
      const target = e.target as HTMLFormElement;

      const formData = new FormData();
      const VenuName = (
        target.elements.namedItem("name") as HTMLInputElement
      )?.value.trim();
      formData.append("VenuName", VenuName);
      const description = (
        target.elements.namedItem("description") as HTMLInputElement
      )?.value.trim();
      formData.append("description", description);
      const location = (
        target.elements.namedItem("location") as HTMLInputElement
      )?.value.trim();
      formData.append("location", location);
      const price = (
        target.elements.namedItem("price") as HTMLInputElement
      )?.value.trim();
      formData.append("price", price);
      const type = (
        target.elements.namedItem("type") as HTMLSelectElement
      )?.value.trim();
      formData.append("type", type);
      const standingCapacity = (
        target.elements.namedItem("standingCapacity") as HTMLInputElement
      )?.value.trim();
      formData.append("standingCapacity", standingCapacity);
      const seatedCapacity = (
        target.elements.namedItem("seatedCapacity") as HTMLInputElement
      )?.value.trim();
      formData.append("seatedCapacity", seatedCapacity);
      const size = (
        target.elements.namedItem("size") as HTMLInputElement
      )?.value.trim();
      formData.append("size", size);
      formData.append("features", JSON.stringify(features)); // stringified object

      pics.forEach((file) => {
        formData.append("pics", file); // multiple files
      });

      try {
        // Append pictures to formData

        // Dispatch with all required properties
        await dispatch(addProductThunk(formData))
          .unwrap()
          .then(() => {
            toast.success("Product Added Successfully");
            target.reset();
          })
          .catch((err) => {
            toast.error("Something went wrong");
            console.log(err);
          });
      } catch (error: any) {
        toast.error(error.message || "Something went wrong");
      }
    }
  };
  const handleRemoveImage = (index: number) => {
    const updatedPics = pics.filter((_, i) => i !== index);
    setPics(updatedPics);
  };

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Product</h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Product Name"
                  id="name"
                  name="name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Product Description
                </label>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Product Description"
                  id="description"
                  name="description"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Product Address
                </label>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Product Address"
                  id="location"
                  name="location"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Product Price
                </label>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Product Price"
                  id="price"
                  name="price"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Product Type
                </label>

                <select
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
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
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Product Pictures (Max: 8)
                </label>
                <input
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  accept="image/*"
                  required
                />
                {pics.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-3">
                    {" "}
                    {/* Flexbox for row layout */}
                    {pics.map((file, index) => (
                      <div
                        key={index}
                        className="relative w-24 h-24 rounded-md overflow-hidden" // Container for image and cross button
                      >
                        {/* Image */}
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Selected ${index + 1}`}
                          className="w-full h-full object-cover cursor-pointer"
                        />
                        {/* Cross Button */}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-1 right-1  rounded-full p-1 text-red-500 hover:text-red-700"
                        >
                          x
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Standing Capacity
                </label>
                <input
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  type="number"
                  name="standingCapacity"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Seated Capacity
                </label>
                <input
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  type="number"
                  name="seatedCapacity"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Size
                </label>
                <input
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  type="number"
                  name="size"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Features
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {/* Swimming Pool */}
                  <div>
                    <div className="flex flex-wrap gap-4">
                      <input
                        type="checkbox"
                        name="swimmingPool"
                        checked={features.swimmingPool}
                        onChange={handleFeatureChange}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-gray-700">
                        Swimming Pool
                      </span>
                    </div>
                  </div>
                  {/* Parking */}
                  <div className="flex flex-wrap gap-4">
                    <input
                      type="checkbox"
                      name="parking"
                      checked={features.parking}
                      onChange={handleFeatureChange}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">Parking</span>
                  </div>

                  {/* WiFi */}
                  <div className="flex flex-wrap gap-4">
                    <input
                      type="checkbox"
                      name="wifi"
                      checked={features.wifi}
                      onChange={handleFeatureChange}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">WiFi</span>
                  </div>

                  {/* Security */}
                  <div className="flex flex-wrap gap-4">
                    <input
                      type="checkbox"
                      name="security"
                      checked={features.security}
                      onChange={handleFeatureChange}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">Security</span>
                  </div>

                  {/* Kitchen */}
                  <div className="flex flex-wrap gap-4">
                    <input
                      type="checkbox"
                      name="kitchen"
                      checked={features.kitchen}
                      onChange={handleFeatureChange}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">Kitchen</span>
                  </div>

                  {/* BBQ Area */}
                  <div className="flex flex-wrap gap-4">
                    <input
                      type="checkbox"
                      name="bbqArea"
                      checked={features.bbqArea}
                      onChange={handleFeatureChange}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">BBQ Area</span>
                  </div>

                  {/* Air Conditioning */}
                  <div className="flex flex-wrap gap-4">
                    <input
                      type="checkbox"
                      name="airConditioning"
                      checked={features.airConditioning}
                      onChange={handleFeatureChange}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">
                      Air Conditioning
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <CustomButton type="submit">Add Product</CustomButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add_Product;
