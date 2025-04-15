import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// ✅ Supabase credentials
const supabase = createClient(
  'https://esbgozuigjdavcxiaxon.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzYmdvenVpZ2pkYXZjeGlheG9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMjU4NzUsImV4cCI6MjA1OTgwMTg3NX0.OiOH_0ZcTUPu6oMGILsq5oqm1FdCDBvzcHozs-4DNY0'
);

function App() {
  const [number, setNumber] = useState('');
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    setStatus('');
    setNotes('');
    setError('');
    setLoading(true);

    const { data, error } = await supabase
      .from('civil_status')
      .select('status, notes')
      .eq('number', number.trim())
      .single();

    setLoading(false);

    if (error || !data) {
      setError('❌ لم يتم العثور على الطلب. رجاء التأكد من الرقم المدخل');
    } else {
      setStatus(data.status);
      setNotes(data.notes);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-3xl w-full text-center">
        <h1 className="text-[36px] font-bold text-blue-700 mb-10 leading-loose">
          الاستعلام عن طلب معاملة قنصلية (قيد فردى - قيد عائلى - قيد زواج - قيد طلاق - شهادة - الجنسية - الإذن بالتجنس مع الاحتفاظ بالجنسية المصرية - الإذن بالتجنس مع عدم الاحتفاظ بالجنسية المصرية)
        </h1>

        <input
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="أدخل رقم الطلب"
          className="text-center text-[32px] p-6 w-full border border-gray-300 rounded-xl mb-6 focus:outline-none focus:ring-4 focus:ring-blue-500"
        />

        <button
          onClick={handleCheck}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white text-[32px] font-bold py-5 px-10 rounded-xl transition duration-300 mb-8 w-full"
        >
          {loading ? 'جارٍ التحميل...' : 'تحقق من الحالة'}
        </button>

        <div className="space-y-6 mt-4 text-right" dir="rtl">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 p-6 rounded-xl text-[32px] font-bold">
              {error}
            </div>
          )}

          {status && (
            <div className="bg-green-100 border border-green-400 text-green-800 p-6 rounded-xl text-[32px] leading-relaxed">
              <strong>الحالة:</strong> {status}
            </div>
          )}

          {notes && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 p-6 rounded-xl text-[32px] leading-relaxed">
              <strong>ملاحظات:</strong> {notes}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
