"use client";

import dynamic from "next/dynamic";

/**
 * No Next 16, `ssr: false` só é permitido dentro de Client Components —
 * este wrapper existe para a page (Server Component) poder usar a Galaxy.
 */
const Galaxy = dynamic(() => import("./Galaxy"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden
      className="h-svh w-full"
      style={{
        background:
          "radial-gradient(ellipse 90% 70% at 50% 40%, #0d1230 0%, #05060d 70%)",
      }}
    />
  ),
});

export default function GalaxyLoader() {
  return <Galaxy />;
}
