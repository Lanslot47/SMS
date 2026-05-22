"use client";

import { useEffect, useState } from "react";

const Page = () => {

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const [clicked, setClicked] = useState(false);

    const [students, setStudents] = useState<any[]>([]);

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        course: "",
        level: "",
        amountPaid: "",
        amountDue: "",
        paymentStatus: "",
        progress: ""
    });

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
        fetchStudents();
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

    const handleSubmit = async () => {

        try {

            setLoading(true);

            const res = await fetch(
                `${apiUrl}/api/create-student`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        ...formData,
                        progress: Number(formData.progress),
                        amountPaid: Number(formData.amountPaid),
                        amountDue: Number(formData.amountDue)
                    })
                }
            );

            const data = await res.json();

            if (data.success) {

                fetchStudents();

                setClicked(false);

                setFormData({
                    fullName: "",
                    email: "",
                    course: "",
                    level: "",
                    amountPaid: "",
                    amountDue: "",
                    paymentStatus: "",
                    progress: ""
                });

            }

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="lg:ml-66 ml-0 px-3 sm:px-5 py-5 min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">

            {/* HEADER */}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

                <div>

                    <h1 className="text-3xl sm:text-4xl font-bold text-black dark:text-white">
                        Student Management
                    </h1>

                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Track progress, levels and payments
                    </p>

                </div>

                <button
                    onClick={() => setClicked(true)}
                    className="h-11 px-5 rounded-lg bg-sky-400 hover:bg-sky-500 transition-all text-white font-semibold"
                >
                    + Add Student
                </button>

            </div>

            {/* MODAL */}

            {clicked && (

                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">

                    <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl p-5 sm:p-7 shadow-xl">

                        {/* TITLE */}

                        <div className="mb-6">

                            <h1 className="text-2xl sm:text-3xl font-bold text-center text-black dark:text-white">
                                Enroll Student
                            </h1>

                            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                                Fill student information correctly
                            </p>

                        </div>

                        {/* FORM */}

                        <div className="space-y-5">

                            {/* NAME + EMAIL */}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <div>

                                    <label className="font-semibold text-black dark:text-white">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        name="fullName"
                                        placeholder="e.g John Smith"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="w-full mt-2 h-11 rounded-lg border border-gray-300 dark:border-gray-700 px-3 bg-white dark:bg-gray-900 text-black dark:text-white outline-none"
                                    />

                                </div>

                                <div>

                                    <label className="font-semibold text-black dark:text-white">
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="e.g john@gmail.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full mt-2 h-11 rounded-lg border border-gray-300 dark:border-gray-700 px-3 bg-white dark:bg-gray-900 text-black dark:text-white outline-none"
                                    />

                                </div>

                            </div>

                            {/* COURSE + LEVEL */}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <div>

                                    <label className="font-semibold text-black dark:text-white">
                                        Course
                                    </label>

                                    <select
                                        name="course"
                                        value={formData.course}
                                        onChange={handleChange}
                                        className="w-full mt-2 h-11 rounded-lg border border-gray-300 dark:border-gray-700 px-3 bg-white dark:bg-gray-900 text-black dark:text-white outline-none"
                                    >

                                        <option value="">
                                            Select Course
                                        </option>

                                        <option value="Full Stack Development">
                                            Full Stack Development
                                        </option>

                                        <option value="Frontend Mastery">
                                            Frontend Mastery
                                        </option>

                                        <option value="Web Fundamentals">
                                            Web Fundamentals
                                        </option>

                                        <option value="Backend Engineering">
                                            Backend Engineering
                                        </option>

                                        <option value="Digital Marketing Pro">
                                            Digital Marketing Pro
                                        </option>

                                    </select>

                                </div>

                                <div>

                                    <label className="font-semibold text-black dark:text-white">
                                        Level
                                    </label>

                                    <select
                                        name="level"
                                        value={formData.level}
                                        onChange={handleChange}
                                        className="w-full mt-2 h-11 rounded-lg border border-gray-300 dark:border-gray-700 px-3 bg-white dark:bg-gray-900 text-black dark:text-white outline-none"
                                    >

                                        <option value="">
                                            Select Level
                                        </option>

                                        <option value="beginner">
                                            Beginner
                                        </option>

                                        <option value="intermediate">
                                            Intermediate
                                        </option>

                                        <option value="advanced">
                                            Advanced
                                        </option>

                                    </select>

                                </div>

                            </div>

                            {/* PAYMENT */}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <div>

                                    <label className="font-semibold text-black dark:text-white">
                                        Amount Paid ($)
                                    </label>

                                    <input
                                        type="number"
                                        name="amountPaid"
                                        placeholder="0"
                                        value={formData.amountPaid}
                                        onChange={handleChange}
                                        className="w-full mt-2 h-11 rounded-lg border border-gray-300 dark:border-gray-700 px-3 bg-white dark:bg-gray-900 text-black dark:text-white outline-none"
                                    />

                                </div>

                                <div>

                                    <label className="font-semibold text-black dark:text-white">
                                        Amount Due ($)
                                    </label>

                                    <input
                                        type="number"
                                        name="amountDue"
                                        placeholder="0"
                                        value={formData.amountDue}
                                        onChange={handleChange}
                                        className="w-full mt-2 h-11 rounded-lg border border-gray-300 dark:border-gray-700 px-3 bg-white dark:bg-gray-900 text-black dark:text-white outline-none"
                                    />

                                </div>

                            </div>

                            {/* PROGRESS + PAYMENT STATUS */}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <div>

                                    <label className="font-semibold text-black dark:text-white">
                                        Student Progress (%)
                                    </label>

                                    <input
                                        type="number"
                                        name="progress"
                                        placeholder="0"
                                        value={formData.progress}
                                        onChange={handleChange}
                                        className="w-full mt-2 h-11 rounded-lg border border-gray-300 dark:border-gray-700 px-3 bg-white dark:bg-gray-900 text-black dark:text-white outline-none"
                                    />

                                </div>

                                <div>

                                    <label className="font-semibold text-black dark:text-white">
                                        Payment Status
                                    </label>

                                    <select
                                        name="paymentStatus"
                                        value={formData.paymentStatus}
                                        onChange={handleChange}
                                        className="w-full mt-2 h-11 rounded-lg border border-gray-300 dark:border-gray-700 px-3 bg-white dark:bg-gray-900 text-black dark:text-white outline-none"
                                    >

                                        <option value="">
                                            Select Status
                                        </option>

                                        <option value="paid">
                                            Paid
                                        </option>

                                        <option value="pending">
                                            Pending
                                        </option>

                                        <option value="failed">
                                            Failed
                                        </option>

                                    </select>

                                </div>

                            </div>

                            {/* BUTTONS */}

                            <div className="flex flex-col sm:flex-row gap-3 pt-3">

                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="flex-1 h-11 rounded-lg bg-sky-400 hover:bg-sky-500 transition-all text-white font-semibold"
                                >
                                    {loading
                                        ? "Creating..."
                                        : "Enroll Student"}
                                </button>

                                <button
                                    onClick={() => setClicked(false)}
                                    className="flex-1 h-11 rounded-lg border border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                                >
                                    Cancel
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            )}

            {/* TABLE */}

            <div className="overflow-x-auto rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">

                <table className="w-full min-w-[1000px]">

                    <thead className="bg-gray-200 dark:bg-gray-900">

                        <tr>

                            <th className="p-4 text-left text-black dark:text-white">
                                Student
                            </th>

                            <th className="p-4 text-left text-black dark:text-white">
                                Course
                            </th>

                            <th className="p-4 text-left text-black dark:text-white">
                                Level
                            </th>

                            <th className="p-4 text-left text-black dark:text-white">
                                Progress
                            </th>

                            <th className="p-4 text-left text-black dark:text-white">
                                Paid
                            </th>

                            <th className="p-4 text-left text-black dark:text-white">
                                Due
                            </th>

                            <th className="p-4 text-left text-black dark:text-white">
                                Payment
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {students.map((student) => (

                            <tr
                                key={student._id}
                                className="border-t border-gray-300 dark:border-gray-700"
                            >

                                <td className="p-4 text-black dark:text-white font-medium">
                                    {student.fullName}
                                </td>

                                <td className="p-4 text-black dark:text-white">
                                    {student.course}
                                </td>

                                <td className="p-4 capitalize text-black dark:text-white">
                                    {student.level}
                                </td>

                                <td className="p-4">

                                    <div className="flex items-center gap-3">

                                        <div className="w-28 h-2 rounded-full bg-gray-300 overflow-hidden">

                                            <div
                                                className="h-2 bg-green-600 rounded-full"
                                                style={{
                                                    width: `${student.progress}%`
                                                }}
                                            ></div>

                                        </div>

                                        <span className="text-sm font-semibold text-black dark:text-white">
                                            {student.progress}%
                                        </span>

                                    </div>

                                </td>

                                <td className="p-4 text-green-500 font-semibold">
                                    ${student.amountPaid}
                                </td>

                                <td className="p-4 text-red-500 font-semibold">
                                    ${student.amountDue}
                                </td>

                                <td className="p-4">

                                    <span
                                        className={`px-3 py-1 rounded-full text-sm text-white
                                        
                                        ${student.paymentStatus === "paid"
                                                ? "bg-green-500"
                                                : student.paymentStatus === "pending"
                                                    ? "bg-yellow-500"
                                                    : "bg-red-500"
                                            }
                                        
                                        `}
                                    >
                                        {student.paymentStatus}
                                    </span>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default Page;