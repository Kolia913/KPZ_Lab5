"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  return (
    <html lang="en">
      <body className={inter.className}>
        {" "}
        <header className="mb-8 bg-blue-500 w-full px-8 shadow-md">
          <div className="py-4 w-full flex justify-start gap-8">
            <Link
              className={classNames(
                "font-bold text-white hover:underline hover:underline-offset-4",
                path === "/" && "underline underline-offset-4"
              )}
              href={"/"}
            >
              Employees
            </Link>
            <Link
              className={classNames(
                "font-bold text-white hover:underline hover:underline-offset-4 ",
                path === "/departments" && "underline underline-offset-4"
              )}
              href={"/departments"}
            >
              Departments
            </Link>
          </div>
        </header>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
