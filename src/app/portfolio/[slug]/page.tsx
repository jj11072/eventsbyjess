import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/client';
import { notFound } from 'next/navigation';

interface SanityImage {
    _type: 'image';
    asset: {
        _ref: string;
        _type: 'reference';
    };
}

interface Event {
    _id: string;
    title: string;
    slug: { current: string };
    category: string;
    mainImage: SanityImage | null;
    date: string;
    description: string;
    gallery: SanityImage[];
}

async function getEvent(slug: string): Promise<Event | null> {
    const query = `*[_type == "event" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    category,
    mainImage,
    date,
    description,
    gallery
  }`;

    const event = await client.fetch(query, { slug });
    if (!event) return null;
    return event;
}

type PageProps = {
    params: Promise<{ slug: string }>;
}

export default async function EventPage(props: PageProps) {
    const { slug } = await props.params;
    const event = await getEvent(slug);

    if (!event) {
        notFound();
    }

    return (
        <main className="pt-20">
            <article className="max-w-7xl mx-auto px-4 py-12">
                {/* Hero Section */}
                <div className="relative h-[60vh] mb-12 rounded-lg overflow-hidden">
                    <Image
                        src={event.mainImage ? urlFor(event.mainImage).url() : '/placeholder.jpg'}
                        alt={event.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <div className="text-center text-white">
                            <h1 className="text-4xl md:text-6xl font-bold mb-4">{event.title}</h1>
                            <p className="text-xl">
                                {new Date(event.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Event Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="md:col-span-2">
                        <div className="prose max-w-none">
                            <p className="text-lg text-gray-600">{event.description}</p>
                        </div>

                        {/* Gallery */}
                        {event.gallery && event.gallery.length > 0 && (
                            <div className="mt-12">
                                <h2 className="text-2xl font-bold mb-6 text-primary">Event Gallery</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {event.gallery.map((image: SanityImage, index: number) => (
                                        <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                                            <Image
                                                src={urlFor(image).url()}
                                                alt={`${event.title} - Image ${index + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <div className="bg-white p-6 rounded-lg shadow-lg border border-primary-light">
                            <h3 className="text-xl font-semibold mb-4 text-primary">Event Details</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-500">Category</p>
                                    <p className="font-medium text-primary-dark">{event.category}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Date</p>
                                    <p className="font-medium text-primary-dark">
                                        {new Date(event.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-secondary text-white p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-4">Interested in Similar Events?</h3>
                            <p className="mb-6">
                                Let&apos;s help you create your own unforgettable experience.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-block bg-white text-secondary px-6 py-2 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                Get in Touch
                            </Link>
                        </div>
                    </div>
                </div>
            </article>
        </main>
    );
} 