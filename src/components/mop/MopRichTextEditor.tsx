"use client";

import "@/styles/mop-editor.css";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useRef, useState } from "react";

import { MOP_EMPTY_EDITOR_HTML } from "@/constants/mop-form";
import { cn } from "@/utils/Helpers";

import { MopToolbar } from "./MopToolbar";

type MopRichTextEditorProps = {
  initialContent?: string;
  onHtmlChange: (html: string) => void;
  className?: string;
  compact?: boolean;
};

const MopRichTextEditor = ({
  initialContent = MOP_EMPTY_EDITOR_HTML,
  onHtmlChange,
  className,
  compact = false,
}: MopRichTextEditorProps) => {
  const onHtmlChangeRef = useRef(onHtmlChange);
  const [contentAtMount] = useState(() => initialContent);

  useEffect(() => {
    onHtmlChangeRef.current = onHtmlChange;
  }, [onHtmlChange]);

  const editor = useEditor(
    {
      immediatelyRender: false,
      shouldRerenderOnTransaction: true,
      extensions: [
        StarterKit.configure({
          heading: { levels: [1, 2, 3] },
        }),
      ],
      content: contentAtMount,
      onUpdate: ({ editor: ed }) => {
        onHtmlChangeRef.current(ed.getHTML());
      },
      editorProps: {
        attributes: {
          class: "max-w-none focus:outline-none",
          spellcheck: "true",
        },
      },
    },
    [],
  );

  useEffect(() => {
    if (editor) {
      onHtmlChangeRef.current(editor.getHTML());
    }
  }, [editor]);

  return (
    <div
      className={cn(
        "mop-editor-root flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white",
        compact ? "mop-editor-root--compact" : null,
        className,
      )}
    >
      <MopToolbar editor={editor} />
      <div className="min-h-0 flex-1 overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export { MopRichTextEditor };
