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

interface Organization {
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

interface Card {
    id: string;
    object: string;
    href: string;
    name: string;
    type: string;
    status: string;
    issued_at: string;
    owner: User;
    organization: Organization;
}

interface Tag {
    id: string;
    object: string;
    label: string;
}

interface Transaction {
    id: string;
    object: string;
    href: string;
    amount_cents: number;
    memo: string;
    date: string;
    type: string;
    pending: boolean;
    receipts: {
        count: number;
        missing: boolean;
    };
    comments: {
        count: number;
    };
    organization: Organization;
    tags: Tag[];
    card_charge?: {
        id: string;
        object: string;
        href: string;
        memo: string;
        transaction: Transaction;
        organization: Organization;
        amount_cents: number;
        date: string;
        card: Card;
        user: User;
    };
    ach_transfer?: {
        id: string;
        object: string;
        href: string;
        memo: string;
        transaction: Transaction;
        organization: Organization;
        amount_cents: string;
        date: string;
        status: string;
        beneficiary: {
            name: string;
        };
    };
    check?: {
        id: string;
        object: string;
        href: string;
        memo: string;
        transaction: Transaction;
        organization: Organization;
        amount_cents: number;
        date: string;
        status: string;
    };
    donation?: any; // Define its structure if needed
    invoice?: {
        id: string;
        object: string;
        href: string;
        memo: string;
        transaction: Transaction;
        organization: Organization;
        amount_cents: string;
        sponsor: {
            id: string;
            name: string;
        };
        date: string;
        status: string;
    };
    transfer?: {
        id: string;
        object: string;
        href: string;
        memo: string;
        transaction: Transaction;
        organization: Organization;
        amount_cents: string;
        date: string;
        status: string;
    };
}

interface Donor {
    name: string;
    anonymous: boolean;
}

export interface TransactionData {
    id: string;
    object: string;
    href: string;
    memo: string;
    transaction: Transaction;
    organization: Organization;
    amount_cents: number;
    donor: Donor;
    date: string;
    status: string;
    recurring: boolean;
}