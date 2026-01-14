import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "url";
const supabaseKey = "key";

export const supabase = createClient(supabaseUrl, supabaseKey);
