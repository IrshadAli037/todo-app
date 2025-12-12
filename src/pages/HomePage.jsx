import { useQuery } from "@tanstack/react-query";
import { logout } from "../store/authSlice";
import { api } from "../api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

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
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4 sm:p-6">

            
            <h1 className="text-3xl sm:text-4xl font-bold mt-4 text-center">
                Welcome,{" "}
                <span className="text-blue-700">{user?.email || "User"} 👋</span>
            </h1>

            <p className="text-gray-600 mt-2 text-base sm:text-lg text-center max-w-md">
                Stay organized and productive every day.
            </p>

            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8 w-full max-w-4xl px-2">

                <div className="bg-white shadow-xl rounded-xl p-5 text-center">
                    <h2 className="text-xl sm:text-2xl font-bold">{totalTasks}</h2>
                    <p className="text-gray-500 text-sm sm:text-base">Total Tasks</p>
                </div>

                <div className="bg-white shadow-xl rounded-xl p-5 text-center">
                    <h2 className="text-xl sm:text-2xl font-bold">{completedTasks}</h2>
                    <p className="text-gray-500 text-sm sm:text-base">Completed</p>
                </div>

                <div className="bg-white shadow-xl rounded-xl p-5 text-center">
                    <h2 className="text-xl sm:text-2xl font-bold">{pendingTasks}</h2>
                    <p className="text-gray-500 text-sm sm:text-base">Pending</p>
                </div>

            </div>

            
            <div className="w-full max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-xl p-6">

                <h3 className="text-base sm:text-lg font-semibold text-gray-700 text-center mb-4">
                    Your Productivity Progress
                </h3>

                <p className="text-gray-600 font-medium mb-3 text-center text-sm sm:text-base">
                    {progress}% Completed
                </p>

                <div className="w-full bg-gray-300 h-4 sm:h-5 rounded-full overflow-hidden shadow-inner">
                    <div
                        className="h-4 sm:h-5 bg-linear-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            
            <Link to="/todos" className="mt-8 sm:mt-10">
                <button className="px-6 sm:px-8 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white text-base sm:text-lg rounded-xl shadow-lg">
                    Go to My Tasks →
                </button>
            </Link>

            
            <p className="mt-8 sm:mt-10 text-gray-700 italic text-center max-w-lg text-sm sm:text-base">
                “Small progress every day leads to big results.”
            </p>

            
            <div className="flex justify-center mx-auto mt-10 text-white">
                <button
                    className="bg-red-500 px-8 py-2 hover:bg-red-700 rounded-full shadow-xl cursor-pointer text-base sm:text-lg"
                    onClick={() => {
                        dispatch(logout());
                        navigate("/login");
                    }}
                >
                    Logout
                </button>
            </div>

        </div>
    );
}
