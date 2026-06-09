"use client";

import { useEffect, useState } from "react";

const Hero = () => {

    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    const [dashboardData, setDashboardData] = useState<any>(null)

    const [loading, setLoading] = useState(true)
    const [students, setStudents] = useState<any[]>([]);

    const fetchDashboard = async () => {

        try {

            const res = await fetch(
                `${apiUrl}/api/overview`
            )

            const data = await res.json()

            if (data.success) {
                setDashboardData(data)
            }

        } catch (error) {

            console.log(error)

        } finally {

            setLoading(false)

        }
    }
    const fetchStudents = async () => {

        try {

            const res = await fetch(
                `${apiUrl}/api/get-student`
            );

            const data = await res.json();

            if (data.success) {
                setStudents(data.students);
            }

        } catch (error) {

            console.log(error);

        }
    };

    useEffect(() => {
        fetchDashboard()
        fetchStudents();
    }, [])

    if (loading) {
        return (
            <div className="lg:ml-64 p-5">
                <h1>Loading...</h1>
            </div>
        )
    }

    return (

        <div className="lg:ml-64 ml-0 px-3 sm:px-5 pt-6 sm:pt-8 min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 overflow-x-hidden">

  {/* HEADER */}
  <div className="mb-8 sm:mb-10">

    <h1 className="text-3xl sm:text-4xl font-bold mb-1 text-black dark:text-white md:hidden">
      Dashboard
    </h1>
    <h1 className="text-3xl sm:text-4xl font-bold mb-1 text-black dark:text-white">
      Dashboard
    </h1>

    <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
      Overview of your academy's performance
    </p>

  </div>

  {/* TOP STATS */}
  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-7">

    <div className="min-h-[150px] w-full rounded-lg border border-green-500 bg-green-50 dark:bg-green-950/30 p-4">
      <h1 className="text-md font-bold text-gray-500 dark:text-gray-400">Total Staff</h1>
      <p className="font-bold mt-2 text-3xl sm:text-4xl text-black dark:text-white break-words">
        {dashboardData?.stats?.totalStaff}
      </p>
      <p className="mt-1 text-gray-500 dark:text-gray-400">
        {dashboardData?.stats?.activeStaff} active
      </p>
      <p className="text-green-500 mt-2 text-sm">Staff members</p>
    </div>

    <div className="min-h-[150px] w-full rounded-lg border border-green-500 bg-green-50 dark:bg-green-950/30 p-4">
      <h1 className="text-md font-bold text-gray-500 dark:text-gray-400">Total Student</h1>
      <p className="font-bold mt-2 text-3xl sm:text-4xl text-black dark:text-white break-words">
        {dashboardData?.stats?.totalStudents}
      </p>
      <p className="mt-1 text-gray-500 dark:text-gray-400">Across all courses</p>
      <p className="text-green-500 mt-2 text-sm">Registered students</p>
    </div>

    <div className="min-h-[150px] w-full rounded-lg border border-amber-300 bg-amber-100 dark:bg-amber-950/30 p-4">
      <h1 className="text-md font-bold text-gray-500 dark:text-gray-400">Revenue</h1>
      <p className="font-bold mt-2 text-3xl sm:text-4xl text-black dark:text-white break-words">
        ${dashboardData?.stats?.totalRevenue}
      </p>
      <p className="mt-1 text-gray-500 dark:text-gray-400">
        {dashboardData?.stats?.pendingPayments} pending
      </p>
      <p className="text-green-500 mt-2 text-sm">Student payments</p>
    </div>

    <div className="min-h-[150px] w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
      <h1 className="text-md font-bold text-gray-500 dark:text-gray-400">Avg Attendance</h1>
      <p className="font-bold mt-2 text-3xl sm:text-4xl text-black dark:text-white break-words">
        {dashboardData?.stats?.averageAttendance}%
      </p>
      <p className="mt-1 text-gray-500 dark:text-gray-400">Staff average</p>
      <p className="text-green-500 mt-2 text-sm">Attendance records</p>
    </div>

  </div>

  {/* MAIN CONTENT */}
  <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-5">

    {/* STAFF OVERVIEW */}
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 p-4 w-full">

      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-black dark:text-white">
        Staff Overview
      </h1>

      {dashboardData?.staffOverview?.map((staff: any) => {

        const initials = staff.fullName
          .split(" ")
          .map((n: string) => n[0])
          .join("")
          .slice(0, 2);

        const presentDays = staff.attendance.filter(
          (item: any) => item.status === "present"
        ).length;

        const totalDays = staff.attendance.length;

        const attendancePercent =
          totalDays > 0 ? Math.floor((presentDays / totalDays) * 100) : 0;

        return (
          <div
            key={staff._id}
            className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 mb-4 w-full"
          >

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              <div className="flex items-center gap-3 min-w-0">

                <div className="h-12 w-12 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shrink-0">
                  <h1 className="font-bold text-black dark:text-white">
                    {initials}
                  </h1>
                </div>

                <div className="min-w-0">
                  <h1 className="text-lg font-bold text-black dark:text-white truncate">
                    {staff.fullName}
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {staff.role}
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">

                <h1 className="font-semibold text-black dark:text-white">
                  {attendancePercent}%
                </h1>

                <button
                  className={`h-7 rounded-2xl px-3 text-sm border whitespace-nowrap
                  ${staff.status === "active"
                      ? "border-green-400 bg-green-100 text-green-700"
                      : "border-yellow-400 bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {staff.status}
                </button>

              </div>

            </div>

          </div>
        );
      })}

    </div>

    {/* STUDENT PROGRESS */}
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 p-4 w-full">

      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-black dark:text-white">
        Student Progress
      </h1>

      {dashboardData?.studentProgress?.map((student: any) => {

        const initials = student.fullName
          .split(" ")
          .map((n: string) => n[0])
          .join("")
          .slice(0, 2);

        return (
          <div
            key={student._id}
            className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 mb-4 w-full"
          >

            <div className="flex flex-col lg:flex-row lg:items-center gap-4">

              <div className="flex items-center gap-3 flex-1 min-w-0">

                <div className="h-12 w-12 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shrink-0">
                  <h1 className="font-bold text-black dark:text-white">
                    {initials}
                  </h1>
                </div>

                <div className="min-w-0">
                  <h1 className="text-lg font-bold text-black dark:text-white truncate">
                    {student.fullName}
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {student.course}
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-3 w-full lg:w-52">

                <div className="h-2 flex-1 rounded-full bg-gray-300 dark:bg-gray-700 overflow-hidden">
                  <div
                    className="h-2 bg-green-700 rounded-full"
                    style={{ width: `${student.progress}%` }}
                  />
                </div>

                <h1 className="text-sm font-semibold text-black dark:text-white whitespace-nowrap">
                  {student.progress}%
                </h1>

              </div>

            </div>

          </div>
        );
      })}

    </div>

  </div>

  {/* PAYMENT TABLE */}
  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 p-5 w-full">

    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[900px]">

        <thead className="bg-gray-200 dark:bg-gray-900">
          <tr>
            <th className="p-4 text-left text-black dark:text-white">Student</th>
            <th className="p-4 text-left text-black dark:text-white">Course</th>
            <th className="p-4 text-left text-black dark:text-white">Level</th>
            <th className="p-4 text-left text-black dark:text-white">Progress</th>
            <th className="p-4 text-left text-black dark:text-white">Paid</th>
            <th className="p-4 text-left text-black dark:text-white">Due</th>
            <th className="p-4 text-left text-black dark:text-white">Payment</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr
              key={student._id}
              className="border-t border-gray-300 dark:border-gray-700"
            >
              <td className="p-4 text-black dark:text-white font-medium whitespace-nowrap">
                {student.fullName}
              </td>

              <td className="p-4 text-black dark:text-white whitespace-nowrap">
                {student.course}
              </td>

              <td className="p-4 text-black dark:text-white whitespace-nowrap">
                {student.level}
              </td>

              <td className="p-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <div className="w-24 sm:w-28 h-2 rounded-full bg-gray-300 overflow-hidden">
                    <div
                      className="h-2 bg-green-600 rounded-full"
                      style={{ width: `${student.progress}%` }}
                    />
                  </div>

                  <span className="text-sm font-semibold text-black dark:text-white">
                    {student.progress}%
                  </span>
                </div>
              </td>

              <td className="p-4 text-green-500 font-semibold whitespace-nowrap">
                ${student.amountPaid}
              </td>

              <td className="p-4 text-red-500 font-semibold whitespace-nowrap">
                ${student.amountDue}
              </td>

              <td className="p-4 whitespace-nowrap">
                <span className={`px-3 py-1 rounded-full text-sm text-white
                  ${student.paymentStatus === "paid"
                    ? "bg-green-500"
                    : student.paymentStatus === "pending"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                >
                  {student.paymentStatus}
                </span>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>

    <h1 className="text-black dark:text-white text-sm text-end sm:text-base mt-3">
      Total Student:
      <span className="font-bold ml-1">
        {dashboardData?.stats?.totalStudents}
      </span>
    </h1>

  </div>

</div>
    );
};

export default Hero

//  <div>

//                     <h1 className="font-bold text-2xl sm:text-3xl text-black dark:text-white">
//                         Payment Summary
//                     </h1>

//                 </div>

//                 <div className="flex justify-end items-end h-[220px]">

//                     <h1 className="text-black dark:text-white text-sm sm:text-base">
//                         Total Student:
//                         {" "}
//                         {dashboardData?.stats?.totalStudents}
//                     </h1>

//                 </div>