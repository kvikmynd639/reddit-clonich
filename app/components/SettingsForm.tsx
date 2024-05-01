"use client"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button';
import { updateUserName } from "../actions";
import {SubmitBtn} from "./SubmitBtns";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";



const initialState = {
    message: "",
    status: "",
};

export function SettingsForm(
     { username,

}: 
    { username: string | null | undefined})
{
    const [state, formAction]= useFormState(updateUserName, initialState);
    const {toast} = useToast();

    useEffect(() => {
        if(state?.status === "green") {
            toast({
                title: "Successful",
                description: state.message
            }) }
            else if(state?.status === "error") {
                toast({
                    title: "Error",
                    description: state.message,
                    variant: "destructive",
                })
            }
        

    }, [state, toast])
    return(
        <form action={formAction}>
            <h1 className="text-2xl lg:text-3xl font-semibold tracking-normal">Settings</h1>
            <Separator className="my-6"/>
            <Label className="text-md lg:text-lg">Username</Label>
            <p className="text-muted-foreground">Here you can change your username for the better</p>
            <Input defaultValue={username?? undefined} name="username" required className="mt-2" min={2} maxLength={23}/>

            <div className="w-full flex flex-col md:flex-row lg:flex-row gap-x-4 justify-end mt-4">
                <SubmitBtn text="Update Username"/>
                <Button variant="secondary">Cancel</Button>
            </div>
        </form>
    )
}