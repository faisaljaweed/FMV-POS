import { useState } from "react";
import Input from "../../Components/Input";
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Add Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Product Name
              </label>
              <Input
                type="text"
                placeholder="Product Name"
                id="name"
                name="name"
                required
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Product Description
              </label>
              <Input
                type="text"
                placeholder="Product Description"
                id="description"
                name="description"
                required
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Product Address
              </label>
              <Input
                type="text"
                placeholder="Product Address"
                id="location"
                name="location"
                required
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Product Price
              </label>
              <Input
                type="text"
                placeholder="Product Price"
                id="price"
                name="price"
                required
              />
            </div>

            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700"
              >
                Product Type
              </label>

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
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload Product Pictures (Max: 8)
              </label>
              <input
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
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
              <label className="block text-sm font-medium text-gray-700">
                Standing Capacity
              </label>
              <input
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                type="number"
                name="standingCapacity"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Seated Capacity
              </label>
              <input
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                type="number"
                name="seatedCapacity"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Size
              </label>
              <input
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                type="number"
                name="size"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Features
              </label>
              <div className="grid grid-cols-2 gap-3">
                {/* Swimming Pool */}
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="swimmingPool"
                    checked={features.swimmingPool}
                    onChange={handleFeatureChange}
                    className="form-checkbox h-4 w-4 text-green-600"
                  />
                  <span className="text-sm">Swimming Pool</span>
                </label>

                {/* Parking */}
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="parking"
                    checked={features.parking}
                    onChange={handleFeatureChange}
                    className="form-checkbox h-4 w-4 text-green-600"
                  />
                  <span className="text-sm">Parking</span>
                </label>

                {/* WiFi */}
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="wifi"
                    checked={features.wifi}
                    onChange={handleFeatureChange}
                    className="form-checkbox h-4 w-4 text-green-600"
                  />
                  <span className="text-sm">WiFi</span>
                </label>

                {/* Security */}
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="security"
                    checked={features.security}
                    onChange={handleFeatureChange}
                    className="form-checkbox h-4 w-4 text-green-600"
                  />
                  <span className="text-sm">Security</span>
                </label>

                {/* Kitchen */}
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="kitchen"
                    checked={features.kitchen}
                    onChange={handleFeatureChange}
                    className="form-checkbox h-4 w-4 text-green-600"
                  />
                  <span className="text-sm">Kitchen</span>
                </label>

                {/* BBQ Area */}
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="bbqArea"
                    checked={features.bbqArea}
                    onChange={handleFeatureChange}
                    className="form-checkbox h-4 w-4 text-green-600"
                  />
                  <span className="text-sm">BBQ Area</span>
                </label>

                {/* Air Conditioning */}
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="airConditioning"
                    checked={features.airConditioning}
                    onChange={handleFeatureChange}
                    className="form-checkbox h-4 w-4 text-green-600"
                  />
                  <span className="text-sm">Air Conditioning</span>
                </label>
              </div>
            </div>
          </div>

          <CustomButton type="submit">Add Product</CustomButton>
        </form>
      </div>
    </div>
  );
};

export default Add_Product;
