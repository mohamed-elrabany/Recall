import { supabase } from './lib/supabaseClient';
import './App.css'

function App() {
  return (
    <main className="font-cairo">
      <section className="bg-primary-lighter p-6">
        <h1 className="text-title text-3xl font-bold">
          Recall
        </h1>

        <p className="text-title">
          Your personal knowledge base
        </p>

        <button className="mt-4 rounded-lg bg-primary px-5 py-3 text-white">
          Get Started
        </button>
      </section>
    </main>
  );
}

export default App
