import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/client';
import { servicesQuery } from '@/sanity/lib/queries';

async function getServices() {
    return await client.fetch(servicesQuery);
}

export default async function Services() {
    const services = await getServices();

    return (
        <main className="pt-20">
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">Our Services</h1>
                    <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
                        We offer comprehensive event planning services tailored to your unique vision and needs.
                    </p>

                    <div className="space-y-24">
                        {services.map((service: any, index: number) => (
                            <div
                                key={service._id}
                                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    } gap-12 items-center`}
                            >
                                <div className="w-full md:w-1/2">
                                    <div className="relative h-[400px] rounded-lg overflow-hidden">
                                        <Image
                                            src={service.image ? urlFor(service.image).url() : '/placeholder.jpg'}
                                            alt={service.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2">
                                    <h2 className="text-3xl font-bold mb-4 text-primary-dark">{service.title}</h2>
                                    <p className="text-gray-600 mb-6">{service.description}</p>
                                    <ul className="space-y-3">
                                        {service.features.map((feature: string) => (
                                            <li key={feature} className="flex items-center">
                                                <svg
                                                    className="w-5 h-5 text-secondary mr-3"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
} 