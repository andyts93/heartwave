import { Page } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import PassCard from '../PassCard';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Textarea } from '../ui/textarea';

export default function PassForm({ page }: { page: Page }) {
    const [isLoading, setIsLoading] = useState(false);

    const formSchema = z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        color: z.string().optional(),
        emoji: z.string().optional(),
        uses_max: z.string().optional(),
        expires_at: z.date().optional(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
            color: '#ff0000',
            emoji: '',
            uses_max: '',
            expires_at: new Date(),
        },
    });
    const colorRef = form.register('color');

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
    };

    return (
        <div className="flex items-center gap-4">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="mb-3 flex-1 space-y-3"
                >
                    <div className="flex gap-4">
                        <FormField
                            control={form.control}
                            name="emoji"
                            render={({ field }) => (
                                <FormItem>
                                    <Popover modal={true}>
                                        <PopoverTrigger asChild>
                                            <button className="h-full rounded-md border px-2">
                                                {field.value
                                                    ? field.value
                                                    : 'Emoji'}
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full">
                                            <EmojiPicker
                                                lazyLoadEmojis={true}
                                                height={300}
                                                previewConfig={{
                                                    showPreview: false,
                                                }}
                                                onEmojiClick={(emoji) =>
                                                    field.onChange(emoji.emoji)
                                                }
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        ></FormField>

                        <FormField
                            control={form.control}
                            name="color"
                            render={({ field }) => (
                                <FormItem>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <button
                                                    className="h-full w-10 rounded-md border"
                                                    style={{
                                                        backgroundColor:
                                                            field.value,
                                                    }}
                                                ></button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto">
                                            <HexColorPicker
                                                color={field.value}
                                                {...colorRef}
                                                onChange={(color) =>
                                                    field.onChange(color)
                                                }
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        ></FormField>

                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem className="flex-1 space-y-0">
                                    <FormLabel className="sr-only">
                                        Title
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Title" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="flex-1 space-y-0">
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="uses_max"
                            render={({ field }) => (
                                <FormItem className="flex-1 space-y-0">
                                    <FormLabel>Max uses</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="expires_at"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Expiration</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={'outline'}
                                                    className="!mt-0 block w-full"
                                                >
                                                    {field.value
                                                        ? dayjs(
                                                              field.value,
                                                          ).format('DD/MM/YYYY')
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
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        ></FormField>
                    </div>
                    <Button type="submit">Invia</Button>
                </form>
            </Form>
            <PassCard pass={form.watch()} />
        </div>
    );
}
