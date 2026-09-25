const supabase_url = '  https://tirzgdurubwiyankpvyi.supabase.co/'
const supabase_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpcnpnZHVydWJ3aXlhbmtwdnlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkzNDI3MDgsImV4cCI6MjEwNDkxODcwOH0.KMW5EtFYmKAI-kKTqcVEKKn3GyB5DBsRkuvBGg5xdjQ'
const _supabase = supabase.createClient(supabase_url, supabase_key)
async function checkauth() {
    const {data: {session} } = await _supabase.auth.getSession()
    if (!session) {
        window.location.href = 'login.html'
        return false
    }

    return true
}
checkauth().then((isLoggedIn) => {
    if (isLoggedIn) {
        loadrequests()
    }
})
async function loadrequests() {
    const container = document.getElementById('requestslist')
    const { data: requests, error } = await _supabase.from('requests').select('*').eq('status', 'قيد الانتظار').order('created_at', {ascending: false})
    if (error) {
        container.innerHTML = '<p> لا توجد طلبات</p>'
        return
    }
    if (!requests || requests.length === 0) {
        conatiner.innerHTML = '<p> لا توجد طلبات</p>'
        return
    }
    container.innerHTML = ''
    requests.forEach(function (req) {
      
             if(req.service_type === 'فواتير') {
            container.innerHTML  += `
             <div class="container">
            <h1>نوع الخدمة: ${req.service_type}</h1>
            <P>الحالة:${req.status}</p>
              <p>الشركة ${req.select}</p>
             <p>السرعة ${req.sham}</p>
              <p>رقم الارضي: ${req.number}</p>
              <input type="text" id="note">
                                                    <div class="buttons">
    <button onclick="updateStatus('${req.id}', 'مقبول ✅')" style="background-color: #2ecc71; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer;">قبول</button> 
    <button onclick="updateStatus('${req.id}', 'مرفوض ❌')" style="background-color: #e74c3c; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer;">رفض</button>
             </div>
            </div>
          
            `
        }else if(req.service_type === 'سيرياتيل'){
        
           container.innerHTML +=` <div class= "container">
            <h1>نوع الخدمة: ${req.service_type}</h1>
              <h1>المبلغ المراد تحويله:${req.price}</h1>
          <p>الميلغ بعد العمولة:${req.discount}</p>
          <p>رقم عملية الشام كاش ${req.number}</p>
           <p>جهة الدفع :${req.select}</p>
         <P>الحالة:${req.status}</p>
         <input type="text" id="note">
                                                   <div class="buttons">
    <button onclick="updateStatus('${req.id}', 'مقبول ✅')" style="background-color: #2ecc71; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer;">قبول</button> 
    <button onclick="updateStatus('${req.id}', 'مرفوض ❌')" style="background-color: #e74c3c; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer;">رفض</button>
             </div>
         </div>
         `
        
        
        
        }else if(req.service_type === 'MTN'){
        container.innerHTML +=` <div class= "container">
            <h1>نوع الخدمة: ${req.service_type}</h1>
              <h1>المبلغ المراد تحويله:${req.price}</h1>
          <p>الميلغ بعد العمولة:${req.discount}</p>
          <p>رقم عملية الشام كاش: ${req.number}</p>
           <p>جهة الدفع: ${req.select}</p>
         <P>الحالة:${req.status}</p>
         <input type="text" id="note">
                                                   <div class="buttons">
    <button onclick="updateStatus('${req.id}', 'مقبول ✅')" style="background-color: #2ecc71; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer;">قبول</button> 
    <button onclick="updateStatus('${req.id}', 'مرفوض ❌')" style="background-color: #e74c3c; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer;">رفض</button>
             </div>
         </div>
         `
        
            }else if (req.service_type === 'جواكر') {
                container.innerHTML +=` <div class= "container">
                <h1>نوع الخدمة: ${req.service_type}</h1>
                  <h1>المبلغ المراد تحويله:${req.price}</h1>
              <p>الميلغ بعد العمولة:${req.discount}</p>
                <p> معرف الاستخدام: ${req.number}</p>
                <p>الكمية: ${req.sham}</p>
             <P>الحالة:${req.status}</p>
             <input type="text" id="note">
                                                       <div class="buttons">
    <button onclick="updateStatus('${req.id}', 'مقبول ✅')" style="background-color: #2ecc71; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer;">قبول</button> 
    <button onclick="updateStatus('${req.id}', 'مرفوض ❌')" style="background-color: #e74c3c; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer;">رفض</button>
             </div>
             </div>
             `
            }else if(req.service_type === 'العاب') {
               container.innerHTML += `
                <div class= "container">
                <h1>نوع الخدمة: ${req.service_type}</h1>
                <h1>السعر:${req.price}</h1>
                <p> معرف الاستخدام: ${req.number}</p>
                <p>الكمية: ${req.select}</p>
             <P>الحالة:${req.status}</p>
             <input type="text" id="note">
                                           <div class="buttons">
    <button onclick="updateStatus('${req.id}', 'مقبول ✅')" style="background-color: #2ecc71; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer;">قبول</button> 
    <button onclick="updateStatus('${req.id}', 'مرفوض ❌')" style="background-color: #e74c3c; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer;">رفض</button>
             </div>
             </div>
               `
            }
    })
}
async function updateStatus(id, newstatus) {
    const noteinput = document.getElementById('note')
    const notevalue = noteinput ? noteinput.value : ''
    const { error } = await _supabase.from('requests').update({ status: newstatus, note: notevalue }).eq('id', id)
    if (error) {
        alert('حدث خطا اثناء التحديث')
    } 
}
_supabase.channel('realtime_requests').on('postgres_changes', {event: '*', schema:'public', table:'requests'}, (payload) => {
    loadrequests()
})
.subscribe()
loadrequests()
