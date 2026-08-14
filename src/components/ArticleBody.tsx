"use client";

import { PortableText } from "@portabletext/react";
import type { ArticleBody as Body } from "@/lib/content";

export function ArticleBody({ body }: { body: Body }) {
  if (body.kind === "plain") {
    return (
      <div className="space-y-5">
        {body.paragraphs.map((p, i) => (
          <p key={i} className="text-[16px] leading-[1.8] text-[#3a4a41]">
            {p}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-5 text-[16px] leading-[1.8] text-[#3a4a41]">
      <PortableText
        value={body.blocks}
        components={{
          block: {
            normal: ({ children }) => <p className="leading-[1.8]">{children}</p>,
            h2: ({ children }) => (
              <h2 className="pt-4 text-2xl font-semibold text-[#153e2a]">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="pt-2 text-xl font-semibold text-[#153e2a]">{children}</h3>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-[#3fa34d] pl-5 italic text-[#153e2a]">
                {children}
              </blockquote>
            ),
          },
          list: {
            bullet: ({ children }) => (
              <ul className="list-disc space-y-2 pl-6">{children}</ul>
            ),
            number: ({ children }) => (
              <ol className="list-decimal space-y-2 pl-6">{children}</ol>
            ),
          },
        }}
      />
    </div>
  );
}
