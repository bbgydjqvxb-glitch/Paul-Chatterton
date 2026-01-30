import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'ybrfxq5h',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
});

// Defensive fetch wrapper
export async function fetchFromSanity(query, fallback = null) {
  try {
    const result = await client.fetch(query);
    return result ?? fallback;
  } catch (error) {
    console.error('Sanity fetch error:', error);
    return fallback;
  }
}

// Utility functions following defensive coding patterns
export function formatYear(year) {
  return typeof year === 'number' ? year.toString() : '';
}

export function truncateText(text, maxLength = 150) {
  if (!text || typeof text !== 'string') return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export function formatDate(dateString) {
  if (!dateString) return '';
  try {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return '';
  }
}
