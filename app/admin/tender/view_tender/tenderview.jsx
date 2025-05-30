"use client";
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/app/components/LoadingSpinner";
import toast, { Toaster } from "react-hot-toast";
import { useLanguage } from "../../../components/LanguageContext";
import { translations } from "../../../translations/translation";
import { formatDateWithLan } from "@/app/utils/formatDate";

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
  const [existingFiles, setExistingFiles] = useState([]); // Fetched from backend
  const [deletedFileIds, setDeletedFileIds] = useState([]);

  const { language } = useLanguage();
  const t = translations[language];
  const isArabic = language === "ar";

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

  const handleUpdateStatus = async (quote_id) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://mazadoman.com/backend/api/quotes/${quote_id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            // Include the token if your API is protected
            // 'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: quote_status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        // Handle errors returned by API
        console.error("Error updating status:", data.message);

        setLoading(false);
      } else {
        toast.success("Status updated successfully");

        // Optionally refresh data here
      }
    } catch (error) {
      console.error("Network or server error:", error);
      toast.error("Failed to update status. Please try again.");
    }
    setLoading(false);
  };

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
          `https://mazadoman.com/backend/api/tenders/${id}`
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Failed to fetch tender count");
        }

        const data = await response.json();

        setTender(data.tender);

        setExistingFiles(data.tender.additional_files);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    const fetchQuotes = async () => {
      try {
        const response = await fetch(
          `https://mazadoman.com/backend/api/quotes/tender/${id}`
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Failed to fetch tender count");
        }

        const data = await response.json();

        setQuotes(data.data);
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
    if (editTender.bid_end_date)
      formData.append("bid_end_date", editTender.bid_end_date);

    if (scope) formData.append("scope", scope);
    if (boq) formData.append("boq", boq);

    additionalFiles.forEach((file, index) => {
      formData.append(`additional_files[${index}]`, file);
    });

    // ✅ Log FormData contents
    console.log("FormData entries:");
    for (let pair of formData.entries()) {
      if (pair[1] instanceof File) {
        console.log(`${pair[0]}: [File] ${pair[1].name}`);
      } else {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
    }

    try {
      const res = await fetch(
        `https://mazadoman.com/backend/api/tenders/update/${editTender.tender_id}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await res.json();

      if (res.ok) {
        setLoading(false);
        setIsOpen(false);
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
    <div dir={isArabic ? "rtl" : "ltr"} className="p-6 max-w-6xl mx-auto">
      <Loading isLoading={loading} />
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-2xl font-bold text-center mb-4">
        {t.tender_information}
      </h1>
      {/* TENDER INFO CARD */}
      <div className="flex items-start justify-between bg-gray-100 p-4  rounded-md mb-6">
        <div>
          <h2 className="text-xl font-bold">
            <span>{t.tender_id}: </span>
            {tender?.tender_id}
          </h2>
          <p className="text-gray-700 py-2 ">
            {" "}
            <span>{t.tender_title}: </span> {tender?.title}
          </p>
          <p className="text-gray-700 py-2 ">
            {" "}
            <span>{t.tender_description}: </span> {tender?.title}{" "}
            {tender?.description}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            <span className="font-bold text-amber-700">{t.deadline}: </span>{" "}
            {formatDateWithLan(tender?.bid_end_date, language)}
          </p>
        </div>
        <button
          onClick={openModal}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {t.edit}
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
        <div
          className={`fixed inset-0 flex items-center justify-center p-4 ${
            isArabic ? "flex-row-reverse" : ""
          }`}
          dir={isArabic ? "rtl" : "ltr"}
        >
          <Dialog.Panel
            className={`bg-white rounded max-w-md w-full max-h-[90vh] overflow-y-auto p-6 shadow-xl ${
              isArabic ? "text-right rtl" : "text-left"
            }`}
          >
            <Dialog.Title className="text-lg font-bold mb-4">
              {t.editTenderInfo}
            </Dialog.Title>
            <div className="space-y-4">
              <div>
                <label className="block font-medium">{t.title}</label>
                <input
                  name="title"
                  value={editTender?.title}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block font-medium">{t.description}</label>
                <textarea
                  name="description"
                  value={editTender?.description}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block font-medium">{t.deadline}</label>
                <input
                  type="date"
                  name="deadline"
                  value={editTender?.bid_end_date}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>

              {/* Tender Scope */}
              <div>
                <label htmlFor="image" className="block font-medium">
                  {t.editScopeOfWork}
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
                <label htmlFor="image" className="block font-medium mb-2">
                  {t.editScopeOfWork}
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
                  className="block font-medium  mb-2"
                >
                  {t.editAdditionalDocuments}
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
                      {t.previouslyUploaded}:
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
                            {t.remove}
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
                  {t.cancel}
                </button>
                <button
                  onClick={submitEdit}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {t.save}
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {quotes.length === 0 ? (
        <p className="text-purple-500 font-semibold text-center p-6 mt-10">
          {t.no_one_quoted}
        </p>
      ) : (
        <>
          <h2 className="text-xl font-semibold mt-10 mb-2">
            {t.tender_quotes}
          </h2>
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">{t.select_company}</th>
                <th className="p-2 border">{t.company_name}</th>
                <th className="p-2 border">{t.profile}</th>
                <th className="p-2 border">{t.total_offer}</th>
                <th className="p-2 border">{t.action}</th>
                <th className="p-2 border">{t.download_technical}</th>
                <th className="p-2 border">{t.download_commercial}</th>
                <th className="p-2 border">{t.update_status}</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((comp) => (
                <tr key={comp.quote_id} className="text-center">
                  <td className="p-2 border">
                    <input
                      type="checkbox"
                      checked={selectedBidders.includes(comp.user_id)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        const id = comp.user_id;
                        setSelectedBidders((prev) =>
                          checked
                            ? [...prev, id]
                            : prev.filter((bidderId) => bidderId !== id)
                        );
                      }}
                    />
                  </td>
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
                      {t.profile}
                    </div>
                  </td>
                  <td className="p-2 border">
                    {comp.quote_amount} {t.currency}
                  </td>
                  <td className="p-2 border">
                    <select
                      value={quote_status}
                      onChange={(e) => setQuoteStatus(e.target.value)}
                      className="border p-1 rounded"
                    >
                      <option value="">{t.select_option}</option>
                      <option value="approve">{t.approve}</option>
                      <option value="reject">{t.reject}</option>
                      <option value="Submit technical offer">
                        {t.submit_technical_offer}
                      </option>
                      <option value="resubmit the commtial offer.">
                        {t.resubmit_commercial_offer}
                      </option>
                      <option value="postpond">{t.postpond}</option>
                      <option value="tender canceled">
                        {t.tender_canceled}
                      </option>
                      <option value="Cancelled">{t.cancelled}</option>
                      <option value="Award the job">{t.award_the_job}</option>
                    </select>
                  </td>
                  <td className="p-2 border">
                    <a
                      href={`https://mazadoman.com/backend/${comp.technical_offer}`}
                      className="text-green-600 underline"
                      download
                    >
                      {t.download}
                    </a>
                  </td>
                  <td className="p-2 border">
                    <a
                      href={`https://mazadoman.com/backend/${comp.commercial_offer}`}
                      className="text-red-600 underline"
                      download
                    >
                      {t.download}
                    </a>
                  </td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleUpdateStatus(comp.quote_id)}
                      className="bg-amber-500 rounded-sm text-white cursor-pointer p-1.5"
                    >
                      {t.update}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {/* ADD BID DETAILS BUTTON */}
      <div
        className={`mt-10 flex ${
          isArabic ? "flex-row-reverse" : "flex-row"
        } justify-center`}
        dir={isArabic ? "rtl" : "ltr"}
      >
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-500 cursor-pointer text-white px-4 py-2 rounded shadow-lg hover:bg-orange-600"
        >
          {t.add_bid_details}
        </button>

        <button
          onClick={() => {
            router.push(
              `/admin/view_result?id=${encodeURIComponent(tender?.tender_id)}`
            );
          }}
          className={`bg-purple-500 cursor-pointer ${
            isArabic ? "mr-4" : "ml-4"
          } text-white px-4 py-2 rounded shadow-lg hover:bg-purple-600`}
        >
          {t.view_bid_result}
        </button>
        <button
          onClick={() => {
            router.push(
              `/admin/promotion_page?id=${encodeURIComponent(
                tender?.tender_id
              )}&type=${encodeURIComponent("Tender")}`
            );
          }}
          className={`bg-fuchsia-500 cursor-pointer ${
            isArabic ? "mr-4" : "ml-4"
          } text-white px-4 py-2 rounded shadow-lg hover:bg-fuchsia-600`}
        >
          {t.promote_tender}
        </button>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg overflow-auto max-h-screen">
            <h2 className="text-xl text-fuchsia-600 font-bold mb-4">
              {t.addBidDetails}
            </h2>
            <form className="space-y-4">
              {/* Tender Field */}
              <div>
                <label className="block font-medium mb-1">
                  {t.selectedTender}
                </label>
                <input
                  type="text"
                  name="tender"
                  value={tender?.tender_id + "," + tender.title}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter tender name"
                />
              </div>

              {/* Bidders Field */}
              <div>
                <label className="block font-medium mb-1">
                  {t.selectedBidders}
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
                  {t.biddingPriceStart}
                </label>
                <input
                  type="number"
                  name="biddingPrice"
                  value={bidding_price}
                  onChange={(e) => setBiddingPrice(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t.enterStartingPrice}
                />
              </div>

              {/* Date Field */}
              <div>
                <label className="block font-medium mb-1">{t.date}</label>
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
                  {t.biddingTimeStart}
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
                  {t.biddingTimeEnd}
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
                  {t.countdownTime}
                </label>
                <input
                  type="number"
                  name="countdownTime"
                  value={bid_countDown_time}
                  onChange={(e) => SetBidCountDownTime(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t.maxTenMins}
                  min="1"
                  max="10"
                />
              </div>

              {/* Action Buttons */}
              <div
                className={`flex ${
                  language === "ar" ? "justify-start" : "justify-end"
                } space-x-2 mt-4`}
              >
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  {t.cancel}
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  {t.submit}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
