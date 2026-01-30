import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Marine Pumps - Shinko, Taiko, Desmi, Hamworthy, Allweiler | UTS Marine LLP',
    description: 'Certified reconditioned marine pumps for all vessel systems. Stocking Shinko, Taiko, Naniwa, Desmi, Hamworthy, and Allweiler. Main engine cooling, ballast, and fire pumps.',
    keywords: 'marine pump, Shinko pump, Taiko Kikai pump, Desmi pump, Hamworthy pump, Allweiler pump, ballast pump, cooling water pump, fire pump, general service pump',
    openGraph: {
        title: 'Marine Pumps | UTS Marine LLP',
        description: 'Certified reconditioned marine pumps for essential ship systems',
        type: 'website',
    },
};

export default function MarinePumpsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
