"use client";

import { useEffect, useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface StaffPerformance {
    name: string;
    role: string;
    attendanceRate: string;
}

interface StudentPerformance {
    fullName: string;
    level: string;
    progress: number;
}

interface PaymentAnalytics {
    totalRevenue: number;
    outstanding: number;
    failedPayments: number;
}

const page = () => {

    const [staffData, setStaffData] = useState<StaffPerformance[]>([]);

    const [studentData, setStudentData] = useState<StudentPerformance[]>([]);

    const [paymentData, setPaymentData] = useState<PaymentAnalytics>({
        totalRevenue: 0,
        outstanding: 0,
        failedPayments: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchReports = async () => {

            try {

                const [
                    staffRes,
                    studentRes,
                    paymentRes
                ] = await Promise.all([
                    fetch(`${apiUrl}/api/staff-performance`),
                    fetch(`${apiUrl}/api/student-performance`),
                    fetch(`${apiUrl}/api/payment-analytics`)
                ]);

                const staffJson = await staffRes.json();

                const studentJson = await studentRes.json();

                const paymentJson = await paymentRes.json();

                if (staffJson.success) {
                    setStaffData(staffJson.data);
                }

                if (studentJson.success) {
                    setStudentData(studentJson.data);
                }

                if (paymentJson.success) {
                    setPaymentData(paymentJson.data);
                }
console.log(paymentJson)
            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }
        };

        fetchReports();

    }, []);

    // AVG STUDENT PROGRESS

    const avgProgress =
        studentData.length > 0
            ? (
                studentData.reduce((acc, curr) => acc + curr.progress, 0) /
                studentData.length
            ).toFixed(0)
            : 0;

    // AVG STAFF ATTENDANCE

    const avgAttendance =
        staffData.length > 0
            ? (
                staffData.reduce(
                    (acc, curr) => acc + Number(curr.attendanceRate),
                    0
                ) / staffData.length
            ).toFixed(0)
            : 0;

    // STUDENT LEVEL COUNTS

    const advancedStudents = studentData.filter(
        (s) => s.level.toLowerCase() === "advanced"
    ).length;

    const intermediateStudents = studentData.filter(
        (s) => s.level.toLowerCase() === "intermediate"
    ).length;

    const beginnerStudents = studentData.filter(
        (s) => s.level.toLowerCase() === "beginner"
    ).length;

    const totalStudents = studentData.length || 1;

    return (

        <div className="lg:ml-64 min-h-screen bg-gray-100 dark:bg-gray-900 px-4 sm:px-6 pt-24 lg:pt-6 pb-6 transition-colors duration-300 overflow-x-hidden">

    {/* HEADER */}
    <div className="mb-6 sm:mb-8">

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-black dark:text-white">
            Report & Analytics
        </h1>

        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
            Performance insights and financial overview
        </p>

    </div>

    {/* TOP CARDS */}
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">

        {/* TOTAL REVENUE */}
        <div className="w-full rounded-lg border border-green-500 bg-green-50 dark:bg-green-950/30 p-4 sm:p-5">

            <h1 className="text-sm sm:text-base font-bold text-gray-500 dark:text-gray-300">
                Total Revenue
            </h1>

            <p className="font-bold mt-3 text-2xl sm:text-3xl lg:text-4xl text-black dark:text-white">
                ${paymentData.totalRevenue.toLocaleString()}
            </p>

        </div>

        {/* OUTSTANDING */}
        <div className="w-full rounded-lg border border-amber-300 bg-amber-100 dark:bg-amber-950/30 p-4 sm:p-5">

            <h1 className="text-sm sm:text-base font-bold text-gray-500 dark:text-gray-300">
                Outstanding
            </h1>

            <p className="font-bold mt-3 text-2xl sm:text-3xl lg:text-4xl text-black dark:text-white">
                ${paymentData.outstanding.toLocaleString()}
            </p>

        </div>

        {/* AVG PROGRESS */}
        <div className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 sm:p-5">

            <h1 className="text-sm sm:text-base font-bold text-gray-500 dark:text-gray-300">
                Avg Progress
            </h1>

            <p className="font-bold mt-3 text-2xl sm:text-3xl lg:text-4xl text-black dark:text-white">
                {avgProgress}%
            </p>

        </div>

        {/* STAFF ATTENDANCE */}
        <div className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 sm:p-5">

            <h1 className="text-sm sm:text-base font-bold text-gray-500 dark:text-gray-300">
                Staff Attendance
            </h1>

            <p className="font-bold mt-3 text-2xl sm:text-3xl lg:text-4xl text-black dark:text-white">
                {avgAttendance}%
            </p>

        </div>

    </div>

    {/* SECOND SECTION */}
    <div className="flex flex-col xl:flex-row gap-5 mb-10">

        {/* STUDENT LEVEL */}
        <div className="w-full xl:flex-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">

            <h1 className="text-xl sm:text-2xl p-5 font-bold text-black dark:text-white">
                Student Level
            </h1>

            {/* ADVANCED */}
            <div className="px-5 mb-6">

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2">
                    <h1 className="text-sm text-gray-400">Advanced</h1>
                    <p className="font-bold text-black dark:text-white">
                        {advancedStudents} students
                    </p>
                </div>

                <div className="h-2 w-full rounded-full bg-gray-300 dark:bg-gray-700">
                    <div
                        className="h-2 rounded-full bg-green-800"
                        style={{
                            width: `${(advancedStudents / totalStudents) * 100}%`
                        }}
                    />
                </div>

            </div>

            {/* INTERMEDIATE */}
            <div className="px-5 mb-6">

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2">
                    <h1 className="text-sm text-gray-400">Intermediate</h1>
                    <p className="font-bold text-black dark:text-white">
                        {intermediateStudents} students
                    </p>
                </div>

                <div className="h-2 w-full rounded-full bg-gray-300 dark:bg-gray-700">
                    <div
                        className="h-2 rounded-full bg-green-800"
                        style={{
                            width: `${(intermediateStudents / totalStudents) * 100}%`
                        }}
                    />
                </div>

            </div>

            {/* BEGINNER */}
            <div className="px-5 pb-6">

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2">
                    <h1 className="text-sm text-gray-400">Beginner</h1>
                    <p className="font-bold text-black dark:text-white">
                        {beginnerStudents} students
                    </p>
                </div>

                <div className="h-2 w-full rounded-full bg-gray-300 dark:bg-gray-700">
                    <div
                        className="h-2 rounded-full bg-green-800"
                        style={{
                            width: `${(beginnerStudents / totalStudents) * 100}%`
                        }}
                    />
                </div>

            </div>

        </div>

        {/* STAFF SKILLS */}
        <div className="w-full xl:flex-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">

            <h1 className="text-xl sm:text-2xl p-5 font-bold text-black dark:text-white">
                Staff Skills Distribution
            </h1>

            {staffData.map((staff, index) => (
                <div key={index} className="px-5 mb-6">

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">

                        <h1 className="text-sm text-gray-400 break-words">
                            {staff.name}
                        </h1>

                        <div className="flex items-center gap-2 w-full sm:w-auto">

                            <div className="h-2 flex-1 sm:w-24 rounded-full bg-green-800" />

                            <h1 className="text-black dark:text-white text-sm">
                                {staff.attendanceRate}%
                            </h1>

                        </div>

                    </div>

                </div>
            ))}

        </div>

    </div>

    {/* STAFF PERFORMANCE TABLE */}
    <div className="w-full">

        <div className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-x-auto">

            <h1 className="text-xl sm:text-2xl p-5 font-bold text-black dark:text-white">
                Staff Performance
            </h1>

            {loading ? (
                <p className="px-5 pb-5 text-gray-500">Loading...</p>
            ) : (

                <table className="w-full min-w-[600px]">

                    <thead>
                        <tr className="border-b border-gray-300 dark:border-gray-700">
                            <th className="text-left p-4 text-gray-500">Name</th>
                            <th className="text-left p-4 text-gray-500">Role</th>
                            <th className="text-left p-4 text-gray-500">Attendance</th>
                        </tr>
                    </thead>

                    <tbody>
                        {staffData.map((staff, index) => (
                            <tr key={index} className="border-b border-gray-200 dark:border-gray-700">

                                <td className="p-4 text-black dark:text-white">
                                    {staff.name}
                                </td>

                                <td className="p-4 text-black dark:text-white">
                                    {staff.role}
                                </td>

                                <td className="p-4 text-black dark:text-white">
                                    {staff.attendanceRate}%
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>

            )}

        </div>

    </div>

</div>
    );
};

export default page;