import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Marine Air Compressors - Tanabe, Yanmar, Sperre, Hatlapa | UTS Marine LLP',
    description: 'Reliable marine air compressors from Tanabe, Yanmar, Sperre, Hatlapa, and Hamworthy. Reconditioned units and spare parts for main and emergency air compressors.',
    keywords: 'marine air compressor, Tanabe compressor, Yanmar compressor, Sperre compressor, Hatlapa compressor, Hamworthy compressor, starting air compressor, emergency air compressor',
    openGraph: {
        title: 'Marine Air Compressors | UTS Marine LLP',
        description: 'Reconditioned and reusable marine air compressors for all vessel types',
        type: 'website',
    },
};

export default function AirCompressorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
