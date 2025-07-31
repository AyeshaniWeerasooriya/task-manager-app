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
      // Filter tasks where userId matches current user
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

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto w-full py-10">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 border-b pb-6">
        <h1 className="text-white text-3xl sm:text-4xl font-bold text-center sm:text-left">
          Get things done.
        </h1>
        <TaskDialogBox />
      </div>
      <ScrollArea className=" w-full h-[78vh]">
        <div className="p-4 pr-4">
          {tasks.length === 0 ? (
            <p className="text-white text-center">No tasks yet.</p>
          ) : (
            tasks.map((task) => <TaskView key={task.id} task={task} />)
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
