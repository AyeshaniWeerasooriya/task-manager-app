"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./context/AuthContext";
import TaskList from "./components/TaskList";
import { DropdownMenuCheckboxes } from "./components/DropDown";
import { DialogBox } from "./components/DialogBox";
import { db } from "./firebase/firebaseConfig";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
    const q = query(collection(db, "task"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksData);
    });

    return () => unsubscribe();
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto w-full py-10">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 border-b pb-6">
        <h1 className="text-white text-3xl sm:text-4xl font-bold text-center sm:text-left">
          Get things done.
        </h1>
        <DialogBox />
      </div>
      {/* <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
      <input
        type="text"
        placeholder="Search..."
        className="bg-white/20 text-white px-4 py-2 rounded-sm w-full sm:w-2/3 outline-none backdrop-blur-md"
      />
      <DropdownMenuCheckboxes
        triggerClassName="bg-white/30 backdrop-blur-md text-white border-0 hover:text-black w-full sm:w-auto"
        buttonName="Apply Filters"
      />
    </div> */}
      <div>
        {tasks.length === 0 ? (
          <p className="text-white text-center">No tasks yet.</p>
        ) : (
          tasks.map((task) => <TaskList key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
}
