'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Underline from '@tiptap/extension-underline'
import Heading from '@tiptap/extension-heading'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import Blockquote from '@tiptap/extension-blockquote'
import Link from '@tiptap/extension-link'

import { useEffect } from 'react'
import styles from 'app/styles/admin.module.css'

export interface EditorProps {
  content: string
  onChange: (value: string) => void
}

export default function Editor({ content, onChange }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      OrderedList,
      ListItem,
      Blockquote,
      Link
    ],
    content,
    editorProps: {
      attributes: {
        class: styles.editorContent || 'tiptap-editor'
      }
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    immediatelyRender: false
  })

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [editor, content])

  if (!editor) return <p>Загрузка редактора...</p>

  return (
    <>
      <div className={styles.toolbar}>
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          <b>B</b>
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          <i>I</i>
        </button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()}>U</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>• Список</button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. Список</button>
        <button onClick={() => editor.chain().focus().toggleBlockquote().run()}>Цитата</button>
        <button onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}>
          Очистить
        </button>
      </div>
      <EditorContent editor={editor} />
    </>
  )
}
