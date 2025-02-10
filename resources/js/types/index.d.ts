import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};

export interface Page {
    id: string;
    name: string;
    avatar?: string;
    user_id: number;
    linked_page_id: string;
    created_at: string;
    updated_at: string;
    user: User;
    linked_page: Page;
    average?: number;
    votes: Vote[];
    last_bottle_message?: BottleMessage;
    last_quick_thought?: QuickThought;
}

export interface Vote {
    id: number;
    page_id: string;
    user_id: number;
    vote: number;
    notes?: string;
    visible_at?: string;
    image?: string;
    latitude?: number;
    longitude?: number;
    created_at: string;
    updated_at: string;
    page: Page;
    user: User;
    comments: Comment[];
}

export interface Comment {
    id: number;
    comment: string;
    user_id: number;
    vote_id: number;
    image: string;
    created_at: string;
    updated_at: string;
    user: User;
    vote: Vote;
}

export interface BottleMessage {
    id: number;
    message: string;
    image: string;
    user_id: number;
    page_id: string;
    user?: User;
    page?: Page;
    created_at: string;
    updated_at: string;
}

export interface QuickThought {
    id: number;
    emoji: string;
    unified: string;
    user?: User;
    page?: Page;
    created_at: string;
    updated_at: string;
}
