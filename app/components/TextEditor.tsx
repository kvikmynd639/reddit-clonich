'use client'

import { Editor, EditorContent, JSONContent, useEditor } from '@tiptap/react'
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

export function TextEditor({setJson, json} :{setJson:any, json:JSONContent | null}) {
    const editor = useEditor({
        extensions: [StarterKit],
        content: json ?? '<p>Hello world</p>',
        editorProps: {
            attributes: {
                class: "prose",
            }
        },
        onUpdate: ({editor}) => {
            const json = editor.getJSON();
            setJson(json);
        }
    });
    return(
        <div>
            <Menubar editor={editor}/>
            <EditorContent editor={editor} className='rounded-lg border p-2 my-2 min-h-[200px]'/>
        </div>
    )
}