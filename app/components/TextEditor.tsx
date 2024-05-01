'use client'

import { EditorContent, useEditor, type Editor } from '@tiptap/react'
import { Button } from '@/components/ui/button';
import StarterKit from '@tiptap/starter-kit'

export const Menubar = ({editor} : {editor : Editor | null }) => {
    if(!editor) {
        return null;
    }

    return (
        <div className="flex flex-wrap gap-6">
            <Button type='button'>H1</Button>
        </div>

)
};

export function TextEditor() {
    const editor = useEditor({
        extensions: [StarterKit],
        content: '<p>Hello world</p>'
    });
    return(
        <div>
            <Menubar editor={editor}/>
            <EditorContent editor={editor} className='rounded-lg border p-2 my-2 min-h-[200px]'/>
        </div>
    )
}