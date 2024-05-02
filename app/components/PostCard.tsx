import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowDown, ArrowUp, MessageCircle } from "lucide-react";
import Link from 'next/link'
import Image from 'next/image'
import ShareLink from "./ShareLink";
import { handleVote } from "../actions";

interface iAppProps {
    title: string;
    jsonContent : any;
    id: string;
    subName: string;
    userName: string;
    imgStr: string | null;
    voteCount: number;
};


export default function PostCard({id, imgStr, jsonContent, subName, userName, title, voteCount}: iAppProps ){
    return(
        <Card className="flex relative overflow-hidden">
            <div className="flex flex-col items-center gap-y-2 bg-muted p-3">
                <form action={handleVote}>
                    <input type="hidden" name="voteDirection" value="UP"/>
                    <input type="hidden" name="postId" value={id}/>
                    <Button variant="outline" size="sm" type="submit">
                        <ArrowUp className="w-4 h-4"/>
                    </Button>
                </form>
                {voteCount}
                <form action={handleVote}>
                <input type="hidden" name="voteDirection" value="DOWN"/>
                <input type="hidden" name="postId" value={id}/>

                    <Button variant="outline" size="sm" type="submit">
                        <ArrowDown className="w-4 h-4"/>
                    </Button>
                </form>
            </div>
            <div>
                    <div className="flex items-center gap-x-3 p-3">
                        <Link className="font-semibold text-xs" href={`/r/${subName}`}>r/{subName}</Link>
                        <p className="text-xs text-muted-foreground">Posted by: <span className="hover:text-primary">r/jazzy-vibes-4u</span></p>
                    </div>

                    <div className="px-2">
                        <Link href="/">{title}</Link>
                    </div>
                    <div className="max-h-[300px] overflow-hidden">
                        {imgStr && (
                            <Image src={imgStr} alt="Banner post img" width={600} height={300}
                            className="w-full h-full mt-2"
                            />
                        )}
                    </div>
                    <div className="m-3 flex items-center gap-x-3">
                        <div className="flex items-center gap-x-1">
                            <MessageCircle className="h-4 w-4 text-muted-foreground"/> 
                            <p className="text-xs text-muted-foreground">3 comments</p>
                        </div>
                        <ShareLink id={id}/>
                    </div>
                </div>

        </Card>
    )
}