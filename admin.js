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
    const conatiner = document.getElementById('requestslist')
    const { data: requests, error } = await _supabase.from('requests').select('*').eq('status', 'قيد الانتظار').order('created_at', {ascending: false})
    if (error) {
        conatiner.innerHTML = '<p> لا توجد طلبات</p>'
        return
    }
    if (!requests || requests.length === 0) {
        conatiner.innerHTML = '<p> لا توجد طلبات</p>'
        return
    }
    conatiner.innerHTML = ''
    requests.forEach(function (req) {
        conatiner.innerHTML += `
    <div class="request">
     <p>رقم الطلب:${req.id}</p>
    <p>المبلغ:${req.price}</p>
      <p>حساب الشام كاش:${req.sham}</p>
        <p>الرقم المحول منه:${req.number}</p>
          <p>طريقة الدفع:${req.select}</p>
          
             <div class="buttons">
    <button onclick="updateStatus('${req.id}', 'مقبول ✅')" style="background-color: #2ecc71; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer;">قبول</button> 
    <button onclick="updateStatus('${req.id}', 'مرفوض ❌')" style="background-color: #e74c3c; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer;">رفض</button>
             </div>
    </div>
    
    `
    })
}
async function updateStatus(id, newstatus) {
    const { error } = await _supabase.from('requests').update({ status: newstatus }).eq('id', id)
    if (error) {
        alert('حدث خطا اثناء التحديث')
    } 
}
_supabase.channel('realtime_requests').on('postgres_changes', {event: '*', schema:'public', table:'requests'}, (payload) => {
    loadrequests()
})
.subscribe()
loadrequests()
