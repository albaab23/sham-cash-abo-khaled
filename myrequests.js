const supabase_url = '  https://tirzgdurubwiyankpvyi.supabase.co/'
const supabase_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpcnpnZHVydWJ3aXlhbmtwdnlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkzNDI3MDgsImV4cCI6MjEwNDkxODcwOH0.KMW5EtFYmKAI-kKTqcVEKKn3GyB5DBsRkuvBGg5xdjQ'
const _supabase = supabase.createClient(supabase_url, supabase_key)
async function displayrequests() {
    let saved = JSON.parse(localStorage.getItem('myrequests_ids')) || []
let productcontainer = document.getElementById('product-container')
productcontainer.innerHTML = ''
if (saved.length === 0){
    productcontainer.innerHTML = '<p class = "no-orders">لا توجد طلبات حاليا</p>'
}
let requests = []
for (const item of saved) {

    const {data,  error} = await _supabase.from('requests').select('*').eq('id', item.id).eq('secret_code', item.secret_code).single()
if (!error && data) {
    requests.push(data)
}
}
if (requests.length === 0){
    productcontainer.innerHTML = '<p class = "no-orders">لا توجد طلبات حاليا</p>'
}




requests.forEach(  (req) => {
 if(req.service_type === 'فواتير') {
    productcontainer.innerHTML  += `
     <div class="container">
    <h1>نوع الخدمة: ${req.service_type}</h1>
    <P>الحالة:${req.status}</p>
    <p>السرعة:${req.speed}</p>
      <p>الشركة :${req.select}</p>
     <p>رقم الاتصال:${req.sham}</p>
      <p>رقم الشام كاش:${req.number}</p>
    ${req.note ? `<p>الملاحظة:${req.note}</p>` : ''}
    </div>
  
    `
}else if(req.service_type === 'سيرياتيل'){

   productcontainer.innerHTML +=` <div class= "container">
    <h1>نوع الخدمة: ${req.service_type}</h1>
      <h1>المبلغ المراد تحويله:${req.price}</h1>
  <p>الميلغ بعد العمولة:${req.discount}</p>
  <p>رقم عملية الشام كاش : ${req.number}</p>
  <p>رقم الاتصال:${req.sham}</p>
   <p>جهة الدفع: ${req.select}</p>
 <P>الحالة:${req.status}</p>
   ${req.note ? `<p>الملاحظة:${req.note}</p>` : ''}
 </div>
 `



}else if(req.service_type === 'MTN'){
    productcontainer.innerHTML +=` <div class= "container">
    <h1>نوع الخدمة: ${req.service_type}</h1>
      <h1>المبلغ المراد تحويله:${req.price}</h1>
  <p>الميلغ بعد العمولة:${req.discount}</p>
  <p>رقم عملية الشام كاش ${req.number}</p>
   <p>جهة الدفع: ${req.select}</p>
    <p>رقم الاتصال:${req.sham}</p>
 <P>الحالة:${req.status}</p>
   ${req.note ? `<p>الملاحظة:${req.note}</p>` : ''}
 </div>
 `

    }else if (req.service_type === 'جواكر') {
        productcontainer.innerHTML +=` <div class= "container">
        <h1>نوع الخدمة: ${req.service_type}</h1>
          <h1>المبلغ المراد تحويله:${req.price}</h1>
      <p>الميلغ بعد العمولة:${req.discount}</p>
        <p> معرف الاستخدام: ${req.number}</p>
        <p>الكمية: ${req.sham}</p>
     <P>الحالة:${req.status}</p>
       ${req.note ? `<p>الملاحظة:${req.note}</p>` : ''}
     </div>
     `
    }else if(req.service_type === 'العاب') {
       productcontainer.innerHTML += `
        <div class= "container">
        <h1>نوع الخدمة: ${req.service_type}</h1>
        <h1>السعر:${req.price}</h1>
        <p> معرف الاستخدام: ${req.number}</p>
        <p>رقم عملية الشام كاش:${req.sham}</p>
        <p>الكمية: ${req.select}</p>
     <P>الحالة:${req.status}</p>
       ${req.note ? `<p>الملاحظة:${req.note}</p>` : ''}
     </div>
       
       `
    }
});
}

_supabase.channel('myrequests_realtime').on('postgres_changes', {event: '*', schema: 'public', table: 'requests'}, (payload) => {
    displayrequests()
})
.subscribe()
displayrequests()
