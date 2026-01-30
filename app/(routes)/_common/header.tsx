"use client"
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs"
import { useTheme } from "next-themes"
import Logo from "../../../components/logo";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import { LogOutIcon, MoonIcon, SunIcon } from "lucide-react";
import { cn } from "../../../lib/utils";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
    const { theme, setTheme } = useTheme();
    const {user} = useKindeBrowserClient();
    const isDark = theme === "dark";
    
  return (
    <div className="sticky top-0 right-0 left-0 z-30">
        <header className="h-16 border-b bg-background py-4">
            <div className="w-full max-w-6xl mx-auto px-4 flex items-center justify-between">
                <Logo/>
                <div className="hidden flex-1 items-center justify-center gap-8 md:flex">
                    <Link href="/" className="text-foreground-muted text-sm">
                    Home
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-end gap-3">
                    <Button variant="outline" size="icon" className="relative rounded-full h-8 w-8" onClick={() => setTheme(isDark ? "light" : "dark")}>
                        <SunIcon className={cn('absolute h-5 w-5 transition-all', isDark ? "scale-100" : "scale-0")}/>
                        <MoonIcon className={cn("absolute h-5 w-5 transition-all", isDark ? "scale-0" : "scale-100")}/>
                    </Button>
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="outline-none focus:outline-none">
                                    <Avatar className="h-8 w-8 shrink-0 rounded-full cursor-pointer">
                                        <AvatarImage
                                        src={user?.picture || ""}
                                        alt={user?.given_name || ""}
                                        />
                                        <AvatarFallback>
                                            {user?.given_name?.charAt(0)}
                                            {user?.family_name?.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem asChild>
                                    <LogoutLink className="w-full flex items-center gap-2 cursor-pointer">
                                        <LogOutIcon className="size-4" />
                                        Logout
                                    </LogoutLink>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ): (
                    <LoginLink>
                        <Button>Sign In</Button>
                    </LoginLink>
                    )}
          
                </div>
            </div>
        </header>
        </div>
  )
}

export default Header