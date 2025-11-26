import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { ItineraryPages } from './collections/ItineraryPages'
import { AccommodationPages } from './collections/AccommodationPages'
import { DestinationPages } from './collections/DestinationPages'
import { ExperiencePages } from './collections/ExperiencePages'
import { Gallery } from './collections/Gallery'
import { Testimonials } from './collections/Testimonials'
import { Maldives } from './collections/Maldives'
import { Blog } from './collections/Blog'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
  },
  collections: [
    Users,
    Media,
    ItineraryPages,
    AccommodationPages,
    DestinationPages,
    ExperiencePages,
    Gallery,
    Testimonials,
    Maldives,
    Blog,
  ],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key-here',
  sharp,
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || 'mongodb://localhost:27017/ceyara-tours',
  }),
})
