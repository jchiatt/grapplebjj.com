# Grapple Website Project Overview

## Project Summary

A modern, responsive website redesign for Grapple, a submission grappling gym in Pearl, Mississippi. The site will serve as both an informational platform for prospective students and a portal for current members.

## Technical Requirements

### Core Technologies

- Frontend Framework: Next.js
- Styling: Tailwind CSS
- Authentication: Integration with external member management system
- Content Management: MDX for articles and blog posts
- API Integration: YouTube API for video feeds
- Analytics: Google Analytics

### Key Features

#### Public Pages

1. **Home Page**

   - Hero section with clear value proposition
   - Featured YouTube videos
   - Latest articles preview
   - Social proof (testimonials/success stories)
   - Quick access to trial signup
   - Upcoming events preview

2. **Schedule Page**

   - Interactive class schedule
   - Class descriptions
   - Instructor information
   - Filterable by class type/level

3. **Livestream Portal**

   - Embedded YouTube livestream player
   - Stream schedule
   - Chat integration (if applicable)
   - Archive of past streams

4. **Pricing Page**

   - Membership tiers
   - Comparison table
   - Special discounts section
   - FAQ section
   - Clear CTA for trial class

5. **Articles Section**

   - Category-based organization
   - Search functionality
   - Related articles suggestions
   - Social sharing integration

6. **Events Page**
   - Calendar view
   - Event details
   - Registration integration
   - Past events archive

#### Member Features

1. **Authentication**

   - Seamless integration with existing member portal
   - SSO capabilities if applicable

2. **Member Dashboard**
   - Account management
   - Class attendance history
   - Progress tracking
   - Direct link to external member portal

### Design Requirements

#### Visual Identity

- Clean, professional aesthetic with cyberpunk influences
- High contrast for readability
- Mobile-first approach

#### Logo System

- Dynamic logo variations that adapt to theme changes
- Core logo structure remains consistent across themes

##### Color Variations

- Default (Purple): Primary logo with rgb(126 58 242) as dominant color
- Neon Blue: Logo adapted to rgb(56 189 248) palette
- Cyber Green: Logo variation using rgb(34 197 94)
- Synthwave: Logo styled with rgb(236 72 153)

##### Animation Specifications

- Theme Transition Duration: 300ms
- Easing Function: cubic-bezier(0.4, 0, 0.2, 1)
- Color Fade Timing: 200ms
- Hover Scale: 1.05x with 150ms duration
- Loading State: Subtle pulse animation (1s cycle)
- Sequential color transitions for multi-element logos
- Reduced motion support for accessibility

##### Logo Placement & Sizing

- Header Logo:
  - Desktop: 40px height, 24px margin
  - Tablet: 36px height, 20px margin
  - Mobile: 32px height, 16px margin
- Footer Logo:
  - Desktop: 48px height
  - Mobile: 40px height
- Favicon: 32px × 32px
- Social Media:
  - Square format: 300px × 300px
  - Minimum size: 24px height
- Clear space: 1x logo height on all sides
- Maximum size: 60px height for all applications

#### Typography System

- Primary Font: Inter
  - Headers: Semi-bold (600)
  - Body: Regular (400)
  - Navigation: Medium (500)
- Secondary Font: Space Grotesk
  - Featured text
  - Technical terms
  - Numerical data

##### Font Sizes

- Desktop:
  - h1: 48px / 1.1 line-height
  - h2: 36px / 1.2 line-height
  - h3: 24px / 1.3 line-height
  - Body: 16px / 1.5 line-height
  - Small: 14px / 1.5 line-height
- Mobile:
  - h1: 36px / 1.1 line-height
  - h2: 28px / 1.2 line-height
  - h3: 20px / 1.3 line-height
  - Body: 16px / 1.5 line-height
  - Small: 14px / 1.5 line-height

##### Typography Animation

- Text color transitions: 200ms
- Font loading strategy: Swap with system fonts
- Progressive enhancement for variable fonts
- Smooth size transitions for responsive changes

##### Font Features

- Variable font support
- OpenType features enabled
- Proper quotation marks
- Tabular numbers for data
- Enabled kerning
- Smart underlines for links

#### Dynamic Color System

- Default Theme:

  - Primary: rgb(126 58 242) // Bold purple
  - Secondary: rgb(17 24 39) // Deep gray
  - Accent: rgb(239 68 68) // Vibrant red

