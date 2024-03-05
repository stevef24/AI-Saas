"use client";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { navLinks } from "../../constants";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { ModeToggle } from "./ThemeToggle";

const SideBar = () => {
	const pathname = usePathname();
	return (
		<aside className="sidebar">
			<div className="flex size-full flex-col gap-4">
				<Link href={"/"} className="sidebar-logo">
					<Image
						src="/assets/images/logo-text.svg"
						alt="logo"
						width={180}
						height={28}
					/>
				</Link>
				<nav className="sidebar-nav">
					<SignedIn>
						<ul className="sidebar-nav_elements">
							{navLinks.slice(0, 6).map((link) => {
								const isActive = link.route === pathname;
								return (
									<li
										key={link.label}
										className={`sidebar-nav_element group text-gray-700 ${
											isActive
												? "bg-purple-gradient text-white"
												: "text-grey-700"
										}`}
									>
										<Link href={link.route} className="sidebar-link">
											<Image
												src={link.icon}
												alt={link.label}
												width={24}
												height={24}
												className={`${isActive && "brightness-200"}`}
											/>
											{link.label}
										</Link>
									</li>
								);
							})}
						</ul>
						<ul>
							{navLinks.slice(6).map((link) => {
								const isActive = link.route === pathname;
								return (
									<li
										key={link.label}
										className={`sidebar-nav_element group text-gray-700 ${
											isActive
												? "bg-purple-gradient text-white"
												: "text-grey-700"
										}`}
									>
										<Link href={link.route} className="sidebar-link">
											<Image
												src={link.icon}
												alt={link.label}
												width={24}
												height={24}
												className={`${isActive && "brightness-200"}`}
											/>
											{link.label}
										</Link>
									</li>
								);
							})}

							<li>
								<UserButton afterSignOutUrl="/" showName />
							</li>
						</ul>
					</SignedIn>

					<SignedOut>
						<Button asChild>
							<Link href="/sign-in">Sign In</Link>
						</Button>
					</SignedOut>
				</nav>
			</div>
		</aside>
	);
};

export default SideBar;
