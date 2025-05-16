'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';

const categories = [
    { id: 'all', name: 'All Events' },
    { id: 'wedding', name: 'Weddings' },
    { id: 'corporate', name: 'Corporate Events' },
    { id: 'social', name: 'Social Events' },
];

interface Event {
    _id: string;
    title: string;
    slug: { current: string };
    category: string;
    mainImage: {
        asset: {
            _ref: string;
        };
    } | null;
    date: string;
    description: string;
    featured: boolean;
}

interface PortfolioClientProps {
    events: Event[];
}

export default function PortfolioClient({ events }: PortfolioClientProps) {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredEvents = selectedCategory === 'all'
        ? events
        : events.filter(event => event.category === selectedCategory);

    return (
        <main className="pt-20">
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">Our Portfolio</h1>
                    <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
                        Take a look at some of our most memorable events and celebrations.
                    </p>

                    {/* Category Filter */}
                    <div className="flex justify-center mb-12 space-x-4">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-6 py-2 rounded-full transition-colors ${selectedCategory === category.id
                                    ? 'bg-secondary text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>

                    {/* Event Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredEvents.map((event) => (
                            <Link
                                key={event._id}
                                href={`/portfolio/${event.slug.current}`}
                                className="group"
                            >
                                <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105">
                                    <div className="relative h-64">
                                        <Image
                                            src={event.mainImage ? urlFor(event.mainImage).url() : '/placeholder.jpg'}
                                            alt={event.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-semibold text-primary-dark">{event.title}</h3>
                                            <span className="text-sm text-gray-500">
                                                {new Date(event.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                        <p className="text-gray-600">{event.description}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-primary">
                                                {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Call to Action */}
                    <div className="text-center mt-16">
                        <h2 className="text-2xl font-bold mb-4 text-primary">Ready to Create Your Perfect Event?</h2>
                        <p className="text-gray-600 mb-8">
                            Let&apos;s create something extraordinary together.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block bg-secondary text-white px-8 py-3 rounded-full hover:bg-secondary-dark transition-colors"
                        >
                            Get in Touch
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
} 