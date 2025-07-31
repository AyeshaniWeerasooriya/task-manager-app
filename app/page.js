"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@context/AuthContext";
import { db } from "@firebase/firebaseConfig";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { TaskDialogBox } from "@components/TaskDialogBox";
import TaskView from "@components/TaskView";
import { ScrollArea } from "@components/ui/scroll-area";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { Button } from "./components/ui/button";
import { getAuth, signOut } from "firebase/auth";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
      return;
    }

    const q = query(
      collection(db, "task"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksData);
    });

    return () => unsubscribe();
  }, [user, router]);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      router.replace("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto w-full py-10">
      <div className="flex flex-col-3 sm:flex-row justify-between items-center gap-4 mb-8 border-b pb-6">
        <h1 className="text-white text-3xl  font-bold text-center sm:text-left">
          Get things done.
        </h1>
        <div className="flex items-center gap-4">
          <TaskDialogBox />
          <LogOut className=" text-white w-5 h-5" onClick={handleLogout} />
        </div>
      </div>
      <ScrollArea className=" w-full h-[78vh]">
        <div className="p-4 pr-4">
          {tasks.length === 0 ? (
            <div>
              <h4 className="text-white text-center mb-6 text-xl">
                Your task list is empty
              </h4>
              <img
                src="/empty-task.svg"
                alt="No tasks illustration"
                className="mx-auto w-65 h-auto opacity-50"
              />
            </div>
          ) : (
            //
            tasks.map((task) => <TaskView key={task.id} task={task} />)
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