- Alternative Theme Palettes:

  1. Neon Blue

     - Primary: rgb(56 189 248) // Bright cyan
     - Secondary: rgb(17 24 39)
     - Accent: rgb(251 146 60) // Neon orange

  2. Cyber Green

     - Primary: rgb(34 197 94) // Electric green
     - Secondary: rgb(17 24 39)
     - Accent: rgb(216 180 254) // Soft purple

  3. Synthwave
     - Primary: rgb(236 72 153) // Hot pink
     - Secondary: rgb(17 24 39)
     - Accent: rgb(56 189 248) // Bright blue

- Theme Implementation:

  - CSS Variables for dynamic color switching
  - Persistent user preference storage
  - System dark mode detection
  - Smooth transitions between themes
  - High contrast maintainance across all themes

- Color Application:
  - Primary: Main brand color, primary buttons, highlights
  - Secondary: Backgrounds, cards, containers
  - Accent: CTAs, important notifications, interactive elements
  - Each theme maintains consistent contrast ratios
  - Gradient overlays for depth and cyberpunk aesthetic

#### User Experience

- Maximum 3 clicks to reach any destination
- Prominent CTAs for trial signups
- Clear navigation hierarchy
- Fast loading times (target < 3s)
- Responsive design for all screen sizes

### Integration Points

1. **YouTube API**

   - Latest videos feed
   - Livestream integration
   - Channel statistics

2. **Member Management System**

   - Authentication flow
   - Account management
   - Payment processing

3. **Social Media**

   - Instagram feed
   - Facebook events integration
   - Twitter/X feed

4. **E-commerce**
   - Seamless navigation to external shop (grapple.store)
   - Consistent branding between platforms

### Performance Goals

- PageSpeed Insights score > 90
- First Contentful Paint < 1.5s
- Time to Interactive < 3.5s
- Perfect accessibility score
- SEO optimization for local search

### Security Requirements

- SSL/TLS encryption
- Regular security audits
- GDPR compliance
- Secure data handling
- Protected API endpoints

### Development Phases

#### Phase 1: Foundation

- Project setup and configuration
- Core pages development
- Basic styling implementation
- Navigation structure

#### Phase 2: Features

- YouTube integration
- Article system implementation
- Events calendar
- Authentication integration

#### Phase 3: Enhancement

- Performance optimization
- SEO implementation
- Analytics setup
- Content population

#### Phase 4: Launch

- Testing and QA
- Content review
- Soft launch
- Full deployment

### Maintenance Plan

- Regular content updates
- Performance monitoring
- Security patches
- Backup strategy
- Analytics review

## Next Steps

1. Confirm technical specifications
2. Gather brand assets and guidelines
3. Create detailed wireframes
4. Develop component library
5. Begin implementation

## More Ideas

## Company Metadata

Phone
(769) 257-0260

Address
5709 US 80 E
2nd Floor
Pearl, MS 39208

We are located in the 2nd floor of Focus Fit. Walk in, check in with their front desk, and then walk all the way back. Staircase is on the left after you've walked all the way back. Call if you have trouble finding us!

Email
info@grapplebjj.com

# TODO

- Floating video embed when we are live
- Video from me on homepage
- Video from me on about page
- Contact page
- Kids page
- Video from me on trial page
- GIF from us on join page
- Video from me on the join page
- GIF from us on join page
- Video from me on drop in page
- GIF from us on join page
- Video from me on thank you page
- Gather more testimonials
- Update about page copy
- Update my coach profile copy
- Add coach profiles for all coaches
- Write articles related to various audiences
- Latest articles preview on homepage
- Floating link on the side of the page to go to trial page
- Recent streams to livestream page
- More FAQs
- Add pop up chat bot where they can ask questions about Grapple or jiu jitsu, it can also direct them to pages on the site when they have specific questions about those respective topics
- Link to log in for existing members
- Make GIFs

# Automations

- Send a thank you email to new members after they sign up for a trial class
- Send a thank you email to new members after they sign up for a membership
- Send a thank you email to new members after they sign up for a drop in class
- Send a thank you email to new members after they sign up for a membership
- Create a task to create a personalized welcome video for new members
- Invite to Skool and WhatsApp
