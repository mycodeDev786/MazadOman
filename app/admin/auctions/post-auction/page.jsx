"use client";

import { useState, useEffect, useRef } from "react";
import categories from "@/app/constants/categories";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import Loading from "@/app/components/LoadingSpinner";
import Select from "react-select";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../../components/LanguageContext";
import { translations } from "../../../translations/translation";
import Script from "next/script";

export default function TenderPostPage() {
  const [tenderName, setTenderName] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [bidStartDate, setBidStartDate] = useState("");
  const [bidEndDate, setBidEndDate] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [image, setImage] = useState(null);
  const [auctionType, setAuctionType] = useState("");
  const [additionalFiles, setAdditionalFiles] = useState([]);
  const user = useSelector((state) => state.session.user);
  const [free_auctions_used, setFreeAuctionsUsed] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const paymentSavedRef = useRef(false);
  //
  const { language } = useLanguage();
  const t = translations[language];

  // Convert categories and subcategories into react-select format
  const categoryOptions = categories.map((cat) => ({
    value: cat.id,
    label: cat.title[language],
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://mazadoman.com/backend/api/companyuser/free-auctions-used",
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
        setFreeAuctionsUsed(result.free_auctions_used);
      } catch (err) {
        //setError(err.message);
      }
    };

    if (user.api_token) {
      fetchData();
    } else {
    }
  }, [user.api_token]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.thawani.om/widget/script.js"; // Load Thawani widget.
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script); // Cleanup
    };
  }, []);

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

  const savedata = async (payment_status) => {
    const formData = new FormData();
    formData.append("user_id", user?.id);
    formData.append("title", tenderName);
    formData.append("category", category);
    formData.append("subcategory", subcategory);
    formData.append("description", description);
    formData.append("budget", budget);
    formData.append("bid_start_date", bidStartDate);
    formData.append("bid_end_date", bidEndDate);
    formData.append("auction_type", auctionType);
    formData.append("payment_status", payment_status);

    if (image) {
      formData.append("image", image);
    }

    // Append multiple additional files
    if (additionalFiles && additionalFiles.length > 0) {
      additionalFiles.forEach((file) => {
        formData.append("additional_files[]", file);
      });
    }
    try {
      const response = await fetch(
        "https://mazadoman.com/backend/api/auctions/post",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user?.api_token}`, // <- Add this line
          },
          body: formData,
        }
      );

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        toast.success(t["success_message"]);
        router.push(
          `/admin/promotion_page?id=${encodeURIComponent(
            data?.auction.auction_id
          )}&type=${encodeURIComponent(data.auction.auction_type)}`
        );

        // Clear form or redirect here
      } else {
        const firstError =
          data && typeof data === "object" ? Object.values(data)[0][0] : null;
        toast.error(firstError || t["error_message"]);
      }
    } catch (error) {
      console.error(error);
      toast.error(t["error_message"]);
    } finally {
      setIsLoading(false);
    }
  };

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
        const fee = "paid";

        savedata(fee);
      } else {
        //setMessage(`❌ Error: ${data.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error(error);
      // setMessage("❌ Network error or server unreachable.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (auctionType === "Forward") {
      const fee = "paid";
      savedata(fee);
    } else if (auctionType === "Reverse" && free_auctions_used > 10) {
      console.log(free_auctions_used);
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
              amount: "10",
              currency: "OMR",
              payment_method: "Amwal Pay",
              payment_type: "auction",
              status: "completed",
              description: "auction created and Fee paid",
              payment_reference: transactionId,
            };

            savePaymentData(paymentData, transactionId);
            paymentSavedRef.current = true; // Ensure it's only saved once
          },

          // completeCallback: (data) => {
          //   const fee = "paid";
          //   console.log("Payment completed", data), savedata(fee);
          // },
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
      const fee = "pending";
      savedata(fee);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   try {
  //     // Step 1: Initiate Payment Session
  //     const paymentResponse = await fetch(
  //       "https://uatcheckout.thawani.om/api/v1/session",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "thawani-api-key": process.env.THAWANI_PUBLIC_KEY, // Load public key from .env
  //         },

  //         body: JSON.stringify({
  //           client_reference_id: user?.id,
  //           products: [
  //             {
  //               name: "Auction Submission Fee",
  //               quantity: 1,
  //               unit_amount: 1000,
  //             },
  //           ],
  //           success_url: "", // Leave blank to remain on the same page.
  //           cancel_url: "", // Leave blank to remain on the same page.
  //         }),
  //       }
  //     );

  //     const paymentData = await paymentResponse.json();

  //     if (!paymentResponse.ok) {
  //       toast.error("Failed to initiate payment session.");
  //       return;
  //     }

  //     // Step 2: Open Thawani Widget
  //     const { data } = paymentData;
  //     const paymentWidget = new window.ThawaniCheckout({
  //       session_id: data.session_id,
  //     });

  //     paymentWidget.open();

  //     // Step 3: Wait for Payment Completion (or User Closes Modal)
  //     paymentWidget.on("payment-success", async () => {
  //       // Validate Payment
  //       try {
  //         const validateResponse = await fetch(
  //           "https://mazadoman.com/backend/api/validate-payment",
  //           {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify({
  //               session_id: data.session_id,
  //               user_id: user?.id,
  //               // Include auction details here
  //               title: tenderName,
  //               category,
  //               subcategory,
  //               description,
  //               budget,
  //               bid_start_date: bidStartDate,
  //               bid_end_date: bidEndDate,
  //               auction_type: auctionType,
  //             }),
  //           }
  //         );

  //         const validationResult = await validateResponse.json();

  //         if (validateResponse.ok) {
  //           toast.success("Payment successful, auction saved!");
  //           router.push("/admin/dashboard"); // Navigate to dashboard.
  //         } else {
  //           toast.error(
  //             validationResult.message || "Payment validation failed."
  //           );
  //         }
  //       } catch (error) {
  //         console.error(error);
  //         toast.error("Error validating payment.");
  //       }
  //     });

  //     paymentWidget.on("payment-cancel", () => {
  //       toast.error("Payment was canceled.");
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Error initiating payment.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <>
      <Script
        src="https://test.amwalpg.com:7443/js/SmartBox.js?v=1.1"
        strategy="afterInteractive"
        onLoad={() => console.log("SmartBox.js loaded")}
      />
      <div
        className={`max-w-4xl mx-auto p-6 ${
          language === "ar" ? "text-right" : "text-left"
        }`}
      >
        <Toaster position="top-center" reverseOrder={false} />
        <Loading isLoading={isLoading} />
        <h1
          className={`text-3xl text-center text-orange-400 font-semibold mb-6 ${
            language === "ar" ? "rtl" : ""
          }`}
        >
          {t.post_auction}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Auction Name */}
          <div>
            <label
              htmlFor="auctionName"
              className="block text-lg font-medium mb-2"
            >
              {t["auction_title"]}:
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
          <div>
            <label
              htmlFor="auctionType"
              className="block text-lg font-medium mb-2"
            >
              {t["auction_type"]}:
            </label>
            <select
              id="auctionType"
              value={auctionType}
              onChange={(e) => setAuctionType(e.target.value)} // Save only the English value
              className={`w-full p-3 border border-gray-300 rounded-lg ${
                language === "ar" ? "text-right" : "text-left"
              }`}
              required
            >
              <option value="" disabled>
                {t["select_auction_type"]}:
              </option>
              <option value="Forward">{t["auction_forward"]}</option>
              <option value="Reverse">{t["auction_reverse"]}</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-lg font-medium mb-2"
            >
              {t.description}:
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
              {t.category}:
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
            />
          </div>

          {/* Subcategory Selection */}
          {category && (
            <div className="mb-6">
              <label
                htmlFor="subcategory"
                className="block text-lg font-medium mb-2"
              >
                {t.subcategory}:
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
              />
            </div>
          )}
          {/* Budget */}
          <div>
            <label htmlFor="budget" className="block text-lg font-medium mb-2">
              {t.starting_price} :
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
              {t.start_date}:
            </label>
            <input
              dir={language === "ar" ? "rtl" : "ltr"}
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
              {t.end_date}:
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
          <div className={`${language === "ar" ? "rtl" : ""}`}>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              {t.upload_image || "Upload Image"}
            </label>
            <div
              className={`relative w-full mt-1 border border-gray-300 rounded-lg ${
                language === "ar" ? "text-right" : "text-left"
              }`}
              style={{ height: "3rem" }} // adjust height as needed
            >
              <span
                className={`absolute top-1/2 ${
                  language === "ar" ? "right-3" : "left-3"
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
                style={{ direction: language === "ar" ? "rtl" : "ltr" }}
              />
            </div>
          </div>

          {/* Tender Scope */}
          {/* <div>
          <label htmlFor="image" className="block text-lg font-medium mb-2">
            Upload Scope of Work:
          </label>
          <input
            type="file"
            id="scope"
            onChange={(e) => setScope(e.target.files[0])}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div> */}
          {/* Tender BOQ */}
          {/* <div>
          <label htmlFor="image" className="block text-lg font-medium mb-2">
            Upload the BOQ:
          </label>
          <input
            type="file"
            id="boq"
            onChange={(e) => setBoq(e.target.files[0])}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div> */}

          {/* Tender additional */}
          <div className={`${language === "ar" ? "rtl" : ""}`}>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              {t.upload_documents || "Upload Documents"}
            </label>

            <div
              className={`relative w-full mt-1 border border-gray-300 rounded-lg ${
                language === "ar" ? "text-right" : "text-left"
              }`}
              style={{ height: "3rem" }} // adjust height as needed
            >
              <span
                className={`absolute top-1/2 ${
                  language === "ar" ? "right-3" : "left-3"
                } transform -translate-y-1/2 text-gray-500 text-sm truncate`}
                style={{ pointerEvents: "none", maxWidth: "90%" }}
              >
                {additionalFiles.length > 0
                  ? `${additionalFiles.length} file(s) selected`
                  : t.noFileChosen || "No files chosen"}
              </span>

              <input
                type="file"
                id="additional_documents"
                multiple
                onChange={handleFileChange}
                className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
                style={{ direction: language === "ar" ? "rtl" : "ltr" }}
              />
            </div>

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
              className="w-full cursor-pointer sm:w-auto bg-orange-400 text-white py-2 px-6 rounded-lg hover:bg-orange-500"
            >
              {t.submit}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
