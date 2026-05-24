import { CONFIG }
from "../config.js";

export const supabaseClient =

  supabase.createClient(

    CONFIG.SUPABASE_URL,

    CONFIG.SUPABASE_KEY

  );

console.log(
  "Supabase Module Ready"
);