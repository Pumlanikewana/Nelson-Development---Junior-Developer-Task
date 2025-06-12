// api/sort-string.js
export default async function handler(req, res) {
  // Set CORS headers to allow requests from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Please use POST.' });
  }

  try {
    console.log('Received request:', req.method, req.body);
    
    // Get the data from the request body
    const { data } = req.body;

    // Check if data exists and is a string
    if (!data || typeof data !== 'string') {
      return res.status(400).json({ error: 'Invalid input. Please provide a "data" field with a string value.' });
    }

    // Convert string to array of characters
    const charactersArray = data.split('');

    // Sort the array alphabetically
    const sortedArray = charactersArray.sort();

    // Return the sorted array as a word
    return res.status(200).json({
      word: sortedArray
    });

  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}