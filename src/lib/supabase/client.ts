import { environment } from "@/configs/environment";
import { createBrowserClient } from "@supabase/ssr";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export function createClient() {
    const {SUPABASE_URL, SUPABASE_ANON_KEY} = environment;
    return createBrowserClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);
}

