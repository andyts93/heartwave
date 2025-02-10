import { Vote } from '@/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from 'react';
import { AiOutlineComment } from 'react-icons/ai';
import { GoSmiley } from 'react-icons/go';
import CommentForm from './forms/CommentForm';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

dayjs.extend(relativeTime);
export default function VoteCard({ vote }: { vote: Vote }) {
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);

    return (
        <Card className="border-0 shadow dark:shadow-zinc-800">
            <CardContent className="p-4">
                <div className="mb-4 flex items-center gap-2">
                    <span
                        className={`flex h-12 w-12 items-center justify-center rounded-full border text-xl font-bold ${vote.vote < 0 ? 'border-green-400 bg-green-200 text-green-500' : 'border-red-400 bg-red-200 text-red-500'}`}
                    >
                        {`${vote.vote > 0 ? '+' : ''}${vote.vote}`}
                    </span>
                    <span className="text-sm text-foreground/60">
                        {dayjs(vote.created_at).format('DD MMM YYYY HH:mm')}
                    </span>
                </div>
                <p className="mb-4 text-justify">{vote.notes}</p>
                {vote.image && (
                    <img
                        src={`/storage/${vote.image}`}
                        className="rounded-xl"
                    />
                )}
                <div className="flex">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant={'ghost'}>
                                <GoSmiley />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent
                            side="top"
                            className="rounded-xl bg-card px-4 py-2 shadow"
                        >
                            <div className="grid grid-cols-6">
                                <Button
                                    variant={'ghost'}
                                    className="px-2 py-1 text-base"
                                >
                                    ❤️
                                </Button>
                                <Button
                                    variant={'ghost'}
                                    className="px-2 py-1 text-base"
                                >
                                    😁
                                </Button>
                                <Button
                                    variant={'ghost'}
                                    className="px-2 py-1 text-base"
                                >
                                    🫣
                                </Button>
                                <Button
                                    variant={'ghost'}
                                    className="px-2 py-1 text-base"
                                >
                                    🥰
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                    <Button
                        variant={'ghost'}
                        onClick={() => setIsCommentsOpen(!isCommentsOpen)}
                    >
                        <AiOutlineComment /> {vote.comments.length}
                    </Button>
                </div>
                {isCommentsOpen && (
                    <div className="flex flex-col space-y-3 border-t pt-2">
                        <CommentForm vote={vote} />
                        {vote.comments.map((c) => (
                            <div className="flex items-center gap-2" key={c.id}>
                                <div>
                                    <Avatar>
                                        <AvatarFallback>
                                            {c.user.name.substring(0, 1)}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                                <div>
                                    <p className="mb-0.5 text-xs font-bold">
                                        {c.user.name}
                                        <span className="ml-2 font-semibold text-foreground/40">
                                            {dayjs(c.created_at).fromNow()}
                                        </span>
                                    </p>
                                    <p className="text-sm">{c.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
