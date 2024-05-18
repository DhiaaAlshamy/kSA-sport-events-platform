"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const EditClubPage = () => {
  const router = useRouter();
  const { clubId } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [foundedDate, setFoundedDate] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/club/${clubId}`)
      .then((response) => response.json())
      .then((data) => {
        setName(data.name);
        setDescription(data.description);
        setLogoUrl(data.logoUrl);
        setFoundedDate(
          data.foundedDate
            ? new Date(data.foundedDate).toISOString().split("T")[0]
            : ""
        );
      })
      .catch((error) => {
        console.error("Failed to fetch club:", error);
        setError(error.message);
      });
  }, [clubId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/club/${clubId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, logoUrl, foundedDate }),
      });
      if (!response.ok) throw new Error("Failed to update club");
      router.push("/admin/clubs");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-3xl font-bold text-center my-4">Edit Club</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        {logoUrl && (
          <div className="flex justify-center mb-4">
            <img
              src={logoUrl}
              alt={name}
              className="w-32 h-32 object-cover rounded-full"
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="name">
            Club Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="logoUrl">
            Logo URL
          </label>
          <input
            type="url"
            id="logoUrl"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="foundedDate">
            Founded Date
          </label>
          <input
            type="date"
            id="foundedDate"
            value={foundedDate}
            onChange={(e) => setFoundedDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={() => router.push("/admin/clubs")}
            className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditClubPage;
