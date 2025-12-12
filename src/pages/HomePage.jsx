import { useQuery } from "@tanstack/react-query";
import { logout } from "../store/authSlice";
import { api } from "../api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function HomePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const { data: items, isLoading } = useQuery({
        queryKey: ["todos", user.id],
        queryFn: () => api.get(`/todos?userId=${user.id}`).then(res => res.data),
    });

    const totalTasks = items?.length || 0;
    const completedTasks = items?.filter((t) => t.completed).length || 0;
    const pendingTasks = items?.filter((t) => !t.completed).length || 0;

    const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    return (
        <motion.div
            className="min-h-screen flex flex-col items-center bg-gray-100 p-4 sm:p-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >


            <motion.h1 className="text-3xl sm:text-4xl font-bold mt-4 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                Welcome,{" "}
                <span className="text-blue-700">{user?.email || "User"} 👋</span>
            </motion.h1>

            <motion.p className="text-gray-600 mt-2 text-base sm:text-lg text-center max-w-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                Stay organized and productive every day.
            </motion.p>


            <motion.div
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8 w-full max-w-4xl px-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                {[
                    { value: totalTasks, label: "Total Tasks" },
                    { value: completedTasks, label: "Completed" },
                    { value: pendingTasks, label: "Pending" },
                ].map((card, index) => (
                    <motion.div
                        key={index}
                        className="bg-white shadow-xl rounded-xl p-5 text-center"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.4 * index }}
                    >
                        <h2 className="text-xl sm:text-2xl font-bold">{card.value}</h2>
                        <p className="text-gray-500 text-sm sm:text-base">{card.label}</p>
                    </motion.div>
                ))}
            </motion.div>


            <motion.div
                className="w-full max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-xl p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
            >
                <h3 className="text-base sm:text-lg font-semibold text-gray-700 text-center mb-4">
                    Your Productivity Progress
                </h3>

                <p className="text-gray-600 font-medium mb-3 text-center text-sm sm:text-base">
                    {progress}% Completed
                </p>

                <div className="w-full bg-gray-300 h-4 sm:h-5 rounded-full overflow-hidden shadow-inner">
                    {/* <div
                        className="h-4 sm:h-5 bg-linear-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    ></div> */}
                    <motion.div
                        className="h-4 sm:h-5 bg-linear-to-r from-blue-500 to-blue-700 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1 }}
                    />
                </div>
            </motion.div>

            <motion.div className="mt-8"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                <Link to="/todos" className=" sm:mt-10">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 sm:px-8 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700  text-white text-base sm:text-lg rounded-xl shadow-lg"
                    >
                        Go to My Tasks →
                    </motion.button>
                </Link>
            </motion.div>

            <motion.p
                className="mt-8 sm:mt-10 text-gray-700 italic text-center max-w-lg text-sm sm:text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
            >
                “Small progress every day leads to big results.”
            </motion.p>

            <motion.div
                className="flex justify-center mx-auto mt-10 text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
            >
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-red-500 px-8 py-2 hover:bg-red-700 rounded-full shadow-xl cursor-pointer text-base sm:text-lg"
                    onClick={() => {
                        dispatch(logout());
                        navigate("/login");
                    }}
                >
                    Logout
                </motion.button>
            </motion.div>


        </motion.div >
    );
}
