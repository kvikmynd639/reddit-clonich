import { Card } from "@/components/ui/card";
import Image from 'next/image';
import Banner from '../public/reddit-banner.webp';
import Hero from '../public/reddit-dude.png'
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from 'next/link'
import CreatePostCard from "./components/CreatePostCard";
import prisma from "./lib/db";
import PostCard from "./components/PostCard";

async function getData() {
  const data = await prisma.post.findMany({

    select: {
      title:true,
      createdAt: true,
      textContent:true,
      id: true,
      imgStr: true,
      User : {
        select:{
          userName: true,

        }
      },
      subName: true
    }
  })
  return data;
}



export default async function Home() {
  const data = await getData();
  return (
    <div className="max-w-[1000px] mx-auto flex gap-x-12 mt-4">
      <div className="w-[65%] flex flex-col gap-y-4">
        <CreatePostCard />
        {data.map((post) => (
            <PostCard key={post.id} 
            id={post.id} 
            imgStr={post.imgStr} 
            jsonContent={post.textContent} 
            subName={post.subName as string} 
            title={post.title}
            userName={post.User?.userName as string}
            />
          ))}
      </div>

      <div className="w-[35%]">
        <Card>
          <Image src={Banner} alt="reddit banner"/>
          <div className="p-3">
            <div className="flex gap-x-4 items-center">
              <Image src={Hero} alt="hero img" className="h-22 w-14 -mt-12 "/>
              <h1 className="font-medium pl-3">Heim</h1>
              
            </div>
            <p className="text-sm text-muted-foreground pt-3">Check out what's new in the community!</p>
            <Separator className="my-4"/>
            <div className="flex flex-col w-full gap-y-4">
               <Button className="rounded-lg" variant="secondary" asChild><Link href="/r/jazzy-vibes-4u/create">Create Post</Link></Button>
               <Button className="rounded-lg"asChild><Link href="/r/create">Create Community</Link></Button>
            </div>
            
          </div>

        </Card>
      </div>

    </div>
  );
}
