"use client";
import { useToast } from "@/components/ui/use-toast";
import { Share } from "lucide-react"

export default function ShareLink({id} : {id: string}) {
    const {toast} = useToast();

    async function copyToCB() {
        await navigator.clipboard.writeText(`${location.origin}/post/${id}`);
        toast: ({
            title: "Successfully done",
            description: "Link copied to clipboard"
        })
    }
    return(
        <button className="flex items-center gap-x-1" onClick={copyToCB}>
            <Share className="w-4 h-4 text-muted-foreground"/>
            <p className="text-xs text-muted-foreground font-medium">Share</p>
        </button>
    )
}