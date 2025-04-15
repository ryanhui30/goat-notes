import Link from "next/link"
import Image from "next/image";
import { shadow } from "@/styles/utils";
import { Button } from "./ui/button";
import DarkModeToggle from "./DarkModeToggle";
import { default as LogOutButton } from "./LogOutButton";
import { getUser } from "@/auth/server";
import { SidebarTrigger } from "./ui/sidebar";

async function Header() {
    const user = await getUser();
    return (
    <header
        className="relative flex h-24 w-full items-center justify-between bg-popover px-3
        sm:px-8"
        style={{
            boxShadow: shadow
        }}
    >

        <SidebarTrigger className="absolute left-1 top-1"/>

        <Link className="flex items-end gap-2" href="/">
            <Image
                src="/goatius.png"
                height={60}
                width={60}
                alt="logo"
                className="rounded-full"
                priority
            />
            <h1 className="flex flex-col pb-1 text-2xl font-semibold leading-6">
                GOAT <span>Notes</span>
            </h1>

        </Link>

        <div className="flex gap-4">
            { user ? (
                <LogOutButton />
            ):
            (
                <>
                <Button asChild>
                    <Link href="/sign-up" className="hidden sm:block">
                        Sign Up
                    </Link>
                </Button>
                <Button asChild variant="outline">
                    <Link href="/login">Login</Link>
                </Button>
                </>
            )}
            <DarkModeToggle />
        </div>
    </header>
  );
};

export default Header
