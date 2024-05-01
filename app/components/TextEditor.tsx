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
            <Button type='button' onClick={()=> editor.chain().focus().toggleHeading({level:1}).run()} variant="secondary">H1</Button>
            <Button type='button' onClick={()=> editor.chain().focus().toggleHeading({level:2}).run()} variant="secondary">H2</Button>
            <Button type='button' onClick={()=> editor.chain().focus().toggleHeading({level:3}).run()} variant="secondary">H3</Button>
            <Button type='button' onClick={()=> editor.chain().focus().toggleBold().run()} variant="secondary">B</Button>
            <Button type='button' onClick={()=> editor.chain().focus().toggleItalic().run()} variant="secondary">I</Button>
            <Button type='button' onClick={()=> editor.chain().focus().toggleStrike().run()} variant="secondary">Strike</Button>

        </div>

)
};

export function TextEditor() {
    const editor = useEditor({
        extensions: [StarterKit],
        content: '<p>Hello world</p>',
        editorProps: {
            attributes: {
                class: "prose",
            }
        }
    });
    return(
        <div>
            <Menubar editor={editor}/>
            <EditorContent editor={editor} className='rounded-lg border p-2 my-2 min-h-[200px]'/>
        </div>
    )
}