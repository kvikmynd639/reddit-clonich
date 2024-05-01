"use client"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button';
import { createCommunity } from "@/app/actions";
import { useFormState } from "react-dom";
import {useEffect} from 'react'
import { useToast } from "@/components/ui/use-toast";
import {SubmitBtn} from "@/app/components/SubmitBtns";

const initialState = {
    message: "",
    status: ""
}

export default function SubredditPage() {
    const[state, formAction] =useFormState(createCommunity, initialState)
    const { toast } = useToast()
    useEffect(()=>{
        if(state.status === "error") {
            toast({
                title: "Error",
                description: state.message,
                variant: "destructive"
            })
        }

    }, [state])
    return(
        <div className="max-w-[1000px] flex flex-col mx-auto mt-4">
            <form action={formAction}>
                <h1 className="text-2xl font-bold tracking-wide">Create a Community</h1>
                <Separator className="my-4"/>
                <Label className="text-lg">Name</Label>
                <p className="text-muted-foreground text-md">Community name cannot be changed</p>

                <div className="relative mt-3">
                    <p className="text-muted-foreground absolute left-0 w-8 flex items-center justify-center h-full">
                        r/
                    </p>
                    <Input 
                    name="name"
                    required
                    className="pl-6"
                    minLength={2}
                    maxLength={20}
                    />
                    <p className="mt-2 text-red-500">{state.message}</p>
                </div>
                <div className="w-full flex flex-col md:flex-row lg:flex-row gap-x-4 justify-end mt-4">
                    <SubmitBtn text="Create Community"/>
                    <Button variant="secondary">Cancel</Button>
               </div>
            </form>
            
        </div>
    )
}