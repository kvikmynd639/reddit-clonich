"use client"
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import Image from 'next/image'
import redDude from '../../../../public/character.png'
import Link from 'next/link'
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs";
import { Text, Video } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TextEditor } from "@/app/components/TextEditor";
import { SubmitBtn } from "@/app/components/SubmitBtns";
import { UploadDropzone } from "@uploadthing/react";
import { useState } from "react";
import { createPost } from "@/app/actions";
import { JSONContent } from "@tiptap/react";


const redditRules = [
    { id: 1, text: "Be respectful to other users. No personal attacks, insults, hate speech, or harassment." },
    { id: 2, text: "Do not engage in spamming, trolling, or any other form of disruptive behavior." },
    { id: 3, text: "Follow the guidelines of each subreddit you participate in." },
    { id: 4, text: "Do not post or share personal information of others without their consent." },
    { id: 5, text: "Respect the Reddit platform by not engaging in vote manipulation or other forms of cheating." },
    { id: 6, text: "Do not post illegal content or content that violates Reddit's content policy." },
    { id: 7, text: "Use appropriate language and content tags when necessary." },
    { id: 8, text: "Report any violations of these rules to the moderators." },
    { id: 9, text: "These rules are subject to change and enforcement at the discretion of Reddit administrators and subreddit moderators." }
  ];
  

export default function CreatePostRoute({params}: {params: {id:string}}) {
    const[title, setTitle] = useState<null | string>(null)
    
    const [imgUrl, setImgUrl] = useState<null | string>(null);
    const [json, setJson]  = useState<null | JSONContent>(null)

    const createRedditPost = createPost.bind(null, {jsonContent: json})

    return(
        <div className="max-w-[1000px] mx-auto mt-4 flex gap-x-4">
            <div className="w-[65%] flex flex-col gap-y-5">
                <h1>Subreddit: <Link href={`/r/${params.id}`} className="text-primary font-semibold">r/{params.id}</Link></h1>
                <Tabs defaultValue="post" className="w-full">
                    <TabsList className="w-full grid grid-cols-2">
                        <TabsTrigger value="post">
                            <Text className="w-4 h-4 mr-2"/>
                            Post
                        </TabsTrigger>
                        <TabsTrigger value="media">
                            <Video className="w-4 h-4 mr-2"/>
                            Media
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="post">
                        <Card>
                            <form action={createRedditPost}>
                                <input type="hidden" name="imgUrl" value={imgUrl ?? undefined}/>
                                <input type="hidden" name="subName" value={params.id}/>
                                <CardHeader>
                                    <Label>Post name </Label>
                                    <Input required name="title" placeholder="Create a new post" 
                                    value={title ?? undefined} 
                                    onChange={(e) => setTitle(e.target.value)}/>
                                    <TextEditor setJson={setJson} json={json}/>
                                </CardHeader>
                                <CardFooter>
                                    <SubmitBtn text="Submit post"/>
                                </CardFooter>
                            </form>
                           
                        </Card>

                    </TabsContent>
                    <TabsContent value="media">
                        <Card>
                            <CardHeader>
                               {imgUrl === null ? (
                                 <UploadDropzone 
                                 className="ut-button:bg-primary ut-button:ut-readying:bg-primary/50 ut-label:text-primary 
                                 ut-button:ut-uploading:bg-primary/50 ut-button:ut-uploading:after:bg-primary"
                                 onClientUploadComplete={(res) => {
                                     setImgUrl(res[0].url)
                                 }}
                                 endpoint="imageUploader" 
                                 onUploadError={(error: Error) => {alert("Error")}}
                                 />
                               ) : (
                                <Image src={imgUrl} alt="Img for reddit" 
                                width={500} 
                                height={350}
                                className="h-80 rounded-lg w-full object-contain"/>
                               )}
                            </CardHeader>
                        </Card>

                    </TabsContent>

                </Tabs>
            </div>
            <div className="w-[35%]">
                <Card className="flex flex-col p-4">
                    <div className="flex flex-row items-center gap-x-5">
                        <Image src={redDude} 
                        alt="reddit character"
                        className="h-12 w-12"/>
                        <h2 className="font-semibold">Reddit Policy</h2>
                    </div>
                    <Separator className="my-5"/>
                    <div className="flex flex-col gap-y-3 mt-2">
                        {redditRules.map((item) => (
                            <div key={item.id}>
                                <p className="text-sm font-medium"> {item.id}. {item.text}</p>

                            </div>
                            ))}
                    </div>
                </Card>

            </div>

        </div>
    );
}