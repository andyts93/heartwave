import BottleMessageForm from '@/Components/forms/BottleMessageForm';
import QuickThoughtForm from '@/Components/forms/QuickThoughtForm';
import VoteForm from '@/Components/forms/VoteForm';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { Tooltip, TooltipProvider } from '@/Components/ui/tooltip';
import VoteCard from '@/Components/VoteCard';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Page } from '@/types';
import { usePage } from '@inertiajs/react';
import { TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip';
import dayjs from 'dayjs';
import { Emoji } from 'emoji-picker-react';
import { useMemo } from 'react';

import { GiSquareBottle } from 'react-icons/gi';

export default function PageView({ page }: { page: Page }) {
    const { auth } = usePage().props;
    const isOwner = useMemo(() => auth.user.id === page.user_id, [auth, page]);
    console.log(isOwner);
    return (
        <Authenticated>
            <div className="flex w-full flex-col items-start gap-4 md:flex-row">
                <div className="w-full md:w-1/4">
                    <Card>
                        <CardContent className="p-4">
                            <div className="mb-4 flex flex-col items-center gap-3 border-b pb-4">
                                <Avatar className="h-24 w-24 items-center justify-center bg-gray-200 md:h-32 md:w-32">
                                    <AvatarImage src={page.avatar} />
                                    <AvatarFallback>
                                        {page.name
                                            .substring(0, 2)
                                            .toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <p className="font-bold">{page.name}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-black">
                                    {page.average
                                        ? parseFloat(
                                              page.average.toString(),
                                          ).toFixed(2)
                                        : '-'}
                                </p>
                                <h2 className="text-lg">Average</h2>
                            </div>
                            {page.last_quick_thought && (
                                <div className="flex items-center rounded-lg bg-gray-100 p-2">
                                    <TooltipProvider delayDuration={200}>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Emoji
                                                    unified={
                                                        page.last_quick_thought
                                                            .unified
                                                    }
                                                />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>
                                                    {
                                                        page.last_quick_thought
                                                            .user?.name
                                                    }{' '}
                                                    {dayjs(
                                                        page.last_quick_thought
                                                            .created_at,
                                                    ).fromNow()}
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                    {page.last_bottle_message && (
                        <Card className="mt-4">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <span className="rounded-full bg-secondary p-2 text-white">
                                        <GiSquareBottle />
                                    </span>
                                    Bottle message
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="border bg-gray-50 p-3 font-calligraphy dark:bg-zinc-900">
                                    <p className="text-2xl">
                                        {page.last_bottle_message.message}
                                    </p>
                                    {page.last_bottle_message.image && (
                                        <img
                                            src={`/storage/${page.last_bottle_message.image}`}
                                            className="mt-2 rounded-lg"
                                        />
                                    )}
                                    <p className="text-right">
                                        {dayjs(
                                            page.last_bottle_message.created_at,
                                        ).fromNow()}
                                    </p>
                                    <p className="text-right">
                                        {page.last_bottle_message.user?.name}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>

                <div className="w-full md:flex-1">
                    {!page.user ? (
                        <Card className="bg-rose-200 text-red-600">
                            <CardHeader>
                                <CardTitle>Hold up!</CardTitle>
                            </CardHeader>
                            <CardContent className="font-semibold">
                                <p>Looks like this page is not claimed yet!</p>
                                <p>
                                    You have created this page for your friend,
                                    send them this link and make them claim it.
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        <>
                            {!isOwner ? (
                                <Card className="mb-4">
                                    <CardContent className="p-4">
                                        <Tabs
                                            defaultValue="bottleMessage"
                                            orientation="vertical"
                                        >
                                            <TabsList className="w-full">
                                                <TabsTrigger value="bottleMessage">
                                                    Bottle message
                                                </TabsTrigger>
                                                <TabsTrigger value="quickThought">
                                                    Quick thought
                                                </TabsTrigger>
                                                <TabsTrigger value="missingMeter">
                                                    Missing meter
                                                </TabsTrigger>
                                                <TabsTrigger value="passes">
                                                    Passes
                                                </TabsTrigger>
                                                <TabsTrigger value="gifts">
                                                    Gifts
                                                </TabsTrigger>
                                            </TabsList>
                                            <TabsContent
                                                value="bottleMessage"
                                                className="mt-6"
                                            >
                                                <BottleMessageForm
                                                    page={page}
                                                />
                                            </TabsContent>
                                            <TabsContent value="quickThought">
                                                <QuickThoughtForm page={page} />
                                            </TabsContent>
                                            <TabsContent value="missingMeter">
                                                RocketMessage
                                            </TabsContent>
                                            <TabsContent value="passes">
                                                RocketMessage
                                            </TabsContent>
                                            <TabsContent value="gifts">
                                                Gifts
                                            </TabsContent>
                                        </Tabs>
                                    </CardContent>
                                </Card>
                            ) : (
                                <Card className="mb-4">
                                    <CardContent className="p-4">
                                        <VoteForm page={page} />
                                    </CardContent>
                                </Card>
                            )}
                            <div className="flex flex-col gap-2">
                                {page.votes.map((v) => (
                                    <VoteCard vote={v} key={v.id} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Authenticated>
    );
}
