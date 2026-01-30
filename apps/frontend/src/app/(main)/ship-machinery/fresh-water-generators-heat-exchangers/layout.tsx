import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Fresh Water Generators & Heat Exchangers - Alfa Laval, Sasakura, Nirex | UTS Marine LLP',
    description: 'Marine desalination plants and heat exchangers. Stocking Alfa Laval (JWP, DPU), Nirex, Sasakura (AFGU), and Atlas units. Complete fresh water generators and plate heat exchangers.',
    keywords: 'fresh water generator, marine desalination plant, heat exchanger, plate heat exchanger, Alfa Laval Nirex, Sasakura fresh water generator, JWP-26, JWP-36, AFGU desalination',
    openGraph: {
        title: 'Fresh Water Generators & Heat Exchangers | UTS Marine LLP',
        description: 'Essential marine desalination and heat transfer solutions',
        type: 'website',
    },
};

export default function FreshWaterGeneratorsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
