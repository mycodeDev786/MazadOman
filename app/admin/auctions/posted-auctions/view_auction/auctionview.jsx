"use client";
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/app/components/LoadingSpinner";
import toast, { Toaster } from "react-hot-toast";

export default function TenderPage() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [quotes, setQuotes] = useState([]);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [tender, setTender] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bid_start_date, setBidStartDate] = useState(null);
  const [bid_start_time, setBidStartTime] = useState(null);
  const [bid_end_time, setBidEndTime] = useState(null);
  const [bidding_price, setBiddingPrice] = useState(null);
  const [bid_countDown_time, SetBidCountDownTime] = useState(null);
  const [quote_status, setQuoteStatus] = useState(null);
  const [editTender, setEditTender] = useState(tender);
  const [scope, setScope] = useState(null);
  const [boq, setBoq] = useState(null);
  const [bid_end_date, setBidEndDate] = useState(null);
  const [existingFiles, setExistingFiles] = useState([]); // Fetched from backend
  const [deletedFileIds, setDeletedFileIds] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [additionalFiles, setAdditionalFiles] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // convert FileList to array
    setAdditionalFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleRemoveExistingFile = (fileId) => {
    setExistingFiles((prev) => prev.filter((file) => file.id !== fileId));
    setDeletedFileIds((prev) => [...prev, fileId]);
  };

  const [selectedBidders, setSelectedBidders] = useState([]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(selectedBidders);
    const formDataToSend = new FormData();
    formDataToSend.append("tender_id", tender.tender_id); // Send tender ID
    formDataToSend.append("bidding_price", bidding_price);
    selectedBidders.forEach((uuid) => {
      formDataToSend.append("bidders[]", uuid);
    });

    formDataToSend.append("bid_start_date", bid_start_date);
    formDataToSend.append("bid_start_time", bid_start_time);
    formDataToSend.append("bid_end_time", bid_end_time);
    formDataToSend.append("countdown_time", bid_countDown_time);

    try {
      const response = await fetch("https://mazadoman.com/backend/api/bids", {
        method: "POST",
        body: formDataToSend,
        // No headers for FormData!
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit bid.");
      }

      toast.success("Bid submitted successfully!");
      setLoading(false);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Bid submission error:", error.message);
      toast.error("Error submitting bid: " + error.message);
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    const fetchTenderInformation = async () => {
      try {
        const response = await fetch(
          `https://mazadoman.com/backend/api/auction/${id}`
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Failed to fetch tender count");
        }

        const data = await response.json();

        setTender(data);

        setExistingFiles(data.additional_files);
        setBidEndDate(data.bid_end_date);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    const fetchQuotes = async () => {
      try {
        const response = await fetch(
          `https://mazadoman.com/backend/api/auction/bids/${id}`
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Failed to fetch tender count");
        }

        const data = await response.json();

        setQuotes(data.bids);
        console.log(data);
        setBidEndDate(data.bids.bid_end_date);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuotes();
    fetchTenderInformation();
  }, [id]);

  // Add or remove `overflow-hidden` class from the body based on modal state
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isModalOpen]);

  const openModal = () => {
    setEditTender(tender); // load current data into form
    setIsOpen(true);
  };

  const submitEdit = async () => {
    setLoading(true);
    const formData = new FormData();

    // Append only non-empty values
    console.log(editTender.title);
    if (editTender.title) formData.append("title", editTender.title);

    if (editTender.description)
      formData.append("description", editTender.description);
    if (editTender.bid_end_date) formData.append("bid_end_date", bid_end_date);

    additionalFiles.forEach((file, index) => {
      formData.append(`additional_files[${index}]`, file);
    });

    try {
      const res = await fetch(
        `https://mazadoman.com/backend/api/auctions/update/${editTender.auction_id}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await res.json();

      if (res.ok) {
        setLoading(false);
        setIsOpen(false);
        toast.success("Auction updated successfully ");
        // Optionally refresh or update UI
      } else {
        console.error(result);
      }
    } catch (err) {
      setLoading(false);
      console.error("Error:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditTender((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Loading isLoading={loading} />
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-2xl font-bold text-center mb-4">
        Auction Information
      </h1>
      {/* TENDER INFO CARD */}
      <div className="flex items-start justify-between bg-gray-100 p-4  rounded-md mb-6">
        <div>
          <h2 className="text-xl font-bold">
            <span>Auction Id: </span>
            {tender?.auction_id}
          </h2>
          <p className="text-gray-700 py-2 ">
            {" "}
            <span>Auction Title: </span> {tender?.title}
          </p>
          <p className=" py-2v font-semibold text-orange-700 ">
            {" "}
            <span className=" text-gray-700">Auction Type: </span>{" "}
            {tender?.auction_type}
          </p>
          <p className="text-gray-700 py-2 ">
            {" "}
            <span>Auction Description: </span>
            {tender?.description}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            <span className="font-bold text-amber-700">Deadline: </span>{" "}
            {tender?.bid_end_date}
          </p>
        </div>
        <button
          onClick={openModal}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Edit
        </button>
      </div>

      {/* MODAL */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <Loading isLoading={loading} />
        <div className="fixed inset-0 bg-black/30 " aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded max-w-md w-full max-h-[90vh] overflow-y-auto p-6 shadow-xl">
            <Dialog.Title className="text-lg font-bold mb-4">
              Edit Tender Info
            </Dialog.Title>
            <div className="space-y-4">
              <div>
                <label className="block font-medium">Title</label>
                <input
                  name="title"
                  value={editTender?.title}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block font-medium">Description</label>
                <textarea
                  name="description"
                  value={editTender?.description}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block font-medium">Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  value={bid_end_date}
                  onChange={(e) => setBidEndDate(e.target.value)}
                  className="w-full border p-2 rounded"
                />
              </div>

              {/* Tender additional */}
              <div>
                <label
                  htmlFor="additional_documents"
                  className="block font-medium  mb-2"
                >
                  Edit additional documents:
                </label>

                <input
                  type="file"
                  id="additional_documents"
                  multiple
                  onChange={handleFileChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />

                {existingFiles?.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-semibold mb-1">
                      Previously uploaded:
                    </p>
                    <ul className="space-y-1 text-sm text-gray-700">
                      {existingFiles.map((file) => (
                        <li
                          key={file.id}
                          className="flex items-center justify-between"
                        >
                          <span>📎 {file.file_path.split("/").pop()}</span>
                          <button
                            onClick={() => handleRemoveExistingFile(file.id)}
                            className="text-red-600 hover:underline text-xs"
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={submitEdit}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {quotes.length === 0 ? (
        <p className="text-gray-500 p-6 mt-10">No one Place Bid yet.</p>
      ) : (
        <>
          <h2 className="text-xl font-semibold mt-10 mb-2">Tender Quotes</h2>
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border"> No</th>
                <th className="p-2 border">Company Name</th>
                <th className="p-2 border">Profile</th>
                <th className="p-2 border">Bid Offer</th>

                <th className="p-2 border">Download Offer</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((comp, index) => (
                <tr key={comp.bid_id} className="text-center">
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{comp.company_name}</td>
                  <td className="p-2 border">
                    <div
                      onClick={() => {
                        router.push(
                          `/admin/view_company_profile?id=${encodeURIComponent(
                            comp?.user_id
                          )}`
                        );
                      }}
                      className="text-blue-600 cursor-pointer underline"
                    >
                      Profile
                    </div>
                  </td>
                  <td className="p-2 border">{comp.bid_amount} OMR</td>

                  <td className="p-2 border">
                    <a
                      href={`https://mazadoman.com/backend/${comp.commercial_offer}`}
                      className="text-red-600 underline"
                      download
                    >
                      Download
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg overflow-auto max-h-screen">
            <h2 className="text-xl font-bold mb-4">Add Bid Details</h2>
            <form className="space-y-4">
              {/* Tender Field */}
              <div>
                <label className="block font-medium mb-1">
                  Selected Tender:
                </label>
                <input
                  type="text"
                  name="tender"
                  value={tender?.tender_id + tender.title}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter tender name"
                />
              </div>

              {/* Bidders Field */}
              <div>
                <label className="block font-medium mb-1">
                  Selected Bidders (IDs):
                </label>
                <input
                  type="text"
                  name="bidders"
                  value={selectedBidders.join(", ")}
                  readOnly
                  className="w-full border border-gray-300 p-2 rounded bg-gray-100"
                />
              </div>

              {/* Bidding Price */}
              <div>
                <label className="block font-medium mb-1">
                  Bidding Price Starting:
                </label>
                <input
                  type="number"
                  name="biddingPrice"
                  value={bidding_price}
                  onChange={(e) => setBiddingPrice(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter starting price"
                />
              </div>

              {/* Date Field */}
              <div>
                <label className="block font-medium mb-1">Date:</label>
                <input
                  type="date"
                  name="date"
                  value={bid_start_date}
                  onChange={(e) => setBidStartDate(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Start Time */}
              <div>
                <label className="block font-medium mb-1">
                  Bidding Time Start:
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={bid_start_time}
                  onChange={(e) => setBidStartTime(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* End Time */}
              <div>
                <label className="block font-medium mb-1">
                  Bidding Time End:
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={bid_end_time}
                  onChange={(e) => setBidEndTime(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Countdown Time */}
              <div>
                <label className="block font-medium mb-1">
                  Bidding Countdown Time (max 10 mins):
                </label>
                <input
                  type="number"
                  name="countdownTime"
                  value={bid_countDown_time}
                  onChange={(e) => SetBidCountDownTime(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Maximum 10 mins"
                  min="1"
                  max="10"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
