import { navLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { getAllImages } from "@/lib/actions/image.action";
import { Collection } from "@/components/shared/Collection";

const Home = async ({ searchParams }: SearchParamProps) => {
	const page = Number(searchParams?.page) || 1;
	const searchQuery = (searchParams?.query as string) || "";

	const images = await getAllImages({
		page,
		searchQuery,
	});
	return (
		<>
			<section className="home">
				<h1 className="home-heading">
					Your all in one solution for image transformations
				</h1>
				<ul className="flex-center w-full gap-20">
					{navLinks.slice(1, 5).map((link) => (
						<Link
							key={link.route}
							href={link.route}
							className="flex-center flex-col gap-2"
						>
							<li>
								<Image
									className="flex-center w-fit rounded-full bg-white p-4"
									src={link.icon}
									width={24}
									height={24}
									alt="image"
								/>
							</li>
							<p className="p-14-medium text-center text-white">{link.label}</p>
						</Link>
					))}
				</ul>
			</section>
			<section className="sm:mt-12">
				<Collection hasSearch={true} images={images?.data} page={page} />
			</section>
		</>
	);
};

export default Home;
