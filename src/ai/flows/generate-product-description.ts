'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating product descriptions, tags, categories, and price based on a product title.
 *
 * @function generateProductDescription - The main function to generate a product description.
 * @typedef {GenerateProductDescriptionInput} GenerateProductDescriptionInput - Input type for the generateProductDescription function.
 * @typedef {GenerateProductDescriptionOutput} GenerateProductDescriptionOutput - Output type for the generateProductDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { CATEGORIES } from '@/lib/constants';

const GenerateProductDescriptionInputSchema = z.object({
  productTitle: z.string().describe('The title of the product.'),
});

export type GenerateProductDescriptionInput = z.infer<typeof GenerateProductDescriptionInputSchema>;

const GenerateProductDescriptionOutputSchema = z.object({
  productDescription: z.string().describe('The generated product description.'),
  category: z.string().describe(`The most relevant category for the product. Must be one of the following: ${CATEGORIES.map(c => c.name).join(', ')}`),
  tags: z.array(z.string()).describe('A list of relevant tags for the product.'),
  price: z.number().describe('A suggested price for the product in KRW.'),
});

export type GenerateProductDescriptionOutput = z.infer<typeof GenerateProductDescriptionOutputSchema>;

export async function generateProductDescription(
  input: GenerateProductDescriptionInput
): Promise<GenerateProductDescriptionOutput> {
  return generateProductDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProductDescriptionPrompt',
  input: {schema: GenerateProductDescriptionInputSchema},
  output: {schema: GenerateProductDescriptionOutputSchema},
  prompt: `You are an expert copywriter and marketer specializing in creating compelling product listings for a digital marketplace called prmart.

  Based on the product title provided, you must generate a complete product listing.

  1.  **Product Description**: Write a detailed and engaging product description (approximately 150-200 words) that highlights key features and benefits.
  2.  **Category**: Choose the most appropriate category from the provided list.
  3.  **Tags**: Provide a list of 3-5 relevant and specific tags that will help users discover the product.
  4.  **Price**: Suggest a reasonable price in Korean Won (KRW), considering the value of the product.

  Here is the list of available categories:
  ${CATEGORIES.map(c => `- ${c.name}`).join('\n')}

  Product Title: {{{productTitle}}}
  `,
});

const generateProductDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProductDescriptionFlow',
    inputSchema: GenerateProductDescriptionInputSchema,
    outputSchema: GenerateProductDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
