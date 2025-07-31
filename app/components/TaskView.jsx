import React from "react";
import { Card, CardContent, CardTitle } from "@components/ui/card";
import { Button } from "@components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@firebase/firebaseConfig";
import AlertDialogBox from "@components/AlertDialogBox";

export default function TaskView({ task }) {
  const { id, title, description } = task;

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "task", id));
      console.log("Task deleted:", id);
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task");
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <Card className="w-full max-w-[800px] rounded-sm px-5 pt-1 relative mb-5 overflow-hidden bg-white/10 shadow-xl backdrop-blur-sm border border-white/20">
      <div className="grid grid-cols-2 gap-4 mb-2 mt-3">
        <div className="col-span-1 pr-4">
          <CardTitle className="text-lg break-words whitespace-normal leading-snug bg font-semibold text-white">
            {title}
          </CardTitle>
        </div>
        <div className="col-span-1 text-right">
          {task.dueDate && (
            <p className="text-sm italic  text-blue-400 mt-1 break-words whitespace-normal">
              {/* 📅 Next Due: {formatDate(task.dueDate)} */}
              Next Due: {formatDate(task.dueDate)}
              {task.isRepeatable && task.repeatRule?.type && (
                <span className="ml-2 text-xs italic text-yellow-500">
                  (Repeats{" "}
                  {task.repeatRule.type === "weekly"
                    ? `every ${
                        [
                          "Sunday",
                          "Monday",
                          "Tuesday",
                          "Wednesday",
                          "Thursday",
                          "Friday",
                          "Saturday",
                        ][task.repeatRule.dayOfWeek]
                      }`
                    : task.repeatRule.type}
                  )
                </span>
              )}
            </p>
          )}
        </div>
        <div className="col-span-2 pr-4">
          <CardContent className="w-full px-0">
            <p className="text-sm/6 text-left break-words whitespace-pre-wrap leading-snug text-white">
              {description}
            </p>
          </CardContent>
        </div>
      </div>
      <AlertDialogBox
        onConfirm={handleDelete}
        trigger={
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-2 right-5"
          >
            <Trash2 className="h-5 w-5 text-gray-400" />
          </Button>
        }
      />
    </Card>
  );
}
