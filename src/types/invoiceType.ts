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
    balances: {
        balance_cents: number;
        fee_balance_cents: number;
        incoming_balance_cents: number;
        total_raised: number;
    };
    created_at: string;
    users: User[];
}

interface Receipts {
    count: number;
    missing: boolean;
}

interface Comments {
    count: number;
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

interface CardCharge {
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
}

interface AchTransfer {
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
}

interface Check {
    id: string;
    object: string;
    href: string;
    memo: string;
    transaction: Transaction;
    organization: Organization;
    amount_cents: number;
    date: string;
    status: string;
}

interface Tag {
    id: string;
    object: string;
    label: string;
}

interface Donation {
    id: string;
    object: string;
    href: string;
    memo: string;
    transaction: Transaction;
    organization: Organization;
    amount_cents: number;
    donor: {
        name: string;
        anonymous: boolean;
    };
    date: string;
    status: string;
    recurring: boolean;
}

interface Invoice {
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
}

interface Transfer {
    id: string;
    object: string;
    href: string;
    memo: string;
    transaction: Transaction;
    organization: Organization;
    amount_cents: string;
    date: string;
    status: string;
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
    receipts: Receipts;
    comments: Comments;
    organization: Organization;
    tags: Tag[];
    card_charge: CardCharge;
    ach_transfer: AchTransfer;
    check: Check;
    donation: Donation;
    invoice: Invoice;
    transfer: Transfer;
}

interface Sponsor {
    id: string;
    name: string;
}

export interface InvoiceType {
    id: string;
    object: string;
    href: string;
    memo: string;
    transaction: Transaction;
    organization: Organization;
    amount_cents: number;
    sponsor: Sponsor;
    date: string;
    status: string;
}