import { createClient } from "@supabase/supabase-js";

// Lấy URL và KEY từ file .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Tạo client Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);
