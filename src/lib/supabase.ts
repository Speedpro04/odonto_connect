import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Cliente público (frontend)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Cliente privilegiado (API Routes, webhooks)
export function getServiceSupabase() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY não está definido.");
  }
  return createClient(supabaseUrl, serviceRoleKey);
}
