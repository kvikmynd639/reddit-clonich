"use client";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

export function SubmitBtn({text}: {text:string}) {
    const {pending} = useFormStatus()
    return(
        <>
        {pending ? (
            <Button disabled>
                <Loader2 className="w-4 h-4 mr-2 animate-spin"/>
                Loading...
            </Button>
        ):
        (
            <Button type="submit">{text}</Button>
        )}
        
        </>
    )
}




export function SaveBtn() {
    const {pending} = useFormStatus()
    return (
        <>
        {pending ? (
            <Button disabled>
                <Loader2 className="w-full h-4 mr-2 mt-2 animate-spin"/>
                Please wait
            </Button>

        ): (
            <Button type="submit" className="w-full h-10 mt-2">Save</Button>
        )}

        </>

    )

}