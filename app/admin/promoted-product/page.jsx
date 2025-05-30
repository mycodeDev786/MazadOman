"use client";
import PromotionsList from "../../components/PromotionsList";
import { useSelector } from "react-redux";

export default function PromotionsPage() {
  const user = useSelector((state) => state.session.user);
  const userId = user?.id; // Replace with actual user ID or from session/context

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4">
        <PromotionsList userId={userId} />
      </div>
    </div>
  );
}
