import Link from "next/link"
import { frontPageItems } from "../../public/data"
import { FaRegHeart, FaStar } from "react-icons/fa"

export default function Home() {
  return (
    <main>
      <div className='max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4'>
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {frontPageItems.map((item, i) => (
            <Link key={i} className="col-span-1 cursor-pointer group" href={item.link} target="_blank">
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
    </main>
  )
}
