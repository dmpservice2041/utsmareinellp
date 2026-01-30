import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Refrigeration Compressors - Carrier, Sabroe, Bitzer, Daikin | UTS Marine LLP',
    description: 'Reconditioned marine refrigeration compressors from Carrier, Sabroe, Daikin, Bitzer, Bock, and York. Reliable cooling solutions for provisions and cargo.',
    keywords: 'marine refrigeration compressor, Carrier compressor, Sabroe compressor, Daikin compressor, Bitzer compressor, Bock compressor, marine HVAC, provision cooling compressor',
    openGraph: {
        title: 'Refrigeration Compressors | UTS Marine LLP',
        description: 'Mission-critical marine refrigeration compressors and cooling solutions',
        type: 'website',
    },
};

export default function RefrigerationCompressorsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
