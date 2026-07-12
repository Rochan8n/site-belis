"use client";

import Script from "next/script";

type SolutionBlobProps = {
  className?: string;
};

export function SolutionBlob({ className }: SolutionBlobProps) {
  return (
    <>
      <Script
        id="belis-blob-v1-script"
        src="/belis-blob.js"
        strategy="afterInteractive"
      />
      <belis-blob
        variant="wire"
        className={className}
        aria-hidden="true"
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </>
  );
}
