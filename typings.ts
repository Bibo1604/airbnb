export type Listing = {
    url: string;
    title: string;
    subtitle: string;
    rating: string | null;
    price: string;
    total_price: string;
    link: string;
}

export type Result = {
    content: {
        listings: Listing[];
        total_listings: string;
    }
}