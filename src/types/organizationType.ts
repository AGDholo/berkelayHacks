interface Balance {
    balance_cents: number;
    fee_balance_cents: number;
    incoming_balance_cents: number;
    total_raised: number;
}

interface User {
    id: string;
    object: string;
    full_name: string;
    admin: boolean;
    photo: string;
}

export interface OrganizationType {
    id: string;
    object: string;
    href: string;
    name: string;
    slug: string;
    website: string;
    category: string;
    transparent: boolean;
    demo_mode: boolean;
    logo: string;
    donation_header: string;
    background_image: string;
    public_message: string;
    donation_link: string;
    balances: Balance;
    created_at: string;
    users: User[];
}