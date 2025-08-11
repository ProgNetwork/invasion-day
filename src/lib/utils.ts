import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes with proper conflict resolution
 * Uses clsx for conditional classes and twMerge to handle Tailwind class conflicts
 * @param inputs - Array of class values (strings, objects, arrays, etc.)
 * @returns Merged class string with conflicts resolved
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Calculate the estimated read time for a blog post
 * @param content - The HTML content of the blog post
 * @returns Estimated read time in minutes (minimum 1 minute)
 */
export function calculateReadTime(content: string): number {
  // Remove HTML tags and get plain text
  const plainText = content.replace(/<[^>]*>/g, '');
  // Count words (split by whitespace)
  const wordCount = plainText.split(/\s+/).filter(word => word.length > 0).length;
  // Average reading speed is 200-250 words per minute, using 225 as average
  const readTime = Math.ceil(wordCount / 225);
  return Math.max(1, readTime); // Minimum 1 minute
}

/**
 * Extract the first image from blog post content
 * @param content - The HTML content of the blog post
 * @returns The image URL or null if no image found
 */
export function extractHeroImage(content: string): string | null {
  const imgMatch = content.match(/<img[^>]+src="([^"]+)"/);
  return imgMatch ? imgMatch[1] : null;
}

/**
 * Extract all images from blog post content
 * @param content - The HTML content of the blog post
 * @returns Array of image URLs (preferring full-size images from href attributes)
 */
export function extractAllImages(content: string): string[] {
  // First try to find full-size images from href attributes in links containing images
  const linkMatches = content.match(/<a[^>]+href="([^"]+)"[^>]*>.*?<img[^>]*>/g);
  if (linkMatches) {
    return linkMatches.map(match => {
      const hrefMatch = match.match(/href="([^"]+)"/);
      return hrefMatch ? hrefMatch[1] : '';
    }).filter(Boolean);
  }
  
  // Fallback to extracting from img src attributes if no links found
  const imgMatches = content.match(/<img[^>]+src="([^"]+)"/g);
  if (!imgMatches) return [];
  
  return imgMatches.map(match => {
    const srcMatch = match.match(/src="([^"]+)"/);
    return srcMatch ? srcMatch[1] : '';
  }).filter(Boolean);
}

/**
 * Clean HTML content by decoding HTML entities
 * @param content - The HTML content to clean
 * @returns Cleaned HTML content
 */
export function cleanContent(content: string): string {
  return content
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

/**
 * Extract a short excerpt from blog post content
 * @param content - The HTML content of the blog post
 * @returns Plain text excerpt (first 200 characters with ellipsis if longer)
 */
export function extractExcerpt(content: string): string {
  // Remove HTML tags and get plain text
  const plainText = content.replace(/<[^>]*>/g, '');

  // Return first 200 characters with ellipsis if longer
  if (plainText.length <= 200) {
    return plainText;
  }

  return `${plainText.substring(0, 200)}...`;
}

/**
 * Format a date string to Australian locale format
 * @param dateString - ISO date string
 * @returns Formatted date string (e.g., "6 August 2025")
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format a date string to Australian locale format with time
 * @param dateString - ISO date string
 * @returns Formatted date string with time (e.g., "Monday, 6 August 2025 at 2:30 PM")
 */
export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-AU', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Format event location into a readable string
 * @param eventLocation - Event location object
 * @returns Formatted location string (e.g., "Venue Name, Address, City, Region, Country")
 */
export function formatLocation(eventLocation: {
  venueName: string;
  address: string;
  city: string;
  region: string;
  country: string;
}): string {
  const parts = [
    eventLocation.venueName,
    eventLocation.address,
    eventLocation.city,
    eventLocation.region,
    eventLocation.country,
  ].filter(Boolean);
  return parts.join(', ');
}
