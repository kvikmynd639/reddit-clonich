"use client";
import { SaveBtn } from "./SubmitBtns";
import { Textarea } from "@/components/ui/textarea";
import { updateSubredditDesc } from "../actions";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

interface iAppProps {
    subName: string;
    description: string | null | undefined;

}
const initialState = {
    status: "",
    message: "",
}

export default function SubDescForm({subName, description}: iAppProps) {
    const [state, formAction] = useFormState(updateSubredditDesc, initialState)
    const {toast} = useToast();
    useEffect(()=> {
        if(state.status === "green") {
            toast({
                title: "Success",
                description: state.message
            })
        }
        else {
            toast({
                title: "Error",
                description: state.message,
                variant: "destructive"
            })
        }
    }, [state, toast])
    return(
        <>
        <form className="mt-4" action={formAction}>
                <input type="hidden" name="subName" value={subName}/>
                <Textarea placeholder="Tell us more about your community..." 
                    maxLength={300}
                    name="description"
                    defaultValue={description ?? undefined}/>
                <SaveBtn/>
            </form>
        
        </>
    )

}