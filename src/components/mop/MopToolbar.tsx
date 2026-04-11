"use client";

import type { Editor } from "@tiptap/core";
import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  Underline,
} from "lucide-react";

type MopToolbarProps = {
  editor: Editor | null;
};

const btnClass = (active: boolean) =>
  active
    ? "rounded bg-primary px-2 py-1.5 text-white"
    : "rounded bg-gray-100 px-2 py-1.5 text-gray-700 hover:bg-gray-200";

export const MopToolbar = ({ editor }: MopToolbarProps) => {
  return (
    <div
      className="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-gray-50 px-2 py-2"
      role="toolbar"
      aria-label="MOP formatting"
    >
      <button
        type="button"
        className={btnClass(editor?.isActive("bold") ?? false)}
        aria-pressed={editor?.isActive("bold") ?? false}
        onClick={() => editor?.chain().focus().toggleBold().run()}
        disabled={!editor}
        aria-label="Bold"
        title="Bold"
      >
        <Bold className="h-4 w-4" />
      </button>
      <button
        type="button"
        className={btnClass(editor?.isActive("italic") ?? false)}
        aria-pressed={editor?.isActive("italic") ?? false}
        onClick={() => editor?.chain().focus().toggleItalic().run()}
        disabled={!editor}
        aria-label="Italic"
        title="Italic"
      >
        <Italic className="h-4 w-4" />
      </button>
      <button
        type="button"
        className={btnClass(editor?.isActive("underline") ?? false)}
        aria-pressed={editor?.isActive("underline") ?? false}
        onClick={() => editor?.chain().focus().toggleUnderline().run()}
        disabled={!editor}
        aria-label="Underline"
        title="Underline"
      >
        <Underline className="h-4 w-4" />
      </button>
      <span className="mx-1 h-5 w-px bg-gray-300" aria-hidden="true" />
      <button
        type="button"
        className={btnClass(editor?.isActive("bulletList") ?? false)}
        aria-pressed={editor?.isActive("bulletList") ?? false}
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
        disabled={!editor}
        aria-label="Bullet list"
        title="Bullet list"
      >
        <List className="h-4 w-4" />
      </button>
      <button
        type="button"
        className={btnClass(editor?.isActive("orderedList") ?? false)}
        aria-pressed={editor?.isActive("orderedList") ?? false}
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        disabled={!editor}
        aria-label="Numbered list"
        title="Numbered list"
      >
        <ListOrdered className="h-4 w-4" />
      </button>
      <span className="mx-1 h-5 w-px bg-gray-300" aria-hidden="true" />
      <button
        type="button"
        className={btnClass(editor?.isActive("heading", { level: 1 }) ?? false)}
        aria-pressed={editor?.isActive("heading", { level: 1 }) ?? false}
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 1 }).run()
        }
        disabled={!editor}
        aria-label="Heading 1"
        title="Heading 1"
      >
        <Heading1 className="h-4 w-4" />
      </button>
      <button
        type="button"
        className={btnClass(editor?.isActive("heading", { level: 2 }) ?? false)}
        aria-pressed={editor?.isActive("heading", { level: 2 }) ?? false}
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 2 }).run()
        }
        disabled={!editor}
        aria-label="Heading 2"
        title="Heading 2"
      >
        <Heading2 className="h-4 w-4" />
      </button>
      <button
        type="button"
        className={btnClass(editor?.isActive("heading", { level: 3 }) ?? false)}
        aria-pressed={editor?.isActive("heading", { level: 3 }) ?? false}
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 3 }).run()
        }
        disabled={!editor}
        aria-label="Heading 3"
        title="Heading 3"
      >
        <Heading3 className="h-4 w-4" />
      </button>
    </div>
  );
};
