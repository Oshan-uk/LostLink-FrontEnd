import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import {
  MapPin,
  CalendarDays,
  Package,
  User,
  ArrowLeft,
  AlertCircle,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import {
  getItemById,
  getPotentialMatches,
  type Item,
  type PotentialMatch,
} from "../services/item.service";

function ItemDetails() {
  const { id } = useParams<{ id: string }>();

  const [item, setItem] = useState<Item | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Smart Matching states
  const [matches, setMatches] = useState<PotentialMatch[]>([]);
  const [matchesLoading, setMatchesLoading] = useState(true);
  const [matchesError, setMatchesError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchItem = async () => {
      if (!id) {
        setError("Invalid item ID.");
        setIsLoading(false);
        setMatchesLoading(false);
        return;
      }

      try {
        const response = await getItemById(id);

        if (!isMounted) return;

        setItem(response);
        setIsLoading(false);

        // Returned items are not eligible for matching.
        if (response.status === "returned") {
          setMatchesLoading(false);
          return;
        }

        // Fetch potential matching reports.
        try {
          const matchResponse = await getPotentialMatches(id);

          if (isMounted) {
            setMatches(matchResponse.matches);
          }
        } catch (matchError) {
          console.error("Smart matching error:", matchError);

          if (isMounted) {
            setMatchesError("Unable to load potential matches.");
          }
        } finally {
          if (isMounted) {
            setMatchesLoading(false);
          }
        }
      } catch (fetchError) {
        console.error("Item details error:", fetchError);

        if (isMounted) {
          setError("Unable to load item details.");
          setIsLoading(false);
          setMatchesLoading(false);
        }
      }
    };

    void fetchItem();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p>Loading item details...</p>
      </main>
    );
  }

  if (error || !item) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-4">
        <AlertCircle size={40} />

        <h2 className="mt-4 text-xl font-semibold">
          {error || "Item not found"}
        </h2>

        <Link to="/" className="mt-6">
          Back to Home
        </Link>
      </main>
    );
  }

  const reporterName =
    typeof item.user === "object" ? item.user?.name : undefined;

  return (
    <main className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <Link to="/" className="mb-8 inline-flex items-center gap-2">
          <ArrowLeft size={18} />
          Back to Reports
        </Link>

        {/* Main Item Details */}

        <div className="sk-panel overflow-hidden rounded-2xl">
          {item.imageUrl && (
            <div className="h-72 w-full overflow-hidden md:h-96">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div className="space-y-8 p-6 md:p-10">
            {/* Item Heading */}

            <div>
              <div className="mb-4 flex flex-wrap gap-3">
                <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-400">
                  {item.type.toUpperCase()} ITEM
                </span>

                <span className="rounded-full bg-white/10 px-4 py-2 text-sm">
                  {item.status.toUpperCase()}
                </span>
              </div>

              <h1 className="text-3xl font-bold md:text-4xl">{item.name}</h1>

              <p className="mt-3 text-sm opacity-70">{item.category}</p>
            </div>

            {/* Description */}

            <div className="border-t border-white/10 pt-6">
              <h2 className="mb-4 text-xl font-semibold">Description</h2>

              <p className="leading-7 opacity-80">{item.description}</p>
            </div>

            {/* Item Information */}

            <div className="border-t border-white/10 pt-6">
              <h2 className="mb-5 text-xl font-semibold">Item Information</h2>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex items-start gap-3">
                  <Package size={20} />

                  <div>
                    <p className="text-sm opacity-60">Category</p>
                    <p className="font-medium">{item.category}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CalendarDays size={20} />

                  <div>
                    <p className="text-sm opacity-60">
                      {item.type === "lost" ? "Date Lost" : "Date Found"}
                    </p>

                    <p className="font-medium">
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Information */}

            <div className="border-t border-white/10 pt-6">
              <h2 className="mb-5 text-xl font-semibold">
                Location Information
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={20} />

                  <div>
                    <p className="text-sm opacity-60">Province</p>
                    <p>{item.province}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={20} />

                  <div>
                    <p className="text-sm opacity-60">District</p>
                    <p>{item.district}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={20} />

                  <div>
                    <p className="text-sm opacity-60">City / Locality</p>
                    <p>{item.city}</p>
                  </div>
                </div>

                {item.specificPlace && (
                  <div className="flex items-start gap-3">
                    <MapPin size={20} />

                    <div>
                      <p className="text-sm opacity-60">Specific Place</p>
                      <p>{item.specificPlace}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Reporter Information */}

            <div className="border-t border-white/10 pt-6">
              <h2 className="mb-5 text-xl font-semibold">
                Reporter Information
              </h2>

              <div className="flex items-center gap-3">
                <User size={22} />

                <div>
                  <p className="text-sm opacity-60">Reported by</p>
                  <p className="font-medium">
                    {reporterName || "Registered user"}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm opacity-60">
                Report created: {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Smart Matching Section */}

        {item.status === "active" && (
          <section className="mt-10">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-cyan-500/10 p-3">
                <Sparkles className="text-cyan-400" size={25} />
              </div>

              <div>
                <h2 className="text-2xl font-bold">Potential Matches</h2>

                <p className="mt-1 text-sm opacity-60">
                  Reports that may match this {item.type} item.
                </p>
              </div>
            </div>

            {/* Loading */}

            {matchesLoading && (
              <div className="sk-panel rounded-2xl p-8 text-center">
                <p className="opacity-70">Searching for potential matches...</p>
              </div>
            )}

            {/* Error */}

            {!matchesLoading && matchesError && (
              <div className="sk-panel rounded-2xl p-6 text-center">
                <AlertCircle className="mx-auto mb-3 text-red-400" size={30} />

                <p className="text-sm opacity-70">{matchesError}</p>
              </div>
            )}

            {/* No Matches */}

            {!matchesLoading && !matchesError && matches.length === 0 && (
              <div className="sk-panel rounded-2xl p-8 text-center">
                <Package size={38} className="mx-auto mb-4 opacity-40" />

                <h3 className="text-lg font-semibold">
                  No Potential Matches Found
                </h3>

                <p className="mt-2 text-sm opacity-60">
                  We couldn't find any matching reports right now. New reports
                  may appear later.
                </p>
              </div>
            )}

            {/* Matching Reports */}

            {!matchesLoading && !matchesError && matches.length > 0 && (
              <div className="grid gap-5 md:grid-cols-2">
                {matches.map((match) => (
                  <div
                    key={match.item._id}
                    className="sk-panel overflow-hidden rounded-2xl transition-transform duration-300 hover:-translate-y-1"
                  >
                    {/* Match Image */}

                    {match.item.imageUrl ? (
                      <img
                        src={match.item.imageUrl}
                        alt={match.item.name}
                        className="h-48 w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-48 items-center justify-center bg-white/5">
                        <Package size={45} className="opacity-30" />
                      </div>
                    )}

                    <div className="space-y-5 p-5">
                      {/* Match Score */}

                      <div className="flex items-center justify-between gap-3">
                        <span className="rounded-full bg-cyan-500/10 px-3 py-2 text-sm font-semibold text-cyan-400">
                          {match.matchScore}% Match
                        </span>

                        <span className="text-xs opacity-60">
                          {match.item.type.toUpperCase()} REPORT
                        </span>
                      </div>

                      {/* Item Name */}

                      <div>
                        <h3 className="text-xl font-bold">{match.item.name}</h3>

                        <p className="mt-1 text-sm opacity-60">
                          {match.item.category}
                        </p>
                      </div>

                      {/* Match Progress */}

                      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-400/30 shadow-inner">
                        <div
                          className="h-full rounded-full bg-cyan-400 transition-all duration-500"
                          style={{
                            width: `${match.matchScore}%`,
                          }}
                        />
                      </div>

                      {/* Match Reasons */}

                      <div>
                        <p className="mb-3 text-sm font-semibold">
                          Why this might match
                        </p>

                        <div className="space-y-2">
                          {match.matchReasons.map((reason, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 text-sm opacity-80"
                            >
                              <CheckCircle2
                                size={16}
                                className="shrink-0 text-cyan-400"
                              />

                              {reason}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* View Report */}

                      <Link
                        to={`/items/${match.item._id}`}
                        className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500/10 px-4 py-3 font-semibold text-cyan-400 transition-colors hover:bg-cyan-500/20"
                      >
                        View Matching Report
                        <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}

export default ItemDetails;
