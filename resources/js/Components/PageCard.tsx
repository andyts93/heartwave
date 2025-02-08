import { Avatar } from '@/Components/ui/avatar';
import { Card, CardContent } from '@/Components/ui/card';
import { Page } from '@/types';
import { Link } from '@inertiajs/react';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { AiOutlineLink, AiOutlineUser } from 'react-icons/ai';
import { buttonVariants } from './ui/button';

export default function PageCard({ page }: { page: Page }) {
    return (
        <Card className="shadow-sm">
            <CardContent className="p-4">
                <div className="mb-4 flex items-center gap-4">
                    <Avatar className="items-center justify-center bg-gray-200">
                        <AvatarImage src={page.avatar} />
                        <AvatarFallback>
                            {page.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="text-sm">
                        <h3 className="font-semibold">{page.name}</h3>
                        <p className="text-foreground/70">{page.id}</p>
                    </div>
                </div>
                <div className="flex justify-end">
                    <Link
                        href={route('page.show', { id: page.id })}
                        className={buttonVariants({
                            variant: 'ghost',
                        })}
                    >
                        <AiOutlineUser />
                        <span className="sr-only">Visit linked page</span>
                    </Link>
                    {page.linked_page && (
                        <Link
                            href={route('page.show', {
                                id: page.linked_page.id,
                            })}
                            className={buttonVariants({
                                variant: 'ghost',
                            })}
                        >
                            <AiOutlineLink />
                            <span className="sr-only">Visit linked page</span>
                        </Link>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
