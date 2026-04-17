"use client";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { generateFullDocument, NDAFormData } from "@/lib/nda-template";

interface Props {
  data: NDAFormData;
}

export default function NDAPreview({ data }: Props) {
  const markdown = generateFullDocument(data);

  return (
    <div
      id="nda-preview"
      className="prose prose-sm max-w-none text-gray-900
        prose-headings:font-semibold prose-headings:text-gray-900
        prose-h1:text-xl prose-h1:mb-4
        prose-h2:text-base prose-h2:mt-6 prose-h2:mb-2
        prose-h3:text-sm prose-h3:mt-4 prose-h3:mb-1
        prose-p:text-sm prose-p:leading-relaxed prose-p:my-2
        prose-li:text-sm prose-li:my-0.5
        prose-table:text-sm prose-td:py-1 prose-th:py-1
        prose-strong:font-semibold
        prose-hr:my-6"
    >
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{markdown}</ReactMarkdown>
    </div>
  );
}
