import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface TableProps {
  data: {
    tableMarkdown: string;
  };
}
export default function Table({ data }: TableProps) {
  return (
    <div className="container mx-auto overflow-x-auto">
      <Markdown children={data.tableMarkdown} remarkPlugins={[remarkGfm]} />
    </div>
  );
}
