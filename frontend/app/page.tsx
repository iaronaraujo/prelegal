"use client";

import { useState, useCallback } from "react";
import NDAForm from "@/components/NDAForm";
import NDAPreview from "@/components/NDAPreview";
import { defaultFormData, generateFullDocument, NDAFormData } from "@/lib/nda-template";

function downloadMarkdown(data: NDAFormData) {
  const content = generateFullDocument(data);
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "mutual-nda.md";
  a.click();
  URL.revokeObjectURL(url);
}

function printDocument() {
  window.print();
}

export default function Home() {
  const [formData, setFormData] = useState<NDAFormData>(defaultFormData);

  const handleChange = useCallback((data: NDAFormData) => {
    setFormData(data);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header — hidden when printing */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 no-print">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900">Mutual NDA Creator</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Fill in the form to generate your Mutual Non-Disclosure Agreement
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => downloadMarkdown(formData)}
              className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
            >
              <DownloadIcon />
              Download Markdown
            </button>
            <button
              onClick={printDocument}
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors"
            >
              <PrintIcon />
              Save as PDF
            </button>
          </div>
        </div>
      </header>

      {/* Two-column layout — hidden when printing */}
      <main className="max-w-screen-xl mx-auto p-6 no-print">
        <div className="flex gap-6 items-start">
          {/* Form panel */}
          <div className="w-[420px] shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sticky top-6 max-h-[calc(100vh-120px)] overflow-y-auto">
              <NDAForm data={formData} onChange={handleChange} />
            </div>
          </div>

          {/* Preview panel */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
              <NDAPreview data={formData} />
            </div>
          </div>
        </div>
      </main>

      {/* Print-only: full document */}
      <div className="print-only hidden">
        <NDAPreview data={formData} />
      </div>
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );
}

function PrintIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 6 2 18 2 18 9"/>
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
      <rect x="6" y="14" width="12" height="8"/>
    </svg>
  );
}
