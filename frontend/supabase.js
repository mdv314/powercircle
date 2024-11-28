import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://zkdjjtqxkumfajpjqoxo.supabase.co/";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InprZGpqdHF4a3VtZmFqcGpxb3hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3NjcwNjAsImV4cCI6MjA0ODM0MzA2MH0.6XvZ8-JM4_L19e7an9SElWhIXwEVGaeSjyi5UHWtvxk";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);