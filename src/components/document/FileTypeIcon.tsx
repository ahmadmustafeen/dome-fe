import { File, FileCode, FileImage, FileText } from "lucide-react";

type FileTypeIconProps = {
  ext: string;
};

const FileTypeIcon = ({ ext }: FileTypeIconProps) => {
  switch (ext) {
    case "pdf":
      return <FileText className="h-4 w-4 shrink-0 text-red-500" />;
    case "doc":
    case "docx":
      return <FileText className="h-4 w-4 shrink-0 text-blue-500" />;
    case "txt":
      return <FileCode className="h-4 w-4 shrink-0 text-gray-500" />;
    case "png":
    case "jpg":
    case "jpeg":
      return <FileImage className="h-4 w-4 shrink-0 text-green-500" />;
    default:
      return <File className="h-4 w-4 shrink-0 text-gray-400" />;
  }
};

export { FileTypeIcon };
