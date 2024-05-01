import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
import { MenuIcon } from "lucide-react";
import Link from 'next/link'
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";



interface userProps {
    userImg : string | null,

}


export function UserDropdown({userImg}: userProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="rounded-full border p-2 lg:p-4 items-center flex gap-x-4">
                    <MenuIcon className="w-8 h-8 lg:h-6 lg:w-6"/>
                    <img src={userImg?? "https://cdn-icons-png.flaticon.com/512/7153/7153150.png" }
                    alt="user img"
                    className="w-9 h-9 rounded-full hidden lg:block"
                    />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[230px]">
                <DropdownMenuItem>
                    <Link href="/r/create" className="w-full">Create a Community</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/r/post" className="w-full">Create a Post</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/settings" className="w-full">Settings</Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator/>

                <DropdownMenuItem>
                    <LogoutLink className="w-full">Log Out</LogoutLink>

                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    );
};