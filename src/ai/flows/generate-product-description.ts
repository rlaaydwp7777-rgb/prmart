'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating product descriptions based on a product title.
 *
 * @function generateProductDescription - The main function to generate a product description.
 * @typedef {GenerateProductDescriptionInput} GenerateProductDescriptionInput - Input type for the generateProductDescription function.
 * @typedef {GenerateProductDescriptionOutput} GenerateProductDescriptionOutput - Output type for the generateProductDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductDescriptionInputSchema = z.object({
  productTitle: z.string().describe('The title of the product.'),
});

export type GenerateProductDescriptionInput = z.infer<typeof GenerateProductDescriptionInputSchema>;

const GenerateProductDescriptionOutputSchema = z.object({
  productDescription: z.string().describe('The generated product description.'),
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
  prompt: `You are an expert copywriter specializing in creating compelling product descriptions.

  Based on the product title provided, generate a detailed and engaging product description that highlights the key features and benefits.
  The product description should be approximately 150-200 words.

  Product Title: {{{productTitle}}}`,
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
