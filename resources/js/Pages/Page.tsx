import BottleMessageForm from '@/Components/forms/BottleMessageForm';
import VoteForm from '@/Components/forms/VoteForm';
import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';
import { Avatar } from '@/Components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import VoteCard from '@/Components/VoteCard';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Page } from '@/types';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import dayjs from 'dayjs';

export default function PageView({ page }: { page: Page }) {
    console.log(page);
    return (
        <Authenticated>
            <div className="flex flex-col md:flex-row w-full items-start gap-4">
                <div className="w-full md:w-1/4">
                    <Card className="border-0 shadow dark:shadow-zinc-800">
                        <CardContent className="p-4">
                            <div className="mb-4 flex flex-col items-center gap-3 border-b pb-4">
                                <Avatar className="items-center justify-center bg-gray-200 w-32 h-32">
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
                        </CardContent>
                    </Card>
                    {page.last_bottle_message && (
                        <Card className="mt-4 border-0 shadow dark:shadow-zinc-800">
                            <CardHeader>
                                <CardTitle>Bottle message</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-1 text-sm">
                                    {page.last_bottle_message.user?.name} left
                                    you a message{' '}
                                    {dayjs(
                                        page.last_bottle_message.created_at,
                                    ).fromNow()}
                                </p>
                                <div className="rounded-lg bg-gray-100 p-2 dark:bg-zinc-900">
                                    <p className="mb-2 text-sm">
                                        {page.last_bottle_message.message}
                                    </p>
                                    <img
                                        src={`/storage/${page.last_bottle_message.image}`}
                                        className="rounded-lg"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
                <div className="w-full md:flex-1">
                    <Card className="mb-4 border-0 shadow dark:shadow-zinc-800">
                        <CardContent className="p-4">
                            <Tabs defaultValue="bottleMessage" orientation='vertical'>
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
                                    <BottleMessageForm page={page} />
                                </TabsContent>
                                <TabsContent value="quickThought">
                                    RocketMessage
                                </TabsContent>
                                <TabsContent value="missingMeter">
                                    RocketMessage
                                </TabsContent>
                                <TabsContent value="passes">
                                    RocketMessage
                                </TabsContent>
                                <TabsContent value="gifts">Gifts</TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                    <Card className="mb-4 border-0 shadow dark:shadow-zinc-800">
                        <CardContent className="p-4">
                            {!page.user && (
                                <Alert variant={'destructive'}>
                                    <AlertTitle>Hold up!</AlertTitle>
                                    <AlertDescription>
                                        <p>
                                            Looks like this page is not claimed
                                            yet!
                                        </p>
                                        <p>
                                            You have created this page for your
                                            friend, send them this link and make
                                            them claim it.
                                        </p>
                                    </AlertDescription>
                                </Alert>
                            )}
                            <VoteForm />
                        </CardContent>
                    </Card>
                    <div className="flex flex-col gap-2">
                        {page.votes.map((v) => (
                            <VoteCard vote={v} key={v.id} />
                        ))}
                    </div>
                </div>
                {/* <Card className="w-1/4 border-0 shadow dark:shadow-zinc-800">
                    <CardContent className="p-4"></CardContent>
                </Card> */}
            </div>
        </Authenticated>
    );
}
