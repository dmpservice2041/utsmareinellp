import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Marine Main & Auxiliary Engines - MAN B&W, Wärtsilä, MAK | UTS Marine LLP',
    description: 'Used marine main and auxiliary diesel engines from MAN B&W, Wärtsilä, MAK, Sulzer, and more. Complete engines ready for installation. Global shipping.',
    keywords: 'marine diesel engine, main engine, auxiliary engine, MAN B&W engine, Wartsila engine, MAK engine, used marine engine, MAN B&W L45GFCA',
    openGraph: {
        title: 'Marine Main & Auxiliary Engines | UTS Marine LLP',
        description: 'Premium used marine diesel engines for ships and power plants',
        type: 'website',
    },
};

export default function MainAuxiliaryEngineLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
