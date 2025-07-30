import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Button } from "./ui/button";
import { DropdownMenuCheckboxes } from "./DropDown";
import { Trash } from "lucide-react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function TaskList({ task }) {
  const { id, title, description } = task;

  const handleDelete = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this task? "
    );
    if (!confirmDelete) return;

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
    <Card className="max-w-[800px] max-h-[500px] rounded-sm px-5 pt-2 relative mb-5">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 mr-5">
          <CardTitle className=" w-full pb-3 font-bold text-lg">
            {task.title}
          </CardTitle>
          <CardContent className="w-full px-0">
            <p className="text-left">{task.description}</p>
          </CardContent>
        </div>
        <div className="">
          {/* <DropdownMenuCheckboxes buttonName="Select Status" /> */}
          {task.dueDate && (
            <p className="text-sm text-gray-500 mt-2">
              📅 Next Due: {formatDate(task.dueDate)}
              {task.isRepeatable && task.repeatRule?.type && (
                <span className="ml-2 text-xs italic text-blue-500">
                  (Repeats{" "}
                  {task.repeatRule.type === "weekly"
                    ? `every ${["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][task.repeatRule.dayOfWeek]}`
                    : task.repeatRule.type}
                  )
                </span>
              )}
            </p>
          )}
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute bottom-2 right-5 bg-red-300"
        onClick={handleDelete}
      >
        <Trash className="h-5 w-5 text-red-700" />
      </Button>
    </Card>
  );
}
