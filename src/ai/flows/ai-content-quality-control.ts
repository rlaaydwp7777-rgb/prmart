'use server';
/**
 * @fileOverview An AI agent to assess the quality of content submitted to prmart.
 *
 * - assessContentQuality - A function that handles the content quality assessment process.
 * - AssessContentQualityInput - The input type for the assessContentQuality function.
 * - AssessContentQualityOutput - The return type for the assessContentQuality function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AssessContentQualityInputSchema = z.object({
  title: z.string().describe('The title of the content being submitted.'),
  description: z.string().describe('A detailed description of the content.'),
  category: z.string().describe('The category the content belongs to.'),
  tags: z.array(z.string()).describe('Relevant tags associated with the content.'),
});
export type AssessContentQualityInput = z.infer<typeof AssessContentQualityInputSchema>;

const AssessContentQualityOutputSchema = z.object({
  qualityScore: z
    .number()
    .describe(
      'A score between 0 and 1 representing the overall quality of the content, with 1 being the highest quality.'
    ),
  isApproved: z
    .boolean()
    .describe(
      'Whether the content is approved based on the quality score and a predefined threshold.'
    ),
  reason: z
    .string()
    .describe(
      'A brief explanation of why the content was approved or rejected, based on its quality.'
    ),
});
export type AssessContentQualityOutput = z.infer<typeof AssessContentQualityOutputSchema>;

export async function assessContentQuality(input: AssessContentQualityInput): Promise<AssessContentQualityOutput> {
  return assessContentQualityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'assessContentQualityPrompt',
  input: {schema: AssessContentQualityInputSchema},
  output: {schema: AssessContentQualityOutputSchema},
  prompt: `You are an AI content quality control expert for prmart, a digital marketplace for AI prompts, templates, and know-how.

Your task is to assess the quality of user-submitted content based on its title, description, category, and tags. The content should be clear, appealing, and well-structured for sale.

- **Quality Score**: Provide a quality score between 0 and 1.
- **Approval Decision**: The content is approved if the quality score is 0.7 or higher.
- **Reasoning**: Provide a concise, constructive reason for your decision. If it's rejected, suggest specific improvements (e.g., "The description is too short, please add more detail about key features."). If approved, briefly state its strengths (e.g., "Clear title and detailed, compelling description.").

Here are the details of the content to review:
- Title: {{{title}}}
- Description: {{{description}}}
- Category: {{{category}}}
- Tags: {{#each tags}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Respond in the required JSON format.`,
});

const assessContentQualityFlow = ai.defineFlow(
  {
    name: 'assessContentQualityFlow',
    inputSchema: AssessContentQualityInputSchema,
    outputSchema: AssessContentQualityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('AI failed to generate a quality assessment.');
    }
    // Ensure the isApproved logic is consistent with the threshold.
    output.isApproved = output.qualityScore >= 0.7;
    return output;
  }
);
