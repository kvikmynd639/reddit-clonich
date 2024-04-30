import RedditLogo from '../../public/reddit-logo.svg';
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ModeToggle } from './ThemeToggle';
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { LogOut, User } from 'lucide-react';

import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { MenuIcon } from "lucide-react";
import { UserDropdown } from './Dropdown';




export async function Navbar() {
    const {getUser} = getKindeServerSession()
    const user  = await getUser();


    return(
    <>
       <nav className='h-[13vh] w-full flex items-center justify-between border-b px-5 lg:px-15'>
        <Link href="/" className='items-center flex gap-x-6'>
            <Image src={RedditLogo} alt='reddit image' className='h-10 w-fit'/>
        </Link>
            
        <div className='items-center flex flex-row gap-x-4'>
            {user ? (
                <div className='flex flex-row items-center gap-x-2'>
                   <Button>Log Out</Button>
                   <UserDropdown userImg={user.picture}/> 
                </div>
            ) : (
                
            <div className='items-center flex flex-row gap-x-4'>
                <Button variant='secondary' asChild><RegisterLink>Sign Up</RegisterLink></Button> 
                <Button asChild><LoginLink>Log In</LoginLink></Button>    
            </div>   
            )}
            <ModeToggle/>
            

        </div>    
        
        
       </nav>
       </>
    )
}