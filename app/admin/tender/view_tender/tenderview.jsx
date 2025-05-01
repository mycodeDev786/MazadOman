"use client";
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/app/components/LoadingSpinner";

export default function TenderPage() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [quotes, setQuotes] = useState([]);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [tender, setTender] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editTender, setEditTender] = useState(tender);

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

  const openModal = () => {
    setEditTender(tender); // load current data into form
    setIsOpen(true);
  };

  const submitEdit = () => {
    // update state
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditTender((prev) => ({ ...prev, [name]: value }));
  };

  const handleActionChange = (id, newAction) => {
    setCompanies((prev) =>
      prev.map((comp) =>
        comp.id === id ? { ...comp, action: newAction } : comp
      )
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Loading isLoading={loading} />
      <h1 className="text-2xl font-bold text-center mb-4">
        Tender Information
      </h1>
      {/* TENDER INFO CARD */}
      <div className="flex items-start justify-between bg-gray-100 p-4  rounded-md mb-6">
        <div>
          <h2 className="text-xl font-bold">
            <span>Tender Id: </span>
            {tender?.tender_id}
          </h2>
          <p className="text-gray-700 py-2 ">
            {" "}
            <span>Tender Title: </span> {tender?.title}
          </p>
          <p className="text-gray-700 py-2 ">
            {" "}
            <span>Tender Description: </span> {tender?.title}{" "}
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
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded max-w-md w-full p-6 shadow-xl">
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
                  value={editTender?.bid_end_date}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
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
        <p className="text-gray-500 p-6 mt-10">No one quoted yet.</p>
      ) : (
        <>
          <h2 className="text-xl font-semibold mt-10 mb-2">Tender Quotes</h2>
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Company Name</th>
                <th className="p-2 border">Profile</th>
                <th className="p-2 border">Total Offer</th>
                <th className="p-2 border">Action</th>
                <th className="p-2 border">Download Technical</th>
                <th className="p-2 border">Download Commercial</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((comp) => (
                <tr key={comp.quote_id} className="text-center">
                  <td className="p-2 border">{comp.company_name}</td>
                  <td className="p-2 border">
                    <div
                      onClick={() => {
                        router.push(
                          `/admin/view_company_profile?id=${encodeURIComponent(
                            tender?.user_id
                          )}`
                        );
                      }}
                      className="text-blue-600 cursor-pointer underline"
                    >
                      Profile
                    </div>
                  </td>
                  <td className="p-2 border">{comp.quote_amount} OMR</td>
                  <td className="p-2 border">
                    <select
                      value={comp.action}
                      onChange={(e) =>
                        handleActionChange(comp.id, e.target.value)
                      }
                      className="border p-1 rounded"
                    >
                      <option value="">-- Select --</option>
                      <option value="approve">Approve</option>
                      <option value="reject">Reject</option>
                      <option value="submit-tech">
                        Submit Technical Offer
                      </option>
                      <option value="resubmit-comm">
                        Resubmit Commercial Offer
                      </option>
                      <option value="postpond">Postpond</option>
                      <option value="tender-cancel">Tender Canceled</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="award">Award the Job</option>
                    </select>
                  </td>
                  <td className="p-2 border">
                    <a
                      href={`https://mazadoman.com/backend/${comp.technical_offer}`}
                      className="text-green-600 underline"
                      download
                    >
                      Download
                    </a>
                  </td>
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
    </div>
  );
}
