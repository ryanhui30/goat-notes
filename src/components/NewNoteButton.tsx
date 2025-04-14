"use client";

import { User } from "@supabase/supabase-js";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { createNoteAction } from "@/actions/notes";
import { toast } from "sonner";

type Props = {
  user: User | null;
};

function NewNoteButton({ user }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClickNewNoteButton = async () => {
    if (!user) {
      router.push("/login");
    } else {
      setLoading(true);
      const uuid = uuidv4();

      try {
        const result = await createNoteAction(uuid);

        if (result.errorMessage) {
          throw new Error(result.errorMessage);
        }

        toast.success("New note created", {
          description: "You have created a new note.",
        });

        router.push(`/?noteId=${uuid}&toastType=newNote`);
      } catch (error) {
        toast.error("Failed to create note", {
          description: error instanceof Error ? error.message : "Unknown error occurred",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Button
      onClick={handleClickNewNoteButton}
      variant="secondary"
      className="w-24"
      disabled={loading}
    >
      {loading ? <Loader2 className="animate-spin" /> : "New Note"}
    </Button>
  );
}

export default NewNoteButton;
