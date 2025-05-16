export const eventsQuery = `*[_type == "event"] | order(date desc) {
  _id,
  title,
  slug,
  category,
  mainImage,
  date,
  description,
  featured
}`;

export const featuredEventsQuery = `*[_type == "event" && featured == true] | order(date desc) {
  _id,
  title,
  slug,
  category,
  mainImage,
  date,
  description
}`;

export const servicesQuery = `*[_type == "service"] | order(order asc) {
  _id,
  title,
  slug,
  image,
  description,
  features,
  order
}`;

export const teamMembersQuery = `*[_type == "teamMember"] | order(order asc) {
  _id,
  name,
  role,
  image,
  bio,
  order
}`;

export const contactInfoQuery = `*[_type == "contactInfo"] | order(order asc) {
  _id,
  title,
  content,
  icon,
  order
}`; 