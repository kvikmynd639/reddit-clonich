"use server"
import {redirect} from 'next/navigation'
import { Prisma, VoteType } from '@prisma/client'
import prisma from './lib/db'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { JSONContent } from '@tiptap/react'
import { revalidatePath } from 'next/cache'

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


export async function createPost({jsonContent}: {jsonContent:JSONContent | null}, formData: FormData) {
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user) {
        return redirect("/api/auth/login");
    }
    const title = formData.get('title') as string;
    const imgUrl = formData.get('imgUrl') as string | null;
    const subName =formData.get('subName') as string;

    await prisma.post.create({
        data:{
            title: title,
            imgStr: imgUrl ?? undefined,
            subName: subName,
            userId: user.id,
            textContent: jsonContent ?? undefined


        }
    });
    return redirect("/")

}


export async function handleVote(formData: FormData) {
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user) {
        return redirect('/api/auth/login')
    }

    const postId = formData.get('postId') as string;
    const voteDirection = formData.get('voteDirection') as VoteType;

    const vote = await prisma.vote.findFirst({
        where: {
            postId: postId,
            userId: user.id
        }
    });
    if(vote) {
        if(vote.voteType === voteDirection) {
            await prisma.vote.delete({
                where: {
                    id: vote.id,

                }
            })
            revalidatePath("/")
        }
      
        else {
            await prisma.vote.update({
                where:{
                    id:vote.id,
                },
                data: {
                    voteType: voteDirection,

                }
            })
        }
    }

    await prisma.vote.create({
        data:{
            voteType: voteDirection,
            userId: user.id,
            postId: postId

        }
    })
}