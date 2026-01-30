import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Marine Turbochargers - ABB, Mitsubishi, MAN B&W, Napier | UTS Marine LLP',
    description: 'Reconditioned marine turbochargers and spare parts. Stocking ABB (VTR, TPL, TPS), Mitsubishi (MET), MAN B&W (NR, NA, TCR), Napier, and KBB units. Global shipping.',
    keywords: 'marine turbocharger, turbocharger spare parts, ABB turbocharger, Mitsubishi MET, MAN B&W turbocharger, Napier turbocharger, turbocharger cartridge, rotor assembly',
    openGraph: {
        title: 'Marine Turbochargers | UTS Marine LLP',
        description: 'High-performance reconditioned marine turbochargers and spares',
        type: 'website',
    },
};

export default function MarineTurbochargersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
