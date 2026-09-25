const supabase_url =  '  https://tirzgdurubwiyankpvyi.supabase.co/'
const supabase_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpcnpnZHVydWJ3aXlhbmtwdnlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkzNDI3MDgsImV4cCI6MjEwNDkxODcwOH0.KMW5EtFYmKAI-kKTqcVEKKn3GyB5DBsRkuvBGg5xdjQ'
const _supabase = supabase.createClient(supabase_url, supabase_key)
async function addbutton() {
    let number = document.getElementById('number').value
    let sham = document.getElementById('sham').value
    let select = document.getElementById('company').value
    let speed = document.getElementById('speed').value
    if ( !number  || !select || !speed || !sham) {
        alert('يرجى ملئ جميع الحقول')
        return
    }
    let secretcode = crypto.randomUUID()
    let newrequest = {
        sham: sham,
        number: number,
        select: select,
        speed: speed,
        secret_code: secretcode,
        status: "قيد الانتظار",
        note: '',
        service_type: 'فواتير' 
    }
    const {data, error} = await _supabase.from('requests').insert([newrequest]).select()
    if (error) {
        alert('حدث خطا اثناء ارسال الطلب')
        return
    }

let saved = JSON.parse(localStorage.getItem('myrequests_ids')) || []
saved.push({id: data[0].id, secret_code: secretcode })
localStorage.setItem('myrequests_ids', JSON.stringify(saved))
window.location.href = 'myrequests.html'
}