'use client';

import React, { Dispatch, SetStateAction, useState } from 'react'
import SearchItemWrapper from './SearchItemWrapper'
import SearchItemLabel from './SearchItemLabel'
import SearchItemText from './SearchItemText'
import { BiSearch } from "react-icons/bi";
import SearchDestination from './SearchDestination';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaMinus, FaPlus } from "react-icons/fa";

// import Shadcn
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format } from 'date-fns';

export const formSchema = z.object({
    destination: z.string().min(2).max(50),
    checkin: z.date(),
    checkout: z.date(),
    adults: z.string().min(1).max(8),
    children: z.string().min(0).max(8),
    infants: z.string().min(0).max(8),
    pets: z.string().min(0).max(5),
});

const addGuestsOptions = [
    {
        title: "Adults",
        text: "Ages 13 or above",
        label: "adults",
    },
    {
        title: "Children",
        text: "Ages 2-12",
        label: "children",
    },
    {
        title: "Infants",
        text: "Under 2",
        label: "infants",
    },
    {
        title: "Pets",
        text: "",
        label: "pets",
    },
]

function Search() {
    const [bigSearchItem, setBigSearchItem] = useState("destination");
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            destination: "",
            checkin: undefined,
            checkout: undefined,
            adults: "1",
            children: "0",
            infants: "0",
            pets: "0"
        },
    });

    const handleSelectItem = (item: string) => {
        setBigSearchItem(item);
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);

        // checkin
        const checkin_monthday = values.checkin.getDate().toString();
        const checkin_month = values.checkin.getMonth().toString();
        const checkin_year = values.checkin.getFullYear().toString();

        // check out
        const checkout_monthday = values.checkout.getDate().toString();
        const checkout_month = values.checkout.getMonth().toString();
        const checkout_year = values.checkout.getFullYear().toString();

        const checkin = `${checkin_year}-${checkin_month}-${checkin_monthday}`;
        const checkout = `${checkout_year}-${checkout_month}-${checkout_monthday}`;

        const url = new URL("https://www.airbnb.com/s/" + values.destination + "/homes?tab_id=home_tab&refinement_paths%5B%5D=%2Fhomes&flexible_trip_lengths%5B%5D=one_week&monthly_start_date=2024-01-01&monthly_length=3&price_filter_input_type=0&channel=EXPLORE&date_picker_type=calendar&");
        url.searchParams.set("checkin", checkin);
        url.searchParams.set("checkout", checkout);
        url.searchParams.set("adults", values.adults);
        url.searchParams.set("children", values.children);
        url.searchParams.set("infants", values.infants);

        router.push(`/search?url=${url.href}`);
    }

    return (
        <Form {...form}>
            <form className='relative pb-3 pt-2 flex justify-center' onSubmit={form.handleSubmit(onSubmit)}>
                <div className='z-10'>
                    <div className={`border border-neutral-300 rounded-full flex items-center bg-neutral-200`}>
                        {/* Destination input */}
                        <div className='relative'>
                            <SearchItemWrapper active={bigSearchItem === "destination"} onClick={() => handleSelectItem("destination")}>
                                <SearchItemLabel>Where</SearchItemLabel>
                                <FormField control={form.control} name='destination' render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder='Search Destination' {...field} className={cn("font-normal focus-visible:ring-transparent border-none px-0 py-0 text-neutral-400 h-7 bg-transparent")} />
                                        </FormControl>
                                    </FormItem>
                                )} />
                                {/* <input type='text' className='outline-none bg-transparent' placeholder='Search Destination' /> */}
                            </SearchItemWrapper>
                            {bigSearchItem === "destination" ? <SearchDestination /> : null}
                        </div>

                        {/* Check in date input */}
                        <div className='relative'>
                            <SearchItemWrapper active={bigSearchItem === "checkin"} onClick={() => handleSelectItem("checkin")}>
                                <SearchItemLabel>Check In</SearchItemLabel>
                                {/* <SearchItemText>Any Dates</SearchItemText> */}
                                <FormField control={form.control} name='checkin' render={({ field }) => (
                                    <FormItem>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant={"outline"} className={cn("font-normal h-7 px-0 py-0 border-none text-neutral-400 bg-transparent hover:bg-transparent hover:text-neutral-400")}>
                                                    {field.value ? (
                                                        format(field.value, "LLL. dd")
                                                    ) : (
                                                        <span>Any Dates</span>
                                                    )}
                                                </Button>
                                            </PopoverTrigger>

                                            <PopoverContent className='w-auto p-0 mt-5 rounded-3xl'>
                                                <Calendar
                                                    initialFocus
                                                    mode='single'
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </FormItem>
                                )} />
                            </SearchItemWrapper>
                        </div>

                        {/* Check out date input */}
                        <div className='relative'>
                            <SearchItemWrapper active={bigSearchItem === "checkout"} onClick={() => handleSelectItem("checkout")}>
                                <SearchItemLabel>Check Out</SearchItemLabel>
                                {/* <SearchItemText>Any Dates</SearchItemText> */}
                                <FormField control={form.control} name='checkout' render={({ field }) => (
                                    <FormItem>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant={"outline"} className={cn("font-normal h-7 px-0 py-0 border-none text-neutral-400 bg-transparent hover:bg-transparent hover:text-neutral-400")}>
                                                    {field.value ? (
                                                        format(field.value, "LLL. dd")
                                                    ) : (
                                                        <span>Any Dates</span>
                                                    )}
                                                </Button>
                                            </PopoverTrigger>

                                            <PopoverContent className='w-auto p-0 mt-5 rounded-3xl'>
                                                <Calendar
                                                    initialFocus
                                                    mode='single'
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </FormItem>
                                )} />
                            </SearchItemWrapper>
                        </div>

                        {/* Who input */}
                        <div className='relative'>
                            <SearchItemWrapper active={bigSearchItem === "who"} className='pr-2' onClick={() => handleSelectItem("who")}>
                                <div className='flex items-center'>
                                    <div className='pr-10'>
                                        <SearchItemLabel>Who</SearchItemLabel>
                                        {/* <SearchItemText>Add guests</SearchItemText> */}
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant={"outline"} className={cn("font-normal h-7 px-0 py-0 border-none text-neutral-400 bg-transparent hover:bg-transparent hover:text-neutral-400")}>
                                                    <span>Add guests</span>
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className='w-[420px] mt-5 px-6 rounded-3xl'>
                                                <div>
                                                    {/* Adults */}
                                                    <FormField control={form.control} name="adults" render={({ field }) => (
                                                        <FormItem className='flex items-center justify-between py-5 border-b border-gray-300'>
                                                            <FormLabel>
                                                                <>
                                                                    <p className='font-bold'>Adults</p>
                                                                    <p className='text-sm mt-1 font-normal'>Ages 13 or above</p>
                                                                </>
                                                            </FormLabel>
                                                            <FormControl>
                                                                <div className='flex items-center space-x-3'>
                                                                    <div className='flex items-center justify-center opacity-60 cursor-pointer hover:opacity-100'>
                                                                        <FaPlus className='h-7 w-7 p-1 rounded-full border border-neutral-500' />
                                                                    </div>
                                                                    <Input type='number' {...field} className={cn("border-none focus-visible:ring-transparent w-14")} />
                                                                    <div className='flex items-center justify-center opacity-60 cursor-pointer hover:opacity-100'>
                                                                        <FaMinus className="h-7 w-7 p-1 rounded-full border border-neutral-500" />
                                                                    </div>
                                                                </div>
                                                            </FormControl>
                                                        </FormItem>
                                                    )} />

                                                    {/* Children */}
                                                    <FormField control={form.control} name="children" render={({ field }) => (
                                                        <FormItem className='flex items-center justify-between py-5 border-b border-gray-300'>
                                                            <FormLabel>
                                                                <>
                                                                    <p className='font-bold'>Children</p>
                                                                    <p className='text-sm mt-1 font-normal'>Ages 2-12</p>
                                                                </>
                                                            </FormLabel>
                                                            <FormControl>
                                                                <div className='flex items-center space-x-3'>
                                                                    <div className='flex items-center justify-center opacity-60 cursor-pointer hover:opacity-100'>
                                                                        <FaPlus className='h-7 w-7 p-1 rounded-full border border-neutral-500' />
                                                                    </div>
                                                                    <Input type='number' {...field} className={cn("border-none focus-visible:ring-transparent w-14")} />
                                                                    <div className='flex items-center justify-center opacity-60 cursor-pointer hover:opacity-100'>
                                                                        <FaMinus className="h-7 w-7 p-1 rounded-full border border-neutral-500" />
                                                                    </div>
                                                                </div>
                                                            </FormControl>
                                                        </FormItem>
                                                    )} />

                                                    {/* Infants */}
                                                    <FormField control={form.control} name="infants" render={({ field }) => (
                                                        <FormItem className='flex items-center justify-between py-5 border-b border-gray-300'>
                                                            <FormLabel>
                                                                <>
                                                                    <p className='font-bold'>Infants</p>
                                                                    <p className='text-sm mt-1 font-normal'>Under 2</p>
                                                                </>
                                                            </FormLabel>
                                                            <FormControl>
                                                                <div className='flex items-center space-x-3'>
                                                                    <div className='flex items-center justify-center opacity-60 cursor-pointer hover:opacity-100'>
                                                                        <FaPlus className='h-7 w-7 p-1 rounded-full border border-neutral-500' />
                                                                    </div>
                                                                    <Input type='number' {...field} className={cn("border-none focus-visible:ring-transparent w-14")} />
                                                                    <div className='flex items-center justify-center opacity-60 cursor-pointer hover:opacity-100'>
                                                                        <FaMinus className="h-7 w-7 p-1 rounded-full border border-neutral-500" />
                                                                    </div>
                                                                </div>
                                                            </FormControl>
                                                        </FormItem>
                                                    )} />

                                                    {/* Pets */}
                                                    <FormField control={form.control} name="pets" render={({ field }) => (
                                                        <FormItem className='flex items-center justify-between py-5 border-b border-gray-300'>
                                                            <FormLabel>
                                                                <>
                                                                    <p className='font-bold'>Pets</p>
                                                                    <p className='text-sm mt-1 underline font-medium'>Bringing a service animal?</p>
                                                                </>
                                                            </FormLabel>
                                                            <FormControl>
                                                                <div className='flex items-center space-x-3'>
                                                                    <div className='flex items-center justify-center opacity-60 cursor-pointer hover:opacity-100'>
                                                                        <FaPlus className='h-7 w-7 p-1 rounded-full border border-neutral-500' />
                                                                    </div>
                                                                    <Input type='number' {...field} className={cn("border-none focus-visible:ring-transparent w-14")} />
                                                                    <div className='flex items-center justify-center opacity-60 cursor-pointer hover:opacity-100'>
                                                                        <FaMinus className="h-7 w-7 p-1 rounded-full border border-neutral-500" />
                                                                    </div>
                                                                </div>
                                                            </FormControl>
                                                        </FormItem>
                                                    )} />
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </div>

                                    <Button type='submit' className='flex h-12 items-center bg-red-500 rounded-full text-white font-bold hover:bg-red-600'>
                                        <BiSearch className='w-11 h-11 p-3 rounded-full' />
                                        <p className='pr-8'>Search</p>
                                    </Button>
                                </div>
                            </SearchItemWrapper>
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    )
}

export default Search