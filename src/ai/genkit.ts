import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import { gemini2Flash } from '@genkit-ai/googleai/models';

export const ai = genkit({
  plugins: [googleAI()],
  model: gemini2Flash,
});
