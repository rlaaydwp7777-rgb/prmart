

import type { Category } from "./types";
import { Rocket, Code, LineChart, Plane, Users, Briefcase, Brush, BookOpen, Car, Home } from "lucide-react";
import { CATEGORY_NAMES } from "./string-constants";
import { slugify } from "./utils";

// This will be replaced by data from Firestore
export const CATEGORY_ICONS = {
  [CATEGORY_NAMES.AI_PRODUCTION]: Rocket,
  [CATEGORY_NAMES.DEVELOPMENT_AUTOMATION]: Code,
  [CATEGORY_NAMES.INVESTMENT_FINTECH]: LineChart,
  [CATEGORY_NAMES.TRAVEL_LIFE]: Plane,
  [CATEGORY_NAMES.LIVING_PARENTING_TIPS]: Users,
  [CATEGORY_NAMES.BUSINESS_MARKETING]: Briefcase,
  [CATEGORY_NAMES.CREATION_DESIGN]: Brush,
  [CATEGORY_NAMES.LEARNING_SELF_DEVELOPMENT]: BookOpen,
  [CATEGORY_NAMES.MOBILITY_AUTOMOBILE]: Car,
  [CATEGORY_NAMES.LIFE_INFRA]: Home,
};
