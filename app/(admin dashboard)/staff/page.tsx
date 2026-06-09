"use client";

import { useEffect, useState } from "react";

const Staff = () => {

  const [clicked, setClicked] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [staff, setStaff] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "",
    status: "active",
    skillset: "",
    attendanceStatus: "present"
  });

  const fetchStaff = async () => {

    try {

      const res = await fetch(
        `${apiUrl}/api/get-staff`
      );

      const data = await res.json();

      if (data.success) {
        setStaff(data.staff);
      }

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const createStaff = async () => {

    try {

      setLoading(true);

      const res = await fetch(
        `${apiUrl}/api/create-staff`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            ...formData,

            skillset: formData.skillset
              .split(",")
              .map((skill) => skill.trim()),

            attendance: [
              {
                status: formData.attendanceStatus
              }
            ]

          })
        }
      );

      const data = await res.json();

      if (data.success) {

        fetchStaff();

        setClicked(false);

        setFormData({
          fullName: "",
          email: "",
          phone: "",
          role: "",
          status: "active",
          skillset: "",
          attendanceStatus: "present"
        });

      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="lg:ml-64 min-h-screen bg-gray-100 dark:bg-gray-900 px-4 sm:px-6 pt-24 lg:pt-6 pb-6 overflow-x-hidden">

  {/* HEADER */}
  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">

    <div>
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black dark:text-white">
        Staff Management
      </h1>

      <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">
        Manage your team, track attendance and skills
      </p>
    </div>

    <button
      onClick={() => setClicked((prev) => !prev)}
      className="w-full lg:w-auto bg-sky-400 hover:bg-sky-500 text-white px-5 py-3 rounded-lg font-semibold transition-all"
    >
      + Add Staff
    </button>

  </div>

  {/* MODAL */}
  {clicked && (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">

      <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-5 sm:p-7">

        {/* TITLE */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-black dark:text-white">
            Add New Staff Member
          </h1>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Fill all details correctly
          </p>
        </div>

        {/* FORM */}
        <div className="space-y-5">

          {/* NAME + EMAIL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
              <label className="font-semibold text-black dark:text-white">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full mt-2 h-11 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 text-black dark:text-white outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-black dark:text-white">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-2 h-11 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 text-black dark:text-white outline-none"
              />
            </div>

          </div>

          {/* PHONE + ROLE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
              <label className="font-semibold text-black dark:text-white">
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full mt-2 h-11 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 text-black dark:text-white outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-black dark:text-white">
                Position
              </label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full mt-2 h-11 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 text-black dark:text-white outline-none"
              >
                <option value="">Select Role</option>
                <option value="frontend">Frontend</option>
                <option value="backend Engineer">Backend Engineer</option>
                <option value="Lead_Developer">Lead Developer</option>
                <option value="digital_marketing">Digital Marketing</option>
                <option value="ui_ux">UI/UX</option>
                <option value="other">Other</option>
              </select>
            </div>

          </div>

          {/* SKILLS + STATUS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
              <label className="font-semibold text-black dark:text-white">
                Skills
              </label>

              <input
                type="text"
                name="skillset"
                value={formData.skillset}
                onChange={handleChange}
                className="w-full mt-2 h-11 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 text-black dark:text-white outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-black dark:text-white">
                Staff Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full mt-2 h-11 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 text-black dark:text-white outline-none"
              >
                <option value="active">Active</option>
                <option value="on_leave">On Leave</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

          </div>

          {/* ATTENDANCE */}
          <div>
            <label className="font-semibold text-black dark:text-white">
              Attendance Status
            </label>

            <select
              name="attendanceStatus"
              value={formData.attendanceStatus}
              onChange={handleChange}
              className="w-full mt-2 h-11 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 text-black dark:text-white outline-none"
            >
              <option value="present">Present</option>
              <option value="late">Late</option>
              <option value="absent">Absent</option>
            </select>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 pt-3">

            <button
              onClick={createStaff}
              disabled={loading}
              className="flex-1 h-11 rounded-lg bg-sky-400 hover:bg-sky-500 text-white font-semibold"
            >
              {loading ? "Creating..." : "Create Staff"}
            </button>

            <button
              onClick={() => setClicked(false)}
              className="flex-1 h-11 rounded-lg border border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </button>

          </div>

        </div>

      </div>

    </div>
  )}

  {/* STAFF CARDS */}
  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

    {staff.map((member, index) => {

      const totalDays = member.attendance?.length || 0;
      const presentDays = member.attendance?.filter((a: any) => a.status === "present").length || 0;

      const attendanceRate =
        totalDays === 0 ? 0 : Math.round((presentDays / totalDays) * 100);

      return (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-300 dark:border-gray-700 p-5"
        >

          {/* HEADER */}
          <div className="flex items-center gap-3 mb-5">

            <div className="h-12 w-12 rounded-full bg-sky-100 flex items-center justify-center">
              <h1 className="text-sky-500 font-bold">
                {member.fullName?.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
              </h1>
            </div>

            <div className="min-w-0">
              <h1 className="text-lg font-semibold text-black dark:text-white truncate">
                {member.fullName}
              </h1>
              <p className="text-sm text-gray-500 truncate">
                {member.role}
              </p>
            </div>

          </div>

          {/* ATTENDANCE */}
          <div className="mb-4">

            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Attendance</span>
              <span className="font-bold text-black dark:text-white">
                {attendanceRate}%
              </span>
            </div>

            <div className="h-2 w-full rounded-full bg-gray-300 dark:bg-gray-700">
              <div
                className="h-2 bg-green-600 rounded-full"
                style={{ width: `${attendanceRate}%` }}
              />
            </div>

          </div>

          {/* STATUS */}
          <div className="mb-4">
            <span className={`px-3 py-1 text-sm rounded-full text-white
              ${member.attendance?.[0]?.status === "present"
                ? "bg-green-500"
                : member.attendance?.[0]?.status === "late"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}>
              {member.attendance?.[0]?.status || "No Attendance"}
            </span>
          </div>

          {/* SKILLS */}
          <div className="flex flex-wrap gap-2 mb-4">
            {member.skillset?.map((skill: string, i: number) => (
              <span
                key={i}
                className="px-2 py-1 text-xs rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
              >
                {skill}
              </span>
            ))}
          </div>

          <hr className="border-gray-300 dark:border-gray-700 mb-3" />

          {/* FOOTER */}
          <div className="flex flex-col sm:flex-row sm:justify-between text-xs text-gray-500 gap-1">

            <p className="truncate">{member.email}</p>

            <p>
              {new Date(member.createdAt).toLocaleDateString()}
            </p>

          </div>

        </div>
      );

    })}

  </div>

</div>
  );
};

export default Staff;