import { Page } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
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
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function BottleMessageForm({ page }: { page: Page }) {
    const [isLoading, setIsLoading] = useState(false);

    const formSchema = z.object({
        message: z.string(),
        image: z.instanceof(FileList).optional(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            message: '',
        },
    });
    const fileRef = form.register('image');

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setIsLoading(true),
        router.post(route('bottleMessage.store'), {
            ...values,
            image: values.image?.[0],
            page_id: page.id,
        }, {
            onFinish: () => setIsLoading(false),
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem className="flex-1 space-y-0">
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                                <Textarea {...field} readOnly={isLoading} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem className="flex-1 space-y-0">
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                                <Input
                                    readOnly={isLoading}
                                    type="file"
                                    accept="image/*"
                                    {...fileRef}
                                    onChange={(event) => {
                                        field.onChange(
                                            event.target?.files?.[0] ??
                                                undefined,
                                        );
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading}>{isLoading ?  <AiOutlineLoading3Quarters className="animate-spin" /> : 'Throw bottle'}</Button>
                </div>
            </form>
        </Form>
    );
}
