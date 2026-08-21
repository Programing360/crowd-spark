import type { ReactNode } from "react";
import Navbar from "@/src/components/shared/Navbar";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
    </>
  );
}
