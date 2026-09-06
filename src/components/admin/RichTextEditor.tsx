"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { useCallback } from "react";

export function RichTextEditor({ value, onChange }: { value: string; onChange: (html: string) => void }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: false }),
      Highlight.configure({ multicolor: true }),
      TextStyle,
      Color,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const addImage = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      if (input.files?.length) {
        const file = input.files[0];
        const formData = new FormData();
        formData.append("file", file);
        
        try {
          // You might want to show a loading toast here
          const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });
          const json = await res.json();
          if (res.ok && json.url && editor) {
            editor.chain().focus().setImage({ src: json.url }).run();
          } else {
            alert("Upload failed: " + (json.error || "Unknown error"));
          }
        } catch (error) {
          alert("Upload failed");
        }
      }
    };
    input.click();
  }, [editor]);

  const addLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);
    
    // cancelled
    if (url === null) {
      return;
    }
    
    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div style={{ border: "1px solid #d1d5db", borderRadius: "8px", overflow: "hidden", background: "#fff" }}>
      <div style={{ padding: "0.5rem", borderBottom: "1px solid #d1d5db", display: "flex", gap: "0.5rem", flexWrap: "wrap", background: "#f9fafb" }}>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          style={{ padding: "0.25rem 0.5rem", borderRadius: "4px", background: editor.isActive("bold") ? "#e5e7eb" : "transparent", cursor: "pointer", border: "none" }}
        >
          <b>B</b>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          style={{ padding: "0.25rem 0.5rem", borderRadius: "4px", background: editor.isActive("italic") ? "#e5e7eb" : "transparent", cursor: "pointer", border: "none" }}
        >
          <i>I</i>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          style={{ padding: "0.25rem 0.5rem", borderRadius: "4px", background: editor.isActive("strike") ? "#e5e7eb" : "transparent", cursor: "pointer", border: "none" }}
        >
          <s>S</s>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          style={{ padding: "0.25rem 0.5rem", borderRadius: "4px", background: editor.isActive("heading", { level: 2 }) ? "#e5e7eb" : "transparent", cursor: "pointer", border: "none", fontWeight: 600 }}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          style={{ padding: "0.25rem 0.5rem", borderRadius: "4px", background: editor.isActive("heading", { level: 3 }) ? "#e5e7eb" : "transparent", cursor: "pointer", border: "none", fontWeight: 600 }}
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          style={{ padding: "0.25rem 0.5rem", borderRadius: "4px", background: editor.isActive("bulletList") ? "#e5e7eb" : "transparent", cursor: "pointer", border: "none" }}
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          style={{ padding: "0.25rem 0.5rem", borderRadius: "4px", background: editor.isActive("blockquote") ? "#e5e7eb" : "transparent", cursor: "pointer", border: "none" }}
        >
          &quot; Quote
        </button>
        <button
          type="button"
          onClick={addLink}
          style={{ padding: "0.25rem 0.5rem", borderRadius: "4px", background: editor.isActive("link") ? "#e5e7eb" : "transparent", cursor: "pointer", border: "none" }}
        >
          🔗 Link
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          style={{ padding: "0.25rem 0.5rem", borderRadius: "4px", background: editor.isActive("highlight") ? "#e5e7eb" : "transparent", cursor: "pointer", border: "none" }}
        >
          🖍️ Highlight
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", padding: "0 0.5rem" }}>
          <span style={{ fontSize: "0.85rem", color: "#6b7280" }}>Color:</span>
          <input
            type="color"
            onInput={(e) => editor.chain().focus().setColor((e.target as HTMLInputElement).value).run()}
            value={editor.getAttributes("textStyle").color || "#000000"}
            style={{ width: "24px", height: "24px", padding: 0, border: "none", cursor: "pointer" }}
          />
        </div>
        <button
          type="button"
          onClick={addImage}
          style={{ padding: "0.25rem 0.5rem", borderRadius: "4px", background: "transparent", cursor: "pointer", border: "none" }}
        >
          🖼️ Image
        </button>
      </div>
      <div style={{ padding: "1rem", minHeight: "300px", color: "#111827" }}>
        <EditorContent editor={editor} className="tiptap-editor" />
      </div>
    </div>
  );
}
