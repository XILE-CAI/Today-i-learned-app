
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vrlbimoimurwhhesbaer.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZybGJpbW9pbXVyd2hoZXNiYWVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg1ODU3ODAsImV4cCI6MTk5NDE2MTc4MH0.rdHu-DKZe6U530U8WyyeNvkJ2QNSbfWEqOu3_VxHosg'
const supabase = createClient(supabaseUrl, supabaseKey) 

export default supabase