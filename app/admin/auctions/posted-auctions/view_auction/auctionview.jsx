"use client";
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/app/components/LoadingSpinner";
import toast, { Toaster } from "react-hot-toast";
import { useLanguage } from "../../../../components/LanguageContext";
import { translations } from "../../../../translations/posted_auction_translation";
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
  const [bid_end_date, setBidEndDate] = useState(null);
  const [existingFiles, setExistingFiles] = useState([]); // Fetched from backend
  const [deletedFileIds, setDeletedFileIds] = useState([]);

  const { language } = useLanguage();
  const t = translations[language];
  const alignment = language === "ar" ? "text-right" : "text-left";
  const isRTL = language === "ar";
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
    <div className={`p-6 max-w-6xl mx-auto ${alignment}`}>
      <Loading isLoading={loading} />
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-2xl font-bold text-orange-400 text-center mb-4">
        {t.auctionInformation}
      </h1>
      {/* TENDER INFO CARD */}
      <div className="flex items-start justify-between bg-gray-100 p-4  rounded-md mb-6">
        <div>
          <h2 className="text-xl font-bold">
            <span>{t.auctionId}: </span>
            {tender?.auction_id}
          </h2>
          <p className="text-gray-700 py-2 ">
            {" "}
            <span>{t.auctionTitle}: </span> {tender?.title}
          </p>
          <p className=" py-2v font-semibold text-orange-700 ">
            {" "}
            <span className=" text-gray-700">{t.auctionType}: </span>{" "}
            {tender?.auction_type}
          </p>
          <p className="text-gray-700 py-2 ">
            {" "}
            <span>{t.auctionDescription}: </span>
            {tender?.description}
          </p>
          <p className="text-sm font-semibold text-gray-500 mt-1">
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
            isRTL ? "flex-row-reverse" : ""
          }`}
          dir={isRTL ? "rtl" : "ltr"}
        >
          <Dialog.Panel
            className={`bg-white rounded max-w-md w-full max-h-[90vh] overflow-y-auto p-6 shadow-xl ${
              isRTL ? "text-right rtl" : "text-left"
            }`}
          >
            <Dialog.Title
              dir={isRTL ? "rtl" : "ltr"}
              className={`text-lg font-bold mb-4 `}
            >
              {t.editTender}
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
                  {t.editAdditionalDocs}
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
                      {t.previouslyUploaded}
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
        <p className="text-gray-500 p-6 mt-10">{t.noBid}</p>
      ) : (
        <>
          <h2 className="text-xl font-semibold mt-10 mb-2">{t.tenderQuotes}</h2>
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border text-center">{t.no}</th>
                <th className="p-2 border text-center">{t.companyName}</th>
                <th className="p-2 border text-center">{t.profile}</th>
                <th className="p-2 border text-center">{t.bidOffer}</th>
                <th className="p-2 border text-center">{t.downloadOffer}</th>
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
                      {t.profile}
                    </div>
                  </td>
                  <td className="p-2 border">
                    {comp.bid_amount} {t.currency}
                  </td>

                  <td className="p-2 border">
                    <a
                      href={`https://mazadoman.com/backend/${comp.commercial_offer}`}
                      className="text-red-600 underline"
                      download
                    >
                      {t.downloadOffer}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Modal */}
      {/* ADD BID DETAILS BUTTON */}
      <div
        className={`mt-10 flex ${
          isArabic ? "flex-row-reverse" : "flex-row"
        } justify-center`}
        dir={isArabic ? "rtl" : "ltr"}
      >
        <button
          onClick={() => {
            router.push(
              `/admin/promotion_page?id=${encodeURIComponent(
                tender?.auction_id
              )}&type=${encodeURIComponent(tender.auction_type)}`
            );
          }}
          className={`bg-fuchsia-500 cursor-pointer ${
            isArabic ? "mr-4" : "ml-4"
          } text-white px-6 py-3 rounded shadow-lg hover:bg-fuchsia-600 min-w-[150px] text-center`}
        >
          {t.promote_auction}
        </button>
      </div>
    </div>
  );
}
