import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/Components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Input } from '../ui/input';
import { Popover } from '../ui/popover';
import { Slider } from '../ui/slider';
import { Textarea } from '../ui/textarea';

export default function VoteForm() {
    const formSchema = z.object({
        vote: z.array(z.number().min(-10).max(10)),
        notes: z.string(),
        image: z.string().optional(),
        visible_at: z.date(),
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            vote: [0],
            notes: '',
        },
    });
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
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
                                <p></p>
                            </div>
                            <FormItem>
                                <FormControl>
                                    <Slider max={10} min={-10} {...field} />
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
                                    type="file"
                                    {...field}
                                    accept="image/*"
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
                                        <Button variant={'outline'}>
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

                <Button type="submit">Send</Button>
            </form>
        </Form>
    );
}
