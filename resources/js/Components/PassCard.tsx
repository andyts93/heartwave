import type { Pass } from '@/types';

import dayjs from 'dayjs';

export default function PassCard({ pass }: { pass: Pass }) {
    return (
        <div className="relative flex h-full max-h-72 w-96 overflow-hidden rounded-md bg-gray-300">
            {pass.expired ? (
                <div className="absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
                    <span className="-rotate-12 text-5xl font-semibold uppercase text-red-500">
                        Expired
                    </span>
                </div>
            ) : null}
            <div className="flex w-full flex-col">
                <h2 className="flex h-10 items-center px-3 text-lg font-semibold" style={{ backgroundColor: pass.color }}>
                    {pass.title}
                </h2>
                <div className="p-3">
                    <div className="mb-2 flex flex-col">
                        <p className="text-sm font-semibold text-black">
                            {pass.description}
                        </p>
                        <p className="text-xs font-light uppercase text-gray-600">
                            Conditions
                        </p>
                    </div>
                    <div className="flex gap-8">
                        <div className="flex flex-col">
                            <p className="font-semibold text-black">
                                {pass.expires_at
                                    ? dayjs(pass.expires_at).format('DD MMM')
                                    : 'ND'}
                            </p>
                            <p className="text-xs font-light uppercase text-gray-600">
                                Expiration
                            </p>
                        </div>
                        <div className="flex flex-col">
                            <p className="font-semibold text-black">
                                {pass.uses_max}
                            </p>
                            <p className="text-xs font-light uppercase text-gray-600">
                                Max uses
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pass-right before:bg-background-card after:bg-background-card relative flex w-24 flex-col border-l-[0.18em] border-dashed border-white">
                <div className="flex h-10 items-center justify-center p-3" style={{ backgroundColor: pass.color }}>
                    {pass.emoji}
                </div>
                <div className="flex h-full flex-col items-center justify-center">
                    <p className="text-2xl font-bold text-rose-600">
                        {Number(pass.uses_left) >= 0
                            ? pass.uses_left
                            : pass.uses_max}
                    </p>
                    <p className="text-sm uppercase text-gray-600">Left</p>
                </div>
            </div>
        </div>
    );
}
