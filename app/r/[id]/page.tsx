import prisma from "@/app/lib/db"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from 'next/image'
import Link from 'next/link'
import SubDescForm from "@/app/components/SubDescForm";
import { Cake } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";




  async function getData(name:string) {
    const data = await prisma.subreddit.findUnique({
        where: {
            name: name,
        },
        select: {
            name: true,
            createdAt: true,
            description: true,
            userId: true,
        }
    });
    return data;
  }

  


export default async function SubredditRoute({params}: {params: {id:string}}) {
    const data = await getData(params.id);
    const {getUser} = getKindeServerSession();
    const user = await getUser()
    
    return (
        <div className="max-w-[1000px] mx-auto flex mt-4 gap-x-4">
            <div className="w-[65%] flex flex-col gap-y-5">
                <h1>Post section</h1>
            </div>

            <div className="w-[35%] flex flex-col gap-y-3">
                <Card>
                    <div className="bg-muted p-3 font-semibold">About Community</div>
                    <div className="p-4">
                        <div className="flex items-center gap-x-2">
                            <Image src={`https://avatar.vercel.sh/rauchg`} 
                            alt="Img subreddit"
                            className="rounded-full h-14 w-14 p-2"
                            width={50}
                            height={50}
                            />
                            <Link href="/" className="font-semibold">
                                <span className="text-primary">r/</span>{data?.name}
                            </Link>
                        </div>
                        {user?.id === data?.userId ? (
                           <SubDescForm subName={params.id} description={data?.description} />
                        ):(
                            <p className="text-sm font-medium text-secondary-foreground mt-3">{data?.description}</p>
                        )}
                        <div className="flex items-baseline gap-x-2 mt-4">
                            <Cake className="h-4 w-4 text-muted-foreground"/>
                            <p className="font-semibold text-sm">
                                Created: {" "}
                                {
                                    new Date(data?.createdAt as Date).toLocaleDateString("en-us", {
                                        weekday: "long",
                                        year: "numeric",
                                        month:"short",
                                        day:"numeric"
                                    })
                                }
                            </p>
                        </div>
                        <Separator className="my-5"/>
                        <Button asChild className="rounded-xl w-full">
                            <Link href={user?.id ? `/r/${data?.name}` : '/api/auth/login'}>Create a post</Link>
                        </Button>

                    </div>
                </Card>

            </div>

        </div>
    )
}