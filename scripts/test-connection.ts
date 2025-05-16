import { createClient } from '@sanity/client'
import { apiVersion, dataset, projectId } from '../src/sanity/env'

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

async function testConnection() {
  try {
    // Test 1: Read operation
    console.log('Testing read operation...')
    const readResult = await client.fetch('*[_type == "event"][0]')
    console.log('Read test successful!')
    console.log('Read result:', readResult)

    // Test 2: Write operation
    console.log('\nTesting write operation...')
    const testEvent = {
      _type: 'event',
      title: 'Test Event',
      slug: { _type: 'slug', current: 'test-event' },
      category: 'wedding',
      date: new Date().toISOString(),
      description: 'This is a test event to verify write permissions.',
      featured: false,
    }
    
    const writeResult = await client.create(testEvent)
    console.log('Write test successful!')
    console.log('Created event:', writeResult)

    // Test 3: Delete operation (cleanup)
    console.log('\nCleaning up test data...')
    await client.delete(writeResult._id)
    console.log('Cleanup successful!')

    console.log('\nAll tests passed successfully! 🎉')
  } catch (error) {
    console.error('Test failed:', error)
  }
}

testConnection() 