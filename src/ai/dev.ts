'use server';

/**
 * @fileOverview A development file for testing and running Genkit flows.
 * This file is not intended for production use.
 */

import { diagnosePlant } from '@/ai/flows/diagnose-plant-flow';
import { assessContentQuality } from '@/ai/flows/ai-content-quality-control';
import { generateProductDescription } from '@/ai/flows/generate-product-description';

// You can add test calls to your flows here.
// For example:
/*
diagnosePlant({
    description: 'My plant is sad',
    photoDataUri: 'data:image/png;base64,...'
}).then(console.log);
*/
