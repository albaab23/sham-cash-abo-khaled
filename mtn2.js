const supabase_url = '  https://tirzgdurubwiyankpvyi.supabase.co/'
const supabase_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpcnpnZHVydWJ3aXlhbmtwdnlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkzNDI3MDgsImV4cCI6MjEwNDkxODcwOH0.KMW5EtFYmKAI-kKTqcVEKKn3GyB5DBsRkuvBGg5xdjQ'
const _supabase = supabase.createClient(supabase_url, supabase_key)
async function addbutton() {
    let price = document.getElementById('price').value
    let discount = document.getElementById('discount').value
    let number = document.getElementById('number').value
    let select = document.getElementById('selection').value
    let sham = document.getElementById('sham').value
if (!price || !number || !select || !sham) {
    alert('يجب أن يكون لديك قيمة لكل الحقول')
    return
}
let secretcode = crypto.randomUUID()
let newrequest = {
    price: price,
    discount: discount,
    number: number,
    select: select,
    sham: sham,
    secret_code: secretcode,
    note: '',
    status: "قيد الانتظار",
service_type: 'MTN'

}
const { data, error } = await _supabase.from('requests').insert([newrequest]).select()
if (error) {
    alert('حدث خطأ ما')
    return
}
let saved = JSON.parse(localStorage.getItem('myrequests_ids')) || []
saved.push({id: data[0].id, secret_code: secretcode })
localStorage.setItem('myrequests_ids', JSON.stringify(saved))
window.location.href = 'myrequests.html'
}
price.addEventListener('input', function() {
let amount = parseFloat(price.value)
if(!isNaN(amount)) {
    discount.value = Math.floor(amount * 1.2)
}else {
    discount.value = ''
}
})
