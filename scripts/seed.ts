import { config } from 'dotenv';
config({ path: '.env.local' });
import { createClient } from '@sanity/client'

// Debug: Log environment variables
console.log('Environment variables:', {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  hasToken: !!process.env.SANITY_API_TOKEN
});

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-13',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // You'll need to add this to your .env file
})

const events = [
  {
    _type: 'event',
    title: 'Summer Garden Wedding',
    slug: { _type: 'slug', current: 'summer-garden-wedding' },
    category: 'wedding',
    date: '2024-06-15',
    description: 'A beautiful summer wedding in a garden setting with 150 guests.',
    featured: true,
  },
  {
    _type: 'event',
    title: 'Corporate Annual Gala',
    slug: { _type: 'slug', current: 'corporate-annual-gala' },
    category: 'corporate',
    date: '2024-07-20',
    description: 'Annual corporate gala with keynote speakers and networking opportunities.',
    featured: true,
  },
  {
    _type: 'event',
    title: 'Birthday Celebration',
    slug: { _type: 'slug', current: 'birthday-celebration' },
    category: 'social',
    date: '2024-08-10',
    description: 'A milestone birthday celebration with themed decorations and entertainment.',
    featured: false,
  },
]

const services = [
  {
    _type: 'service',
    title: 'Wedding Planning',
    slug: { _type: 'slug', current: 'wedding-planning' },
    description: 'Full-service wedding planning and coordination to make your special day perfect.',
    features: [
      'Vendor coordination',
      'Timeline management',
      'Budget planning',
      'Day-of coordination',
    ],
    order: 1,
  },
  {
    _type: 'service',
    title: 'Corporate Events',
    slug: { _type: 'slug', current: 'corporate-events' },
    description: 'Professional corporate event planning for businesses of all sizes.',
    features: [
      'Conference planning',
      'Team building events',
      'Corporate retreats',
      'Annual meetings',
    ],
    order: 2,
  },
]

const teamMembers = [
  {
    _type: 'teamMember',
    name: 'Jessica Smith',
    role: 'Lead Event Planner',
    bio: 'With over 10 years of experience in event planning, Jessica brings creativity and expertise to every event.',
    order: 1,
  },
  {
    _type: 'teamMember',
    name: 'Michael Johnson',
    role: 'Event Coordinator',
    bio: 'Michael specializes in corporate events and brings a detail-oriented approach to every project.',
    order: 2,
  },
]

async function seed() {
  try {
    // Create events
    for (const event of events) {
      await client.create(event)
      console.log(`Created event: ${event.title}`)
    }

    // Create services
    for (const service of services) {
      await client.create(service)
      console.log(`Created service: ${service.title}`)
    }

    // Create team members
    for (const member of teamMembers) {
      await client.create(member)
      console.log(`Created team member: ${member.name}`)
    }

    console.log('Seed completed successfully!')
  } catch (error) {
    console.error('Error seeding data:', error)
  }
}

seed() 