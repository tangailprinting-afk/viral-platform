const SUPABASE_URL =
  "https://thqfdwxfcmryrzrvhzni.supabase.co";

const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRocWZkd3hmY21yeXJ6cnZoem5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2MDMwODYsImV4cCI6MjA5NTE3OTA4Nn0.vi8o4xmRV2J-VKwCFPvL6BGQAYuosXAST3oZ_SHyoGM";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

console.log("Supabase Connected");