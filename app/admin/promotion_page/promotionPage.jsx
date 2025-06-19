"use client";
import { assets } from "@/assets/assets";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Loading from "@/app/components/LoadingSpinner";
import Script from "next/script";
import { useSelector } from "react-redux";
import { useLanguage } from "../../components/LanguageContext";
import { translations } from "../../translations/promoted_products_translation";

const PromotionPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const paymentSavedRef = useRef(false);
  const { language } = useLanguage();
  const t = translations[language];
  const isRTL = language === "ar";

  const id = searchParams.get("id");
  const type = searchParams.get("type");
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.thawani.om/widget/script.js"; // Load Thawani widget.
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script); // Cleanup
    };
  }, []);
  const plans = [
    {
      id: 1,
      title: t.planFree,
      price: "0.5 OMR",
      duration: 3,
      description: t.descFree,
    },
    {
      id: 2,
      title: t.planBasic,
      price: "5 OMR",
      duration: 7,
      description: t.descBasic,
    },
    {
      id: 3,
      title: t.planStandard,
      price: "10 OMR",
      duration: 15,
      description: t.descStandard,
    },
    {
      id: 4,
      title: t.planPremium,
      price: "20 OMR",
      duration: 30,
      description: t.descPremium,
    },
  ];

  const handleSelectPlan = (id) => {
    setSelectedPlan(id);
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
        savedata(transactionId);
      } else {
        //setMessage(`❌ Error: ${data.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error(error);
      // setMessage("❌ Network error or server unreachable.");
    }
  };

  const savedata = async (transactionId) => {
    setIsLoading(true);
    const newType = type === "Tender" ? "tender" : "auction";
    const plan = plans.find((p) => p.id === selectedPlan);
    if (!plan || !id || !type) {
      console.error("Missing data for promotion");
      setIsLoading(false);
      return;
    }

    const formData = {
      user_id: user.id, // Replace with actual logged-in user ID from token/session
      target_type: newType,
      target_id: id,
      duration_days: plan.duration,
      payment_reference: transactionId,
    };

    try {
      const response = await fetch(
        "https://mazadoman.com/backend/api/promotions/create",
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

      if (!response.ok) {
        throw new Error(data.message || "Promotion creation failed");
      }

      toast.success(t.successPromo);
    } catch (error) {
      console.error("❌ Error saving promotion:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const plan = plans.find((p) => p.id === selectedPlan);
    if (!plan) {
      console.error("No plan selected");
      setIsLoading(false);
      return;
    }

    const amount = plan.price.replace(" OMR", ""); // Extract number part
    const trxDateTime = new Date().toISOString();

    try {
      const response = await fetch(
        "https://mazadoman.com/backend/api/generate-secure-hash",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            MerchantId: process.env.NEXT_PUBLIC_MID,
            TerminalId: process.env.NEXT_PUBLIC_TID,
            Amount: amount, // Set correct plan price
            MerchantReference: String(plan.id), // Reference can be plan ID
            RequestDateTime: trxDateTime,
            CurrencyId: "512",
            SessionToken: "",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.SecureHash) {
        throw new Error("Failed to get secure hash");
      }

      window.SmartBox.Checkout.configure = {
        MID: process.env.NEXT_PUBLIC_MID,
        TID: process.env.NEXT_PUBLIC_TID,
        CurrencyId: "512",
        AmountTrxn: amount,
        MerchantReference: String(plan.id),
        LanguageId: language === "ar" ? "ar" : "en",
        PaymentViewType: 1,
        TrxDateTime: trxDateTime,
        SecureHash: data.SecureHash,
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
            amount: amount,
            currency: "OMR",
            payment_method: "Amwal Pay",
            payment_type: "promotion",
            status: "completed",
            description: plan.description,
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
      setIsLoading(false);
    }
  };

  return (
    <>
      <Script
        src="https://checkout.amwalpg.com/js/SmartBox.js?v=1.1"
        strategy="afterInteractive"
        onLoad={() => console.log("SmartBox.js loaded")}
      />

      <Toaster position="top-center" reverseOrder={false} />
      <Loading isLoading={isLoading} />
      <div
        dir={isRTL ? "rtl" : "ltr"}
        className="min-h-screen bg-gray-50 flex flex-col items-center py-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {t.headerTitle} <span className="text-indigo-600">{t.promote}</span>
          </h1>
          <p className="text-gray-600 text-center mt-2">{t.headerSubtitle}</p>
        </div>

        {/* Promotion Plans */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white shadow-lg rounded-xl border p-6 flex flex-col items-center ${
                selectedPlan === plan.id
                  ? "border-indigo-600"
                  : "border-gray-200"
              } hover:shadow-xl transition-shadow duration-200`}
            >
              {/* Custom Icons */}
              <div className="mb-4">
                <Image
                  src={assets.promotionIcon}
                  alt="Plan Icon"
                  className="w-16 h-16"
                  unoptimized
                  width={64}
                  height={64}
                />
              </div>

              <h2 className="text-xl font-semibold text-gray-800">
                {plan.title}
              </h2>
              <p className="text-gray-500 text-center mt-1">
                {plan.description}
              </p>
              <p className="text-2xl font-bold text-indigo-600 mt-4">
                {plan.price}
              </p>
              <p className="text-gray-400">{plan.duration}</p>
              {selectedPlan === plan.id ? (
                <button
                  className="bg-green-600 text-white px-6 py-2 rounded-lg mt-6 hover:bg-green-700 transition-colors"
                  onClick={handleSubmit}
                >
                  {t.payFee}
                </button>
              ) : (
                <button
                  className="bg-orange-600 text-white px-6 py-2 rounded-lg mt-6 hover:bg-orange-700 transition-colors"
                  onClick={() => handleSelectPlan(plan.id)}
                >
                  {t.selectPlan}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PromotionPage;
