import SideNavLink from "./SideNavLink";
const navContents = require("./Contents.json");

export default function SideNav() {
    return (
        <div
            className="fixed overflow-hidden h-full w-[var(--side-nav-width)] z-50 bg-[var(--core-color)] shadow-normal hover:w-[var(--side-nav-transition-width)] transition-all"
            id="side-nav"
        >
            <div
                className="relative h-full w-full pt-8 min-h-[700px]"
                id="side-nav-component"
            >
                {navContents.map((info) => (
                    <SideNavLink
                        key={info.label}
                        href={info.href}
                        imageSrc={info.imageSrc}
                        imageAlt={info.imageSrc}
                        label={info.label}
                    />
                ))}
            </div>
        </div>
    );
}
