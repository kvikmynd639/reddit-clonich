"use server"
import {redirect} from 'next/navigation'
import { Prisma } from '@prisma/client'
import prisma from './lib/db'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export async function updateUserName(prevState: any, formData: FormData) {
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user) {
        return redirect("/api/auth/login")
    }

    const username = formData.get("username") as string
   
    try {
        await prisma.user.update({
            where:{
                id: user.id,
            },
            data: {
                userName: username,
            },
        });
        return {
            message: "Successfully updated",
            status: "green",
        }
        
    } catch (e) {
        if(e instanceof Prisma.PrismaClientKnownRequestError){
            if(e.code === 'P2002') {
                return {
                    message: "The username is already taken",
                    status: "error",
                }
            }
        }
        throw(e)
    }
}






export async function createCommunity(prevState: any,formData: FormData) {
    const{getUser} = getKindeServerSession()
    const user = await getUser();
    
    if(!user) {
        return redirect("/api/auth/login")
    }

    try {
    const name = formData.get("name") as string;

    const data = await prisma.subreddit.create( {
        data:{
            userId: user.id,
            name: name,
        }
    });

    return redirect('/')
    }
    catch(e) {
        if(e instanceof Prisma.PrismaClientKnownRequestError){
            if(e.code === 'P2002') {
                return {
                    message: "The community name is already taken",
                    status: "error",
                }
            }
        }
        throw e

    }

}

export async function updateSubredditDesc(prevState: any, formData: FormData) {
    const{getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user) {
        return redirect('/api/auth/login')
    }
    try {
        const subName = formData.get("subName") as string;
        const description = formData.get("description") as string;

        await prisma.subreddit.update({
            where: {
              name: subName,
           },
            data: {
              description: description,
             }
         })
         return {
            status: "green",
            message:"Successfully updated description"
         }
        
    } catch (e) {
        return{
            message:"Sorry, sth went wrong",
            status: "error"
        }
        throw e
        
    }
}