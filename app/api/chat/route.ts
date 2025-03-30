import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const { query, category } = await request.json();

    // Construct a more focused query that includes DraftKings context and category if provided
    const categoryContext = category ? `about DraftKings ${category}` : 'about DraftKings sportsbook or daily fantasy sports platform';
    const enhancedQuery = `${query} (specific to ${categoryContext})`;

    // Call Perplexity API
    const response = await axios.post(
      'https://api.perplexity.ai/chat/completions',
      {
        model: process.env.PERPLEXITY_MODEL || 'sonar-pro',
        messages: [
          {
            role: 'system',
            content: `You are a helpful assistant that provides information about DraftKings products and services${category ? `, specifically focusing on ${category}` : ''}. Focus on being concise but thorough, and respond in a friendly, helpful manner. If asked questions unrelated to DraftKings, politely redirect to DraftKings-related topics. If the answer starts with a direct yes/no statement, make sure it follows the format "Yes, ..." or "No, ..." for proper formatting. Always include specific DraftKings help center information when possible.`
          },
          {
            role: 'user',
            content: enhancedQuery
          }
        ],
        max_tokens: 800,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`
        }
      }
    );

    // Extract the assistant's response
    const assistantResponse = response.data.choices[0]?.message?.content || 
      "I couldn't find specific information about that. Please try another question related to DraftKings.";

    return NextResponse.json({ response: assistantResponse });
  } catch (error) {
    console.error('Error calling Perplexity API:', error);
    return NextResponse.json(
      { error: 'Failed to get response' },
      { status: 500 }
    );
  }
} 