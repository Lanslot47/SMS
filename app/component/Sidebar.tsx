"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Calendar,
  Menu,
  X,
} from "lucide-react";

import { useState } from "react";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const items = [
    {
      id: 1,
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },

    {
      id: 2,
      title: "Staff",
      url: "/staff",
      icon: Users,
    },

    {
      id: 3,
      title: "Student",
      url: "/student",
      icon: GraduationCap,
    },

    {
      id: 4,
      title: "Reports",
      url: "/reports",
      icon: Calendar,
    },
  ];

  return (
    <>
      {/* MOBILE TOPBAR */}

      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gray-950 h-16 flex items-center justify-between px-4">

        <div className="flex items-center gap-2">
          <div className="h-9 w-10 bg-sky-300 rounded-xl flex items-center justify-center">
            <h1 className="text-white font-bold text-2xl">M</h1>
          </div>

          <h1 className="text-white font-bold text-2xl">
            Mehub
          </h1>
        </div>

        <button onClick={() => setOpen(true)}>
          <Menu className="text-white" size={30} />
        </button>

      </div>

      {/* MOBILE SIDEBAR */}

      {open && (
        <div className="fixed inset-0 bg-black/50 z-50 lg:hidden">

          <div className="w-64 h-screen bg-gray-950 p-5">

            <div className="flex items-center justify-between mb-10">

              <div className="flex items-center gap-2">
                <div className="h-9 w-10 bg-sky-300 rounded-xl flex items-center justify-center">
                  <h1 className="text-white font-bold text-2xl">
                    M
                  </h1>
                </div>

                <h1 className="text-white font-bold text-2xl">
                  Mehub
                </h1>
              </div>

              <button onClick={() => setOpen(false)}>
                <X className="text-white" />
              </button>

            </div>

            <div className="space-y-6">

              {items.map((list) => (
                <Link
                  href={list.url}
                  key={list.id}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-4 text-white font-medium"
                >
                  <list.icon size={22} />
                  {list.title}
                </Link>
              ))}

            </div>

          </div>

        </div>
      )}

      {/* DESKTOP SIDEBAR */}

      <div className="hidden lg:block w-64 h-screen fixed bg-gray-950">

        <div className="p-4 flex items-center gap-2">

          <div className="h-9 w-10 bg-sky-300 rounded-xl flex items-center justify-center">
            <h1 className="text-white font-bold text-2xl">
              M
            </h1>
          </div>

          <h1 className="text-white font-bold text-2xl">
            Mehub
          </h1>

        </div>

        <hr className="border-gray-700" />

        <div className="space-y-6 mt-8 ml-7 font-semibold">

          {items.map((list) => (
            <Link
              href={list.url}
              key={list.id}
              className="flex gap-4 items-center text-white"
            >
              <list.icon size={22} />
              {list.title}
            </Link>
          ))}

        </div>

      </div>
    </>
  );
};

export default Sidebar;