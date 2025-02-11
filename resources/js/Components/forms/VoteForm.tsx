import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/Components/ui/form';
import { Page } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Input } from '../ui/input';
import { Popover } from '../ui/popover';
import { Slider } from '../ui/slider';
import { Textarea } from '../ui/textarea';

export default function VoteForm({ page }: { page: Page }) {
    const [isLoading, setIsLoading] = useState(false);
    const formSchema = z.object({
        vote: z.number().min(-10).max(10),
        notes: z.string().optional(),
        image: z.instanceof(FileList).optional(),
        visible_at: z.date().optional(),
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            vote: 0,
            notes: '',
        },
    });
    const sliderRef = form.register('vote');
    const fileRef = form.register('image');

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        form.reset();
        router.post(
            route('vote.store'),
            {
                ...values,
                image: values.image?.[0],
                page_id: page.id,
            },
            {
                onFinish: () => setIsLoading(false),
            },
        );
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="vote"
                    render={({ field }) => (
                        <>
                            <div className="flex justify-between">
                                <p>Hate level</p>
                                <p>{field.value}</p>
                            </div>
                            <FormItem>
                                <FormControl>
                                    <Slider
                                        defaultValue={[0]}
                                        max={10}
                                        min={-10}
                                        {...sliderRef}
                                        onChange={(event) => {
                                            field.onChange(
                                                parseInt(event.target?.value),
                                            );
                                        }}
                                    />
                                </FormControl>
                            </FormItem>
                        </>
                    )}
                ></FormField>
                <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Notes</FormLabel>
                            <FormControl>
                                <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                ></FormField>
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
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
                ></FormField>

                <FormField
                    control={form.control}
                    name="visible_at"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Visible when?</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={'outline'}
                                            className="block"
                                        >
                                            {field.value
                                                ? dayjs(field.value).format(
                                                      'DD/MM/YYYY',
                                                  )
                                                : 'Pick a date'}
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto border bg-background p-0 shadow"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        initialFocus
                                    />
                                    <Input type="time" />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                ></FormField>

                <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <AiOutlineLoading3Quarters className="animate-spin" />
                        ) : (
                            'Vote'
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
