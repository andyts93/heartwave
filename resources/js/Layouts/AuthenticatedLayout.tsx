import { Button } from '@/Components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/Components/ui/sheet';
import { Link } from '@inertiajs/react';
import { ReactNode } from 'react';

const navItems = [
    {
        name: 'Home',
        href: '/',
    },
];

export default function Authenticated({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-background">
            <header className="border-grid sticky top-0 z-50 flex w-full items-center border-b bg-white px-4 py-2 backdrop-blur md:px-6">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant={'outline'}
                            size={'icon'}
                            className="lg:hidden"
                        >
                            <MenuIcon className="h-6 w-6" />
                            <span className="sr-only">
                                Toggle navigation menu
                            </span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side={'left'}>
                        <Link href="/" className="mr-6 hidden lg:flex">
                            Acme inc
                        </Link>
                        <div className="grid gap-2 py-6">
                            {navItems.map((item) => (
                                <Link
                                    href={item.href}
                                    className="flex w-full items-center py-2 text-lg font-semibold"
                                    key={item.href}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
                <Link href="/" className="mr-6 hidden lg:flex">
                    Acme Inc
                </Link>
                <nav className="ml-auto hidden gap-6 lg:flex">
                    {navItems.map((item) => (
                        <Link
                            href={item.href}
                            className="rounded-md px-4 py-2 hover:bg-gray-100 hover:text-gray-900"
                            key={item.href}
                        >
                            Home
                        </Link>
                    ))}
                </nav>
            </header>
            <main className="container mx-auto pt-4 px-4 md:px-0">{children}</main>
        </div>
    );
}

function MenuIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
    );
}
// export default function Authenticated({
//     header,
//     children,
// }: PropsWithChildren<{ header?: ReactNode }>) {
//     const user = usePage().props.auth.user;

//     const [showingNavigationDropdown, setShowingNavigationDropdown] =
//         useState(false);

//     return (
//         <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
//             <nav className="border-b border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800">
//                 <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//                     <div className="flex h-16 justify-between">
//                         <div className="flex">
//                             <div className="flex shrink-0 items-center">
//                                 <Link href="/">
//                                     <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
//                                 </Link>
//                             </div>

//                             <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
//                                 <NavLink
//                                     href={route('dashboard')}
//                                     active={route().current('dashboard')}
//                                 >
//                                     Dashboard
//                                 </NavLink>
//                             </div>
//                         </div>

//                         <div className="hidden sm:ms-6 sm:flex sm:items-center">
//                             <div className="relative ms-3">
//                                 <Dropdown>
//                                     <Dropdown.Trigger>
//                                         <span className="inline-flex rounded-md">
//                                             <button
//                                                 type="button"
//                                                 className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
//                                             >
//                                                 {user.name}

//                                                 <svg
//                                                     className="-me-0.5 ms-2 h-4 w-4"
//                                                     xmlns="http://www.w3.org/2000/svg"
//                                                     viewBox="0 0 20 20"
//                                                     fill="currentColor"
//                                                 >
//                                                     <path
//                                                         fillRule="evenodd"
//                                                         d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                                                         clipRule="evenodd"
//                                                     />
//                                                 </svg>
//                                             </button>
//                                         </span>
//                                     </Dropdown.Trigger>

//                                     <Dropdown.Content>
//                                         <Dropdown.Link
//                                             href={route('profile.edit')}
//                                         >
//                                             Profile
//                                         </Dropdown.Link>
//                                         <Dropdown.Link
//                                             href={route('logout')}
//                                             method="post"
//                                             as="button"
//                                         >
//                                             Log Out
//                                         </Dropdown.Link>
//                                     </Dropdown.Content>
//                                 </Dropdown>
//                             </div>
//                         </div>

//                         <div className="-me-2 flex items-center sm:hidden">
//                             <button
//                                 onClick={() =>
//                                     setShowingNavigationDropdown(
//                                         (previousState) => !previousState,
//                                     )
//                                 }
//                                 className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-gray-400 dark:focus:bg-gray-900 dark:focus:text-gray-400"
//                             >
//                                 <svg
//                                     className="h-6 w-6"
//                                     stroke="currentColor"
//                                     fill="none"
//                                     viewBox="0 0 24 24"
//                                 >
//                                     <path
//                                         className={
//                                             !showingNavigationDropdown
//                                                 ? 'inline-flex'
//                                                 : 'hidden'
//                                         }
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         strokeWidth="2"
//                                         d="M4 6h16M4 12h16M4 18h16"
//                                     />
//                                     <path
//                                         className={
//                                             showingNavigationDropdown
//                                                 ? 'inline-flex'
//                                                 : 'hidden'
//                                         }
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         strokeWidth="2"
//                                         d="M6 18L18 6M6 6l12 12"
//                                     />
//                                 </svg>
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 <div
//                     className={
//                         (showingNavigationDropdown ? 'block' : 'hidden') +
//                         ' sm:hidden'
//                     }
//                 >
//                     <div className="space-y-1 pb-3 pt-2">
//                         <ResponsiveNavLink
//                             href={route('dashboard')}
//                             active={route().current('dashboard')}
//                         >
//                             Dashboard
//                         </ResponsiveNavLink>
//                     </div>

//                     <div className="border-t border-gray-200 pb-1 pt-4 dark:border-gray-600">
//                         <div className="px-4">
//                             <div className="text-base font-medium text-gray-800 dark:text-gray-200">
//                                 {user.name}
//                             </div>
//                             <div className="text-sm font-medium text-gray-500">
//                                 {user.email}
//                             </div>
//                         </div>

//                         <div className="mt-3 space-y-1">
//                             <ResponsiveNavLink href={route('profile.edit')}>
//                                 Profile
//                             </ResponsiveNavLink>
//                             <ResponsiveNavLink
//                                 method="post"
//                                 href={route('logout')}
//                                 as="button"
//                             >
//                                 Log Out
//                             </ResponsiveNavLink>
//                         </div>
//                     </div>
//                 </div>
//             </nav>

//             {header && (
//                 <header className="bg-white shadow dark:bg-gray-800">
//                     <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//                         {header}
//                     </div>
//                 </header>
//             )}

//             <main>{children}</main>
//         </div>
//     );
// }
