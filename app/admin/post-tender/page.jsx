"use client";

import { useState } from "react";
import categories from "@/app/constants/categories";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import Loading from "@/app/components/LoadingSpinner";
import Select from "react-select";

export default function TenderPostPage() {
  const [tenderName, setTenderName] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [bidStartDate, setBidStartDate] = useState("");
  const [bidEndDate, setBidEndDate] = useState("");
  const [status, setStatus] = useState("under review");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [image, setImage] = useState(null);
  const [scope, setScope] = useState(null);
  const [boq, setBoq] = useState(null);
  const [additionalFiles, setAdditionalFiles] = useState([]);

  const [awardedToUserId, setAwardedToUserId] = useState("");
  const user = useSelector((state) => state.session.user);
  const [isLoading, setIsLoading] = useState(false);

  // Convert categories and subcategories into react-select format
  const categoryOptions = categories.map((cat) => ({
    value: cat.id,
    label: cat.title,
  }));

  const selectedCategory = categories.find((cat) => cat.id === category);
  const subcategoryOptions = selectedCategory
    ? selectedCategory.subcategories.map((sub) => ({
        value: sub.id,
        label: sub.title,
      }))
    : [];

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // convert FileList to array
    setAdditionalFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("user_id", user?.id);
    formData.append("title", tenderName);
    formData.append("category", category);
    formData.append("subcategory", subcategory);
    formData.append("description", description);
    formData.append("budget", budget);
    formData.append("bid_start_date", bidStartDate);
    formData.append("bid_end_date", bidEndDate);

    if (image) {
      formData.append("image", image);
    }

    if (scope) {
      formData.append("scope", scope);
    }

    if (boq) {
      formData.append("boq", boq);
    }

    // Append multiple additional files
    if (additionalFiles && additionalFiles.length > 0) {
      additionalFiles.forEach((file) => {
        formData.append("additional_files[]", file);
      });
    }

    try {
      const response = await fetch(
        "https://mazadoman.com/backend/api/tenders/post",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Tender created successfully!");
        // Clear form or redirect here
      } else {
        const firstError =
          data && typeof data === "object" ? Object.values(data)[0][0] : null;
        toast.error(firstError || "Tender registration failed!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Toaster position="top-center" reverseOrder={false} />
      <Loading isLoading={isLoading} />
      <h1 className="text-3xl text-center text-orange-400 font-semibold mb-6">
        Post Tender
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tender Name */}
        <div>
          <label
            htmlFor="tenderName"
            className="block text-lg font-medium mb-2"
          >
            Tender title:
          </label>
          <input
            type="text"
            id="tenderName"
            value={tenderName}
            onChange={(e) => setTenderName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>
        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-lg font-medium mb-2"
          >
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            rows="5"
            required
          ></textarea>
        </div>

        {/* Category Selection */}
        <div className="mb-6">
          <label htmlFor="category" className="block text-lg font-medium mb-2">
            Select Category:
          </label>
          <Select
            inputId="category"
            options={categoryOptions}
            value={
              categoryOptions.find((opt) => opt.value === category) || null
            }
            onChange={(selectedOption) => {
              const selected = selectedOption?.value || "";
              setCategory(selected);
              setSubcategory(""); // reset subcategory
              console.log("Category selected:", selected);
            }}
            placeholder="Select a category"
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>

        {/* Subcategory Selection */}
        {category && (
          <div className="mb-6">
            <label
              htmlFor="subcategory"
              className="block text-lg font-medium mb-2"
            >
              Select Subcategory:
            </label>
            <Select
              inputId="subcategory"
              options={subcategoryOptions}
              value={
                subcategoryOptions.find((opt) => opt.value === subcategory) ||
                null
              }
              onChange={(selectedOption) => {
                const selected = selectedOption?.value || "";
                setSubcategory(selected);
                console.log("Subcategory selected:", selected);
              }}
              placeholder="Select a subcategory"
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>
        )}
        {/* Budget */}
        <div>
          <label htmlFor="budget" className="block text-lg font-medium mb-2">
            Budget:
          </label>
          <input
            type="number"
            id="budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* Bid Start Date */}
        <div>
          <label
            htmlFor="bidStartDate"
            className="block text-lg font-medium mb-2"
          >
            Bid Start Date:
          </label>
          <input
            type="date"
            id="bidStartDate"
            value={bidStartDate}
            onChange={(e) => setBidStartDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* Bid End Date */}
        <div>
          <label
            htmlFor="bidEndDate"
            className="block text-lg font-medium mb-2"
          >
            Bid End Date:
          </label>
          <input
            type="date"
            id="bidEndDate"
            value={bidEndDate}
            onChange={(e) => setBidEndDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* Tender Image */}
        <div>
          <label htmlFor="image" className="block text-lg font-medium mb-2">
            Upload Image:
          </label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Tender Scope */}
        <div>
          <label htmlFor="image" className="block text-lg font-medium mb-2">
            Upload Scope of Work:
          </label>
          <input
            type="file"
            id="scope"
            onChange={(e) => setScope(e.target.files[0])}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>
        {/* Tender BOQ */}
        <div>
          <label htmlFor="image" className="block text-lg font-medium mb-2">
            Upload the BOQ:
          </label>
          <input
            type="file"
            id="boq"
            onChange={(e) => setBoq(e.target.files[0])}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Tender additional */}
        <div>
          <label
            htmlFor="additional_documents"
            className="block text-lg font-medium mb-2"
          >
            Upload additional documents:
          </label>

          <input
            type="file"
            id="additional_documents"
            multiple
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />

          {additionalFiles.length > 0 && (
            <ul className="mt-4 space-y-1 text-sm text-gray-700">
              {additionalFiles.map((file, index) => (
                <li key={index}>📄 {file.name}</li>
              ))}
            </ul>
          )}
        </div>
        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full sm:w-auto bg-orange-400 text-white py-2 px-6 rounded-lg hover:bg-orange-500"
          >
            Submit Tender
          </button>
        </div>
      </form>
    </div>
  );
}
