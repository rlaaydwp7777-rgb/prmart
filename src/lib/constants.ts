
import type { Category } from "./types";
import { CATEGORY_NAMES } from "./string-constants";
import { slugify } from "./utils";

// This file should only contain pure constants that are not fetched from a database.
// All dynamic data like products and categories are now fetched from Firestore.
