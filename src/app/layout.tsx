'use server'

import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import "./components/properties.css"
import "./layout/search-bar/SearchBar.css";
import "./fonts.css";
import "./layout/sidenav/SideNav.css";

import SearchBar from "./layout/search-bar/SearchBar";
import SideNav from "./layout/sidenav/SideNav";

import { revalidatePath } from 'next/cache';
revalidatePath('/', 'layout')

const gabarito = Bricolage_Grotesque({
    weight: "400",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Weather Website",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={gabarito.className}>
                <SideNav />
                <div id="core-grid">
                    <SearchBar></SearchBar>
                    {children}
                </div>
            </body>
        </html>
    );
}
