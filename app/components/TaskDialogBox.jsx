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
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Textarea } from "@components/ui/textarea";
import { Plus } from "lucide-react";
import { useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { auth, db } from "@firebase/firebaseConfig";
import { prepareTaskData } from "@utils/prepareTaskData";

export function TaskDialogBox() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);

  const user = auth.currentUser;

  const handleNewRecord = async (e) => {
    e.preventDefault();
    if (!title || !description) return;
    console.log("Submitting Task:", { title, description });

    try {
      const userId = user.uid;
      const task = prepareTaskData({ title, description, userId });
      await addDoc(collection(db, "task"), task);
      setTitle("");
      setDescription("");
      setOpen(false);
    } catch (error) {
      console.error("Error adding task: ", error);
      alert("Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="font-bold">
          <Plus className="h-5 w-5 text-black font-bold" />
          Create Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleNewRecord}>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-2">
              Create a new task
            </DialogTitle>
            <DialogDescription>
              Provide information about the task you wish to complete
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 mt-5">
            <div className="grid gap-3">
              <Label htmlFor="title">Task Title</Label>
              <Input
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Task Description</Label>
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
              onSubmit={() => setOpen(true)}>
              Create Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
