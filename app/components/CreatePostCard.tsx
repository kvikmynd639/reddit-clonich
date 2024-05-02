import { Card } from "@/components/ui/card";
import Image from "next/image";
import redditFella from '../../public/character.png'
import {Input} from '@/components/ui/input'
import Link from 'next/link'
import { ImageDown, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CreatePostCard() {
    return(
        <Card className="px-5 py-3 flex items-center gap-x-3">
            <Image src={redditFella} alt="reddit dude" className="h-12 w-12" />
            <Link href="/r/jazzy-vibes-4u/create" className="w-full">
                <Input placeholder="Tell us what's happening today"/>
            </Link>

            <div className="flex items-center gap-x-1">
                <Button variant="outline" size="icon">
                    <Link href="/r/jazzy-vibes-4u/create">
                        <ImageDown className="w-4 h-4"/>
                    </Link>
                </Button>

                <Button variant="outline" size="icon">
                    <Link href="/r/jazzy-vibes-4u/create">
                        <Link2 className="w-4 h-4"/>
                    </Link>
                </Button>

            </div>

        </Card>
    )
}