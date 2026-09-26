const supabase_url = '  https://tirzgdurubwiyankpvyi.supabase.co/'
const supabase_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpcnpnZHVydWJ3aXlhbmtwdnlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkzNDI3MDgsImV4cCI6MjEwNDkxODcwOH0.KMW5EtFYmKAI-kKTqcVEKKn3GyB5DBsRkuvBGg5xdjQ'
const _supabase = supabase.createClient(supabase_url, supabase_key)
async function loadrequests() {
  const container = document.getElementById('requestslist')
  const { data: requests, error } = await _supabase.from('requests').select('*').eq('status', 'قيد الانتظار').order('created_at', {ascending: false})
  if (error) {
      container.innerHTML = '<p> لا توجد طلبات</p>'
      return
  }
  if (!requests || requests.length === 0) {
      container.innerHTML = '<p> لا توجد طلبات</p>'
      return
  }
  container.innerHTML = ''
  requests.forEach(function (req) {
    
           if(req.service_type === 'فواتير') {
          container.innerHTML  += `
           <div class="container">
  <h1>نوع الخدمة: ${req.service_type}</h1>
  <P>الحالة:${req.status}</p>
  <p>السرعة:${req.discount}</p>
    <p>الشركة :${req.select}</p>
   <p>رقم الاتصال:${req.sham}</p>
    <p>رقم الشام كاش:${req.number}</p>
          </div>
        
          `
      }else if(req.service_type === 'سيرياتيل'){
      
         container.innerHTML +=` <div class= "container">
          <h1>نوع الخدمة: ${req.service_type}</h1>
            <h1>المبلغ المراد تحويله:${req.price}</h1>
        <p>الميلغ بعد العمولة:${req.discount}</p>
        <p>رقم عملية الشام كاش ${req.number}</p>
         <p>رقم الاتصال:${req.sham}</p>
         <p>جهة الدفع :${req.select}</p>
       <P>الحالة:${req.status}</p>
       </div>
       `
      
      
      
      }else if(req.service_type === 'MTN'){
      container.innerHTML +=` <div class= "container">
          <h1>نوع الخدمة: ${req.service_type}</h1>
            <h1>المبلغ المراد تحويله:${req.price}</h1>
        <p>الميلغ بعد العمولة:${req.discount}</p>
        <p>رقم عملية الشام كاش: ${req.number}</p>
         <p>جهة الدفع: ${req.select}</p>
         <p>رقم الاتصال:${req.sham}</p>
       <P>الحالة:${req.status}</p>
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
           </div>
           `
          }else if(req.service_type === 'العاب') {
             container.innerHTML += `
              <div class= "container">
              <h1>نوع الخدمة: ${req.service_type}</h1>
              <h1>السعر:${req.price}</h1>
              <p> معرف الاستخدام: ${req.number}</p>
              <p>رقم عملية الشام كاش:${req.sham}</p>
              <p>الكمية: ${req.select}</p>
           <P>الحالة:${req.status}</p>
           </div>
             `
          }
  })
}
_supabase.channel('realtime_requests').on('postgres_changes', {event: '*', schema:'public', table:'requests'}, (payload) => {
  loadrequests()
})
.subscribe()
loadrequests()
