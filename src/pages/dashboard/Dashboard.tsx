import { useEffect, useState } from "react";
import {
  FileText,
  Search,
  CheckCircle,
  Clock,
  Plus,
  ArrowRight,
  MapPin,
  CalendarDays,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

import api from "../../lib/api";
import type { Item } from "../../services/item.service";

function Dashboard() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchMyItems = async () => {
      try {
        const response = await api.get<{
          success: boolean;
          items: Item[];
        }>("/items/mine");

        if (isMounted) {
          setItems(response.data.items);
        }
      } catch (error) {
        console.error("Dashboard reports error:", error);

        if (isMounted) {
          setError("Unable to load your reports. Please try again.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void fetchMyItems();

    return () => {
      isMounted = false;
    };
  }, []);

  const stats = [
    {
      title: "Total Reports",
      value: items.length,
      icon: FileText,
      gem: "sk-gem",
    },
    {
      title: "Lost Items",
      value: items.filter((item) => item.type === "lost").length,
      icon: Search,
      gem: "sk-gem sk-gem-blue",
    },
    {
      title: "Found Items",
      value: items.filter((item) => item.type === "found").length,
      icon: CheckCircle,
      gem: "sk-gem sk-gem-lime",
    },
    {
      title: "Pending Reports",
      value: items.filter((item) => item.status === "active").length,
      icon: Clock,
      gem: "sk-gem",
    },
  ];

  return (
    <main className="min-h-[85vh] py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <span className="sk-eyebrow text-sm font-bold uppercase tracking-widest">
              Your account
            </span>

            <h1 className="sk-emboss mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
              Welcome to Your Dashboard
            </h1>

            <p className="sk-emboss-soft mt-2">
              Manage your lost and found reports in one place.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link to="/report-lost" className="sk-btn rounded-xl px-5 py-3">
              <Plus size={18} />
              Report Lost
            </Link>

            <Link
              to="/report-found"
              className="sk-btn sk-btn-steel rounded-xl px-5 py-3"
            >
              <Plus size={18} />
              Report Found
            </Link>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div key={stat.title} className="sk-panel sk-panel-lift p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="sk-emboss-soft text-sm font-bold">
                    {stat.title}
                  </span>

                  <span
                    className={`${stat.gem} flex h-11 w-11 items-center justify-center rounded-xl`}
                  >
                    <Icon size={20} />
                  </span>
                </div>

                <div className="sk-lcd mt-5 px-4 py-2.5 text-3xl font-bold tracking-[0.25em]">
                  {isLoading ? "--" : String(stat.value).padStart(2, "0")}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="sk-emboss text-xl font-extrabold">Your Reports</h2>

              <p className="sk-emboss-soft mt-1 text-sm">
                All items you have reported.
              </p>
            </div>

            <span className="sk-emboss-soft text-sm">
              {items.length} Reports
            </span>
          </div>

          {isLoading && (
            <div className="sk-panel rounded-2xl p-10 text-center">
              Loading your reports...
            </div>
          )}

          {error && (
            <div className="sk-panel rounded-2xl p-8 text-center">
              <AlertCircle className="mx-auto mb-3" size={32} />

              <p>{error}</p>

              <button
                onClick={() => window.location.reload()}
                className="sk-btn mt-5 rounded-xl px-5 py-2"
              >
                Try Again
              </button>
            </div>
          )}

          {!isLoading && !error && items.length === 0 && (
            <div className="sk-panel rounded-3xl p-8 text-center sm:p-12">
              <span className="sk-gem mx-auto flex h-16 w-16 items-center justify-center rounded-2xl">
                <FileText size={30} />
              </span>

              <h3 className="sk-emboss mt-6 text-xl font-extrabold">
                No Reports Yet
              </h3>

              <p className="sk-emboss-soft mx-auto mt-3 max-w-md leading-7">
                You haven't reported any lost or found items. Start by
                submitting your first report.
              </p>

              <Link
                to="/report-lost"
                className="sk-btn sk-btn-steel mt-8 inline-flex items-center gap-2 rounded-xl px-6 py-3"
              >
                Report an Item
                <ArrowRight size={18} />
              </Link>
            </div>
          )}

          {!isLoading && !error && items.length > 0 && (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="sk-panel sk-panel-lift overflow-hidden rounded-2xl"
                >
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-44 w-full object-cover"
                    />
                  )}

                  <div className="p-5">
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                        {item.type}
                      </span>

                      <span className="text-xs opacity-70">{item.status}</span>
                    </div>

                    <h3 className="sk-emboss text-lg font-bold">{item.name}</h3>

                    <p className="mt-2 line-clamp-2 text-sm opacity-70">
                      {item.description}
                    </p>

                    <div className="mt-4 space-y-2 text-sm opacity-70">
                      <p className="flex items-center gap-2">
                        <MapPin size={15} />
                        {item.city}, {item.district}
                      </p>

                      <p className="flex items-center gap-2">
                        <CalendarDays size={15} />
                        {new Date(item.date).toLocaleDateString()}
                      </p>
                    </div>

                    <Link
                      to={`/items/${item._id}`}
                      className="sk-btn mt-5 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm"
                    >
                      View Details
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
