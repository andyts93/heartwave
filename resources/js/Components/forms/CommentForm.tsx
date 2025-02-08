import { Vote } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { BsSend } from 'react-icons/bs';
import { z } from 'zod';
import { Button } from '../ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import { Textarea } from '../ui/textarea';

export default function CommentForm({ vote }: { vote: Vote }) {
    const formSchema = z.object({
        comment: z.string(),
        image: z.string().optional(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            comment: '',
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        router.post(
            route('comment.store'),
            { ...values, vote_id: vote.id },
            { preserveScroll: true },
        );
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex items-end gap-2"
            >
                <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                        <FormItem className="flex-1 space-y-0">
                            <FormLabel className="sr-only">Comment</FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    placeholder="Write your comment"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-9 rounded-full p-0">
                    <BsSend />
                </Button>
            </form>
        </Form>
    );
}
