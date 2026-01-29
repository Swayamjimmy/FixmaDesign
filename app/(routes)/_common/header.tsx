"use client"

import { useTheme } from "next-themes"
import Logo from "../../../components/logo";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { cn } from "../../../lib/utils";

const Header = () => {
    const { theme, setTheme } = useTheme();
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
                    <Button>Sign In</Button>
                </div>
            </div>
        </header>
        </div>
  )
}

export default Header