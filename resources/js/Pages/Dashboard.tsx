import PageForm from '@/Components/forms/PageForm';
import PageCard from '@/Components/PageCard';
import { Button } from '@/Components/ui/button';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Page } from '@/types';

import { useState } from 'react';

export default function Dashboard({ pages }: { pages: Page[] }) {
    const [newPageModalOpen, setNewPageModalOpen] = useState(false);

    return (
        <AuthenticatedLayout>
            <h2 className="text-lg font-semibold">Pages</h2>
            <div className="mb-4 flex justify-end">
                <Dialog
                    open={newPageModalOpen}
                    onOpenChange={setNewPageModalOpen}
                >
                    <DialogTrigger asChild>
                        <Button>Add new</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add new page</DialogTitle>
                        </DialogHeader>
                        <PageForm
                            onSuccess={() => setNewPageModalOpen(false)}
                        />
                    </DialogContent>
                </Dialog>
            </div>
            <div className="grid grid-cols-3 gap-4">
                {pages.map((p) => (
                    <PageCard page={p} key={p.id} />
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
