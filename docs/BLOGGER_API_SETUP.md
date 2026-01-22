# Blogger API Setup

This document explains how to set up the Blogger API integration for the Invasion Day website.

## Overview

The updates page fetches blog posts from a Blogger blog and displays them in a clean, modern layout. The integration includes:

- API endpoint to fetch posts from Blogger
- Updates page to display the posts
- Navigation link to access the updates page

## Setup Instructions

### 1. Get Blogger API Credentials

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Blogger API v3:
   - Go to "APIs & Services" > "Library"
   - Search for "Blogger API v3"
   - Click on it and press "Enable"

### 2. Create API Key

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy the API key (you'll need this for the environment variable)

### 3. Find Your Blog ID

1. Go to your Blogger blog
2. Look at the URL - it will be something like: `https://www.blogger.com/blog/post/edit/12345678901234567890/12345678901234567890`
3. The first long number is your blog ID
4. Alternatively, you can use the blog's custom domain if you have one

### 4. Set Environment Variables

Add these environment variables to your `.env.local` file:

```env
BLOGGER_BLOG_ID=your_blog_id_here
BLOGGER_API_KEY=your_api_key_here
```

### 5. Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to `/updates` to see the blog posts
3. Check the browser console and server logs for any errors

## API Endpoint

The `/api/blogger-posts` endpoint:

- Fetches up to 10 posts from your Blogger blog
- Orders them by publication date (newest first)
- Returns cleaned data with excerpts
- Handles errors gracefully

## Features

### Updates Page (`/updates`)
- Clean, modern design matching the site's aesthetic
- Loading states and error handling
- Responsive layout
- Links to original blog posts
- Shows publication date and author

### Blog Post Component
- Reusable component for displaying individual posts
- Consistent styling across the site
- Hover effects and transitions
- External link indicators

## Troubleshooting

### Common Issues

1. **"Blogger API credentials not configured"**
   - Check that both environment variables are set
   - Restart your development server after adding environment variables

2. **"Blogger API responded with status: 403"**
   - Verify your API key is correct
   - Make sure the Blogger API is enabled in your Google Cloud project

3. **"Blogger API responded with status: 404"**
   - Check that your blog ID is correct
   - Ensure the blog is public (private blogs require OAuth authentication)

4. **No posts showing up**
   - Verify your blog has published posts
   - Check that the posts are public
   - Look at the browser's network tab to see the API response

### Debug Mode

To see more detailed error information, you can temporarily modify the API endpoint to log the full response:

```typescript
// In src/pages/api/blogger-posts.ts
console.log('API Response:', await response.text());
```

## Security Notes

- The API key is public and safe to use in client-side code
- For additional security, you can restrict the API key to only the Blogger API and your domain
- Consider implementing rate limiting for production use

## Future Enhancements

Potential improvements to consider:

1. **Pagination**: Load more posts as the user scrolls
2. **Categories**: Filter posts by category/tag
3. **Search**: Add search functionality
4. **Caching**: Cache posts to reduce API calls
5. **OAuth**: Use OAuth for private blogs
6. **Comments**: Display comment counts
7. **Social sharing**: Add social media sharing buttons 