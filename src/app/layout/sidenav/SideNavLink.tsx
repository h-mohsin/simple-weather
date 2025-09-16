"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function SideNavLink({ href, imageSrc, imageAlt, label }) {
    const searchParams = useSearchParams();

    const location = searchParams.get("location");
    const unit = searchParams.get("unit");
    const lng = searchParams.get("lng");
    const lat = searchParams.get("lat");

    return (
        <Link
            className="group"
            href={href + `?location=${location}&lat=${lat}&lng=${lng}&unit=${unit}`}
        >
            <Image
                src={imageSrc}
                width={100}
                height={100}
                alt={imageAlt}
                className="relative h-auto w-full m-auto"
            />
            <h1 className="relative text-left my-auto ml-5 text-lg">{label}</h1>
        </Link>
    );
}
