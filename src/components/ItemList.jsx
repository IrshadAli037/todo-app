import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { api } from "../api/authApi";
import { useCreateItem, useUpdateItem, useDeleteItem } from "../hooks/itemsQueries";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function ItemList() {
  const navigate = useNavigate();
  const { mutate: addItem } = useCreateItem();
  const { mutate: updateItem } = useUpdateItem();
  const { mutate: deleteItem } = useDeleteItem();

  const user = useSelector((state) => state.auth.user);

  const { data: items, isLoading } = useQuery({
    queryKey: ["todos", user.id],
    queryFn: () => api.get(`/todos?userId=${user.id}`).then(res => res.data),
  });

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [text, setText] = useState("");

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="bg-white shadow-xl rounded-xl p-4 sm:p-6 w-full max-w-2xl mx-auto mt-6">

      <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-600 mb-4">
        Todo List
      </h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          className="flex-1 border px-3 py-2 rounded-lg"
          value={text}
          placeholder="New item"
          onChange={(e) => setText(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
          onClick={() => {
            if (!text.trim()) return;
            addItem({ title: text, completed: false, userId: user.id });
            setText("");
          }}
        >
          Add
        </button>
      </div>

      <ul className="space-y-4">
        {items?.map((item, idx) => (
          <li
            key={item.id}
            className="flex flex-col sm:flex-row justify-between border-b pb-3 gap-3 sm:gap-0"
          >
            
            <div className="flex gap-2 items-center">
              <span className="font-semibold">{idx + 1}.</span>

              {editingId === item.id ? (
                <input
                  className="border px-2 py-1 rounded"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  autoFocus
                />
              ) : (
                <span
                  className={
                    item.completed
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }
                >
                  {item.title}
                </span>
              )}
            </div>

            
            <div className="flex flex-wrap gap-2 justify-end">

              
              <button
                onClick={() =>
                  updateItem({ ...item, completed: !item.completed })
                }
                className={`py-1 px-3 rounded-md text-white ${
                  item.completed
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {item.completed ? "Undo" : "Complete"}
              </button>

              
              {editingId === item.id ? (
                <>
                  <button
                    onClick={() => {
                      if (!editText.trim()) return;
                      updateItem({ ...item, title: editText });
                      setEditingId(null);
                    }}
                    className="bg-blue-600 text-white px-3 rounded-md hover:bg-blue-700"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-400 text-white px-3 rounded-md hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setEditingId(item.id);
                    setEditText(item.title);
                  }}
                  className="bg-green-600 text-white px-3 rounded-md hover:bg-green-700"
                >
                  Edit
                </button>
              )}

              
              <button
                onClick={() => deleteItem(item.id)}
                className="bg-red-600 text-white px-3 rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      
      <div
        onClick={() => navigate(-1)}
        className="py-2 px-6 mt-10 mx-auto flex items-center justify-center gap-2 
                   rounded-full shadow-md cursor-pointer bg-zinc-700 text-white 
                   hover:bg-zinc-800 transition w-max"
      >
        <BiArrowBack size={20} />
        <span className="text-lg font-semibold">Back</span>
      </div>

    </div>
  );
}
