import {
  UserRound,
  Mail,
  ShieldCheck,
  LayoutDashboard,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Profile() {
  const { user } = useAuth();

  return (
    <main className="min-h-[85vh] py-10 sm:py-14">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">

        {/* Page Heading */}
        <div className="mb-10">
          <span className="sk-eyebrow text-sm font-bold uppercase tracking-widest">
            Your Account
          </span>

          <h1 className="sk-emboss mt-3 text-3xl font-extrabold tracking-tight">
            My Profile
          </h1>

          <p className="sk-emboss-soft mt-2">
            View your account information and manage your LostLink activity.
          </p>
        </div>

        {/* Profile Card */}
        <div className="sk-panel overflow-hidden rounded-3xl">

          <div className="sk-well flex flex-col items-center gap-5 p-8 text-center sm:flex-row sm:text-left">

            <div className="sk-gem flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl">
              <UserRound size={44} />
            </div>

            <div>
              <span className="sk-eyebrow text-xs font-bold uppercase tracking-widest">
                LostLink Member
              </span>

              <h2 className="sk-emboss mt-2 text-2xl font-extrabold">
                {user?.name || "User"}
              </h2>

              <p className="sk-emboss-soft mt-1 text-sm">
                Welcome to your LostLink account.
              </p>
            </div>

          </div>

          {/* Account Information */}
          <div className="p-6 sm:p-8">

            <h3 className="sk-emboss mb-6 text-lg font-extrabold">
              Account Information
            </h3>

            <div className="grid gap-5 sm:grid-cols-2">

              <div className="sk-well rounded-2xl p-5">
                <div className="mb-3 flex items-center gap-3">
                  <span className="sk-gem flex h-10 w-10 items-center justify-center rounded-xl">
                    <UserRound size={19} />
                  </span>

                  <span className="sk-emboss-soft text-sm font-bold">
                    Full Name
                  </span>
                </div>

                <p className="sk-emboss wrap-break-word font-bold">
                  {user?.name || "Not available"}
                </p>
              </div>

              <div className="sk-well rounded-2xl p-5">
                <div className="mb-3 flex items-center gap-3">
                  <span className="sk-gem sk-gem-blue flex h-10 w-10 items-center justify-center rounded-xl">
                    <Mail size={19} />
                  </span>

                  <span className="sk-emboss-soft text-sm font-bold">
                    Email Address
                  </span>
                </div>

                <p className="sk-emboss break-all font-bold">
                  {user?.email || "Not available"}
                </p>
              </div>

              <div className="sk-well rounded-2xl p-5 sm:col-span-2">
                <div className="flex items-center gap-3">
                  <span className="sk-gem sk-gem-lime flex h-10 w-10 items-center justify-center rounded-xl">
                    <ShieldCheck size={19} />
                  </span>

                  <div>
                    <p className="sk-emboss font-bold">
                      Account Status
                    </p>

                    <p className="mt-1 text-sm text-green-400">
                      Authenticated
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Dashboard Button */}
            <div className="mt-8 border-t border-white/10 pt-8">

              <h3 className="sk-emboss text-lg font-extrabold">
                Manage Your Activity
              </h3>

              <p className="sk-emboss-soft mt-2 text-sm leading-6">
                Visit your dashboard to manage your lost and found reports,
                update item information, and track reported items.
              </p>

              <Link
                to="/dashboard"
                className="sk-btn sk-btn-steel mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-3"
              >
                <LayoutDashboard size={18} />
                Go to Dashboard
                <ArrowRight size={17} />
              </Link>

            </div>

          </div>
        </div>

      </div>
    </main>
  );
}

export default Profile;