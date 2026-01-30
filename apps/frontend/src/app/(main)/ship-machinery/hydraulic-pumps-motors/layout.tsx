import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Hydraulic Pumps & Motors - Rexroth, Kawasaki, IHI, Hagglunds | UTS Marine LLP',
    description: 'Reconditioned hydraulic pumps and motors for marine deck machinery. Stocking Rexroth, Kawasaki Staffa, IHI, Mitsubishi, and Hagglunds. High-torque motors and heavy-duty pumps.',
    keywords: 'marine hydraulic pump, hydraulic motor, Rexroth A2F, Kawasaki Staffa motor, IHI hydraulic pump, Hagglunds motor, neurological motor, deck machinery hydraulics, winch motor',
    openGraph: {
        title: 'Hydraulic Pumps & Motors | UTS Marine LLP',
        description: 'Heavy-duty hydraulic pumps and motors for marine applications',
        type: 'website',
    },
};

export default function HydraulicPumpsMotorsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
