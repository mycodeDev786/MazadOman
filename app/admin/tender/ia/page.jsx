import TenderDetails from "./TenderDetails";

export default function TenderPage({ params }) {
  const id = params.id;

  return (
    <div className="p-6">
      <TenderDetails id={id} />
    </div>
  );
}

// ✅ Now we can safely use generateStaticParams here
export async function generateStaticParams() {
  const tenderIds = ["1", "2", "101", "102"];

  return tenderIds.map((id) => ({
    id: id,
  }));
}
