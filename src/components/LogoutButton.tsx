"use client";

import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner"; // Import `toast` directly from "sonner"
import { useRouter } from "next/navigation";

function LogoutButton () {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogOut = async () => {
        setLoading(true)

        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));

            const errorMessage = null;

            if (errorMessage) {
              throw new Error(errorMessage);
            }

            toast.success("You have been successfully logged out", {
              description: "Logged out",
            });
            router.push("/");

          } catch (error) {
            toast.error("Failed to log out", {
              description: error instanceof Error ? error.message : "Unknown error occurred",
            });
          } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            variant="outline"
            onClick={handleLogOut}
            className="w-24"
        >
            {loading ? <Loader2 className="animate-spin" /> : "Log Out"}
        </Button>
    );
}

export default LogoutButton;
