import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@components/ui/tooltip";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Textarea } from "@components/ui/textarea";
import { Lightbulb, Plus } from "lucide-react";
import { useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { auth, db } from "@firebase/firebaseConfig";
import { prepareTaskData } from "@utils/prepareTaskData";
import Spinner from "./Spinner";

export function TaskDialogBox() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = auth.currentUser;

  const handleNewRecord = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!title || !description) return;
    try {
      const userId = user.uid;
      const task = prepareTaskData({ title, description, userId });
      await addDoc(collection(db, "task"), task);
      setLoading(false);
      setOpen(false);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error adding task: ", error);
      alert("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          setLoading(false);
          setTitle("");
          setDescription("");
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" className="font-bold">
          <Plus className="h-5 w-5 text-black font-bold" />
          Create Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleNewRecord}>
          <DialogHeader>
            <div className="flex gap-2 ">
              <DialogTitle className="text-2xl font-bold mb-2">
                Create a new task
              </DialogTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Lightbulb className="w-5 h-5 text-yellow-400 mt-1.5" />
                </TooltipTrigger>
                <TooltipContent className="bg-black max-w-2xs">
                  <p className="text-white text-center font-semibold leading-5">
                    Use{" "}
                    <span className="font-semibold text-blue-600">#tags</span>{" "}
                    to smartly organize your tasks
                    <br />
                    <span className="text-blue-600 ">#today</span>{" "}
                    <span className="text-blue-600 ">#tomorrow</span>{" "}
                    <span className="text-blue-600">#everyday</span>{" "}
                    <span className="text-blue-600">#everymonday</span>{" "}
                    <span className="text-blue-600">#every15th</span>{" "}
                    <span className="text-blue-600">#everyjan1st</span>{" "}
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <DialogDescription>
              Provide information about the task you wish to complete
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 mt-5">
            <div className="grid gap-3">
              <Label htmlFor="title">Task</Label>
              <Input
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Note</Label>
              <Textarea
                id="description"
                required
                value={description}
                className="rounded-sm min-h-[100px]"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="mt-3">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              className=" text-white bg-blue-900 rounded-sm"
            >
              {loading ? <Spinner /> : "Create Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
