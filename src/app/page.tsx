import Image from "next/image";
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/client';
import { featuredEventsQuery } from '@/sanity/lib/queries';

async function getFeaturedEvents() {
  return await client.fetch(featuredEventsQuery);
}

export default async function Home() {
  const featuredEvents = await getFeaturedEvents();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.jpg"
            alt="Event Planning Background"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Creating Unforgettable Moments
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Professional Event Planning & Management
          </p>
          <Link
            href="/contact"
            className="bg-secondary text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-secondary-dark transition-all"
          >
            Let's Plan Your Event
          </Link>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary">Featured Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event: any) => (
              <div key={event._id} className="bg-white rounded-lg overflow-hidden shadow-lg border border-primary-light">
                <div className="relative h-64">
                  <Image
                    src={event.mainImage ? urlFor(event.mainImage).url() : '/placeholder.jpg'}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-primary-dark">{event.title}</h3>
                  <p className="text-gray-600 mb-2">
                    {new Date(event.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-gray-600">
                    {event.description}
                  </p>
                  <Link
                    href={`/portfolio/${event.slug.current}`}
                    className="mt-4 text-secondary hover:text-secondary-dark font-medium transition-colors inline-block"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
