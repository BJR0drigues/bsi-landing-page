// Configuração do cliente Supabase
// URL e chave anônima fornecidas anteriormente
const SUPABASE_URL = 'https://pbiklesmxsmihaoeprjs.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBiaWtsZXNteHNtaWhhb2VwcmpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwNjg3MDIsImV4cCI6MjA3NjY0NDcwMn0.K59yPJRFIHJ1UatzKra_c98wVClrL2r0hN33Pf3LvVU';

// Inicializar o cliente Supabase
if (typeof supabase === 'undefined') {
  console.error('Supabase não carregado! Verifique se o script CDN está incluído.');
} else {
  window.supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log('Cliente Supabase inicializado');
}