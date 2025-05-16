'use client'

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import { StructureBuilder } from 'sanity/desk'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './src/sanity/env'
import {schemaTypes} from './src/sanity/schemaTypes'

const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Events')
        .child(
          S.documentList()
            .title('Events')
            .filter('_type == "event"')
        ),
      S.listItem()
        .title('Services')
        .child(
          S.documentList()
            .title('Services')
            .filter('_type == "service"')
        ),
      S.listItem()
        .title('Team Members')
        .child(
          S.documentList()
            .title('Team Members')
            .filter('_type == "teamMember"')
        ),
      S.listItem()
        .title('Contact Info')
        .child(
          S.documentList()
            .title('Contact Info')
            .filter('_type == "contactInfo"')
        ),
    ])

export default defineConfig({
  name: 'default',
  title: 'Events by Jess',
  projectId,
  dataset,
  apiVersion,
  basePath: '/studio',
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema: {
    types: schemaTypes,
  },
  plugins: [
    deskTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool(),
  ],
})
