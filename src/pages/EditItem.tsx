import { useCallback, useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";

import api from "../lib/api";
import { getItemById, type Item } from "../services/item.service";

function EditItem() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [item, setItem] = useState<Item | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    province: "",
    district: "",
    city: "",
    specificPlace: "",
    date: "",
    imageUrl: "",
  });

  const fetchItem = useCallback(async () => {
    if (!id) {
      setError("Invalid item ID.");
      setIsLoading(false);
      return;
    }

    try {
      setError("");

      const data = await getItemById(id);

      setItem(data);

      setFormData({
        name: data.name,
        category: data.category,
        description: data.description,
        province: data.province,
        district: data.district,
        city: data.city,
        specificPlace: data.specificPlace || "",
        date: new Date(data.date).toISOString().split("T")[0],
        imageUrl: data.imageUrl || "",
      });
    } catch (error) {
      console.error("Fetch item error:", error);
      setError("Unable to load this report. It may have been deleted.");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      void fetchItem();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [fetchItem]);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!id) return;

    try {
      setIsSaving(true);
      setError("");

      await api.patch(`/items/${id}`, formData);

      window.alert("Report updated successfully!");

      navigate("/dashboard");
    } catch (error) {
      console.error("Update item error:", error);
      setError("Unable to update your report. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-[85vh] px-5 py-14">
        <div className="sk-panel mx-auto max-w-3xl rounded-2xl p-10 text-center">
          Loading report...
        </div>
      </main>
    );
  }

  if (!item || error) {
    return (
      <main className="min-h-[85vh] px-5 py-14">
        <div className="sk-panel mx-auto max-w-3xl rounded-2xl p-10 text-center">
          <AlertCircle className="mx-auto mb-4" size={35} />
          <p>{error || "Report not found."}</p>

          <Link
            to="/dashboard"
            className="sk-btn mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-3"
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  const inputClass =
    "sk-well w-full rounded-xl px-4 py-3 outline-none transition focus:ring-2 focus:ring-cyan-400/40";

  return (
    <main className="min-h-[85vh] py-10 sm:py-14">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <Link
          to="/dashboard"
          className="sk-emboss-soft mb-7 inline-flex items-center gap-2 text-sm font-semibold"
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <span className="sk-eyebrow text-sm font-bold uppercase tracking-widest">
            Manage report
          </span>

          <h1 className="sk-emboss mt-3 text-3xl font-extrabold">
            Edit Your Report
          </h1>

          <p className="sk-emboss-soft mt-2">
            Update the information about your {item.type} item.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="sk-panel space-y-6 rounded-3xl p-6 sm:p-9"
        >
          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
              {error}
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-bold">Item Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold">Category</label>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={inputClass}
              required
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-bold">Province</label>
              <input
                name="province"
                value={formData.province}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold">District</label>
              <input
                name="district"
                value={formData.district}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold">City</label>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold">
                Specific Place
              </label>
              <input
                name="specificPlace"
                value={formData.specificPlace}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold">
              Date of Incident
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              max={new Date().toISOString().split("T")[0]}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold">Image URL</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className={inputClass}
            />
          </div>

          {formData.imageUrl && (
            <div>
              <p className="mb-2 text-sm font-semibold">Image Preview</p>
              <img
                src={formData.imageUrl}
                alt="Item preview"
                className="h-48 w-full rounded-xl object-cover"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isSaving}
            className="sk-btn flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 font-bold disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={18} />
            {isSaving ? "Saving Changes..." : "Save Changes"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default EditItem;