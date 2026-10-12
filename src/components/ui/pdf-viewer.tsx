"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// Phones and tablets either cannot show a PDF in a frame or show only its first page,
// so they keep the page images passed as children.
function canShowInline() {
  return navigator.pdfViewerEnabled && matchMedia("(pointer: fine)").matches;
}

/** Shows `src` in the browser's PDF viewer where it works well, the children elsewhere. */
export function PdfViewer({
  src,
  title,
  children,
}: {
  src: string;
  title: string;
  children: React.ReactNode;
}) {
  const inline = useSyncExternalStore(subscribe, canShowInline, () => false);
  if (!inline) return children;
  return (
    <iframe
      src={`${src}#view=FitH&navpanes=0`}
      title={title}
      className="h-[85vh] w-full rounded-xl border border-line bg-surface"
    />
  );
}
