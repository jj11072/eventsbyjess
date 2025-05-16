import { client } from '@/sanity/lib/client';
import { eventsQuery } from '@/sanity/lib/queries';
import PortfolioClient from './PortfolioClient';

async function getEvents() {
    return await client.fetch(eventsQuery);
}

export default async function Portfolio() {
    const events = await getEvents();
    return <PortfolioClient events={events} />;
} 