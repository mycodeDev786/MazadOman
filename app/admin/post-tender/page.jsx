"use client";

import { useState, useEffect, useRef } from "react";
import categories from "@/app/constants/categories";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import Loading from "@/app/components/LoadingSpinner";
import Select from "react-select";
import { useLanguage } from "../../components/LanguageContext";
import { translations } from "../../translations/translation";
import Script from "next/script";
import { useRouter } from "next/navigation";

export default function TenderPostPage() {
  const [tenderName, setTenderName] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [bidStartDate, setBidStartDate] = useState("");
  const [bidEndDate, setBidEndDate] = useState("");
  const [status, setStatus] = useState("under review");
  const [category, setCategory] = useState("");
  const paymentSavedRef = useRef(false);
  const [subcategory, setSubcategory] = useState("");
  const [image, setImage] = useState(null);
  const [scope, setScope] = useState(null);
  const [boq, setBoq] = useState(null);
  const [additionalFiles, setAdditionalFiles] = useState([]);
  const [free_tenders_used, setFreeTendersUsed] = useState(null);

  const [awardedToUserId, setAwardedToUserId] = useState("");
  const user = useSelector((state) => state.session.user);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language];
  const isRTL = language === "ar";

  // Convert categories and subcategories into react-select format
  const categoryOptions = categories.map((cat) => ({
    value: cat.id,
    label: cat.title[language],
  }));

  const selectedCategory = categories.find((cat) => cat.id === category);
  const subcategoryOptions = selectedCategory
    ? selectedCategory.subcategories.map((sub) => ({
        value: sub.id,
        label: sub.title[language],
      }))
    : [];

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // convert FileList to array
    setAdditionalFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://mazadoman.com/backend/api/companyuser/free-tenders-used",
          {
            headers: {
              Authorization: `Bearer ${user.api_token}`,
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setFreeTendersUsed(result.free_tenders_used);
      } catch (err) {
        //setError(err.message);
      }
    };

    if (user.api_token) {
      fetchData();
    } else {
    }
  }, [user?.api_token]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.thawani.om/widget/script.js"; // Load Thawani widget.
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script); // Cleanup
    };
  }, []);

  const savePaymentData = async (formData, transactionId) => {
    try {
      const response = await fetch(
        "https://mazadoman.com/backend/api/payments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.api_token}`,
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Payment Saved");
        savedata();
      } else {
        //setMessage(`❌ Error: ${data.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error(error);
      // setMessage("❌ Network error or server unreachable.");
    }
  };

  const savedata = async () => {
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
          headers: {
            Authorization: `Bearer ${user?.api_token}`, // <- Add this line
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(t.success);
        router.push(
          `/admin/promotion_page?id=${encodeURIComponent(
            data?.tender.tender_id
          )}&type=${encodeURIComponent("Tender")}`
        );
        // Clear form or redirect here
      } else {
        const firstError =
          data && typeof data === "object" ? Object.values(data)[0][0] : null;
        toast.error(firstError || t.error);
      }
    } catch (error) {
      console.error(error);
      toast.error(t.genericError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (free_tenders_used > 10) {
      console.log(free_tenders_used);
      // Do something for reverse auction if user has used free auctions
      if (typeof window === "undefined" || !window.SmartBox?.Checkout) {
        console.error("SmartBox is not loaded yet");
        return;
      }

      setIsLoading(true);
      const trxDateTime = new Date().toISOString();
      try {
        // Fetch secure hash from your backend API
        const response = await fetch(
          "https://mazadoman.com/backend/api/generate-secure-hash",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              MerchantId: process.env.NEXT_PUBLIC_MID, // string, e.g. "197556"
              TerminalId: process.env.NEXT_PUBLIC_TID, // string, e.g. "567396"
              Amount: "10", // string, NOT number
              MerchantReference: "1", // string
              RequestDateTime: trxDateTime, // ISO string is okay
              CurrencyId: "512", // string, NOT number
              SessionToken: "",
            }),
          }
        );

        const data = await response.json();
        console.log(data);

        if (!response.ok || !data.SecureHash) {
          throw new Error("Failed to get secure hash");
        }

        window.SmartBox.Checkout.configure = {
          MID: process.env.NEXT_PUBLIC_MID,
          TID: process.env.NEXT_PUBLIC_TID,
          CurrencyId: "512",
          AmountTrxn: "10",
          MerchantReference: "1",
          LanguageId: language === "ar" ? "ar" : "en",
          PaymentViewType: 1,
          TrxDateTime: trxDateTime,
          SecureHash: data.SecureHash, // <-- Use exact case here
          completeCallback: (data) => {
            console.log("Payment completed", data);

            if (paymentSavedRef.current) {
              console.log("Payment already saved, skipping...");
              return;
            }

            const transactionId =
              data?.data?.data?.hostResponseData?.transactionId;

            if (!transactionId) {
              console.error("No transaction ID found in payment response.");
              return;
            }

            const paymentData = {
              user_id: user?.id,
              amount: 10.0,
              currency: "OMR",
              payment_method: "Amwal Pay",
              payment_type: "tender",
              status: "completed",
              description: "Tender created",
              payment_reference: transactionId,
            };

            savePaymentData(paymentData, transactionId);
            paymentSavedRef.current = true; // Ensure it's only saved once
          },

          errorCallback: (data) => console.log("Payment error", data),
          cancelCallback: () => console.log("Payment cancelled"),
        };

        window.SmartBox.Checkout.showSmartBox();
      } catch (error) {
        console.error("Error during payment initialization", error);
      } finally {
        //setIsLoading(false);
      }
    } else {
      savedata();
    }
  };

  return (
    <>
      <Script
        src="https://checkout.amwalpg.com/js/SmartBox.js?v=1.1"
        strategy="afterInteractive"
        onLoad={() => console.log("SmartBox.js loaded")}
      />

      <div
        className={`max-w-4xl mx-auto p-6 ${
          isRTL ? "text-right rtl" : "text-left ltr"
        }`}
      >
        <Toaster position="top-center" reverseOrder={false} />
        <Loading isLoading={isLoading} />
        <h1 className="text-3xl text-center text-orange-400 font-semibold mb-6">
          {t.postTender}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tender Name */}
          <div>
            <label
              htmlFor="tenderName"
              className="block text-lg font-medium mb-2"
            >
              {t.tenderTitle}
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
              {t.description}
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
            <label
              htmlFor="category"
              className="block text-lg font-medium mb-2"
            >
              {t.selectCategory}
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
              placeholder={language === "en" ? "Select a category" : "اختر فئة"}
              className="react-select-container"
              classNamePrefix="react-select"
              isRtl={isRTL}
            />
          </div>

          {/* Subcategory Selection */}
          {category && (
            <div className="mb-6">
              <label
                htmlFor="subcategory"
                className="block text-lg font-medium mb-2"
              >
                {t.selectSubcategory}
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
                placeholder={
                  language === "en" ? "Select a subcategory" : "اختر فئة فرعية"
                }
                className="react-select-container"
                classNamePrefix="react-select"
                isRtl={isRTL}
              />
            </div>
          )}
          {/* Budget */}
          <div>
            <label htmlFor="budget" className="block text-lg font-medium mb-2">
              {t.budget}
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
              {t.bidStartDate}
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
              {t.bidEndDate}
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
          <div className={`${isRTL ? "rtl" : ""}`}>
            <label className="text-lg font-medium text-gray-700 block mb-1">
              {t.uploadImage || "Upload Image"}
            </label>
            <div
              className={`relative w-full mt-1 border border-gray-300 rounded-lg ${
                isRTL ? "text-right" : "text-left"
              }`}
              style={{ height: "3rem" }}
            >
              <span
                className={`absolute top-1/2 ${
                  isRTL ? "right-3" : "left-3"
                } transform -translate-y-1/2 text-gray-500 text-sm`}
                style={{ pointerEvents: "none" }}
              >
                {image ? image.name : t.noFileChosen || "No file chosen"}
              </span>
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => setImage(e.target.files[0])}
                className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
                style={{ direction: isRTL ? "rtl" : "ltr" }}
              />
            </div>
          </div>

          {/* Tender Scope */}
          <div className={`${isRTL ? "rtl" : ""}`}>
            <label className="text-lg font-medium text-gray-700 block mb-1">
              {t.uploadScope || "Upload Scope of Work"}
            </label>
            <div
              className={`relative w-full mt-1 border border-gray-300 rounded-lg ${
                isRTL ? "text-right" : "text-left"
              }`}
              style={{ height: "3rem" }}
            >
              <span
                className={`absolute top-1/2 ${
                  isRTL ? "right-3" : "left-3"
                } transform -translate-y-1/2 text-gray-500 text-sm`}
                style={{ pointerEvents: "none" }}
              >
                {scope ? scope.name : t.noFileChosen || "No file chosen"}
              </span>
              <input
                type="file"
                accept=".pdf, .doc, .docx"
                onChange={(e) => setScope(e.target.files[0])}
                className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
                style={{ direction: isRTL ? "rtl" : "ltr" }}
              />
            </div>
          </div>

          {/* Tender BOQ */}
          <div className={`${isRTL ? "rtl" : ""}`}>
            <label className="text-lg font-medium text-gray-700 block mb-1">
              {t.uploadBOQ || "Upload the BOQ"}
            </label>
            <div
              className={`relative w-full mt-1 border border-gray-300 rounded-lg ${
                isRTL ? "text-right" : "text-left"
              }`}
              style={{ height: "3rem" }}
            >
              <span
                className={`absolute top-1/2 ${
                  isRTL ? "right-3" : "left-3"
                } transform -translate-y-1/2 text-gray-500 text-sm`}
                style={{ pointerEvents: "none" }}
              >
                {boq ? boq.name : t.noFileChosen || "No file chosen"}
              </span>
              <input
                type="file"
                accept=".pdf, .xls, .xlsx"
                onChange={(e) => setBoq(e.target.files[0])}
                className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
                style={{ direction: isRTL ? "rtl" : "ltr" }}
              />
            </div>
          </div>

          {/* Tender additional */}
          <div className={`${isRTL ? "rtl" : ""}`}>
            <label className="text-lg font-medium text-gray-700 block mb-1">
              {t.uploadAdditional || "Upload additional documents"}
            </label>
            <div
              className={`relative w-full mt-1 border border-gray-300 rounded-lg ${
                isRTL ? "text-right" : "text-left"
              }`}
              style={{ minHeight: "3rem" }}
            >
              <input
                type="file"
                id="additional_documents"
                multiple
                onChange={handleFileChange}
                accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
                className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
                style={{ direction: isRTL ? "rtl" : "ltr" }}
              />
              <div className="px-3 py-2 text-sm text-gray-500">
                {additionalFiles.length > 0
                  ? additionalFiles.map((file, index) => (
                      <div key={index} className="flex items-center space-x-1">
                        <span>📄</span>
                        <span>{file.name}</span>
                      </div>
                    ))
                  : t.noFileChosen || "No file chosen"}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full sm:w-auto bg-orange-400 text-white py-2 px-6 rounded-lg hover:bg-orange-500"
            >
              {t.submit}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
