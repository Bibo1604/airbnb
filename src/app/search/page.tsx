import { fetchResults } from "@/lib/fetchResults";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaRegHeart, FaStar } from "react-icons/fa";

type Props = {
    searchParams: SearchParams;
}

export type SearchParams = {
    url: URL;
    adults: string;
    children: string;
    infants: string;
    checkin: string;
    checkout: string;
}

async function SearchPage({ searchParams }: Props) {
    if (!searchParams.url) {
        return notFound();
    }

    const results = await fetchResults(searchParams);

    if (!results) {
        return (
            <div>No results...</div>
        )
    }

    console.log(results.content.total_listings);


    return (
        <section>
            <div className='max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4'>
                <h1 className="pt-7 font-semibold">{results.content.total_listings}</h1>
                <div className="pt-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {results.content.listings.map((item, i) => (
                        <Link key={i} className="col-span-1 cursor-pointer group" href={"https://www.airbnb.com" + item.link} target="_blank">
                            <div className="flex flex-col gap-1 w-full">
                                <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                                    <img alt="" src={item.url} className="object-cover h-full w-full group-hover:scale-110 transition" />
                                    <div className="absolute top-3 right-3">
                                        <div className="relative hover:opacity-80 transition cursor-pointer">
                                            <FaRegHeart className="fill-white absolute -top-[2px] -right-[2px]" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="font-semibold text-[17px]">{item.title}</div>
                                    <div className="flex items-center font-light">
                                        {item.rating ? <><FaStar className="text-black mr-1" />{item.rating}</> : null}
                                    </div>
                                </div>

                                <div className="font-light text-neutral-500">{item.subtitle}</div>
                                <div className="font-semibold">{item.price}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default SearchPage