import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
const IBMPlex = IBM_Plex_Sans({ subsets: ["latin"],
  weight:['400','500','600','700'],
  variable:'--font-ibm-plex'
 });

export const metadata: Metadata = {
  title: "Imaginify",
  description: "AI powered image generator",
};

/**
 * Root layout component for the application
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout
 * @returns {JSX.Element} The rendered layout structure with ClerkProvider and HTML structure
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{variables:{
      colorPrimary:'#624cf5'
    }}}>
    <html lang="en">
      <body className={cn("font-IBMPlex antialiased",IBMPlex.variable)}>
        {children}</body>
    </html>
    </ClerkProvider>
  );
}
