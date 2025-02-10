import { Page } from '@/types';
import { router } from '@inertiajs/react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { useState } from 'react';
import Loader from '../Loader';

export default function QuickThoughtForm({ page }: { page: Page }) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const react = (emoji: EmojiClickData) => {
        setIsLoading(true);

        router.post(
            route('quick-thought.store'),
            {
                ...emoji,
                page_id: page.id,
            },
            {
                onFinish: () => setIsLoading(false),
            },
        );
    };

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <EmojiPicker
                    width="100%"
                    previewConfig={{
                        defaultCaption: 'What are you thinking about?',
                    }}
                    onEmojiClick={react}
                />
            )}
        </>
    );
}
