const supabase_url = '  https://tirzgdurubwiyankpvyi.supabase.co/'
const supabase_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpcnpnZHVydWJ3aXlhbmtwdnlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkzNDI3MDgsImV4cCI6MjEwNDkxODcwOH0.KMW5EtFYmKAI-kKTqcVEKKn3GyB5DBsRkuvBGg5xdjQ'
const _supabase = supabase.createClient(supabase_url, supabase_key)
async function chargebutton(btn) {
    let game_id = document.getElementById('game-id').value
    let sham_number = document.getElementById('sham-number').value
    if (!game_id || !sham_number) {
        alert('يرجى ملئ الحقل')
        return
    }
    let card = btn.closest('.img')
    let cardquantity = card.querySelector('p').innerText
    let cardprice = card.querySelector('.price h3').innerText
    let secretcode = crypto.randomUUID()
    let newrequest = {
        sham: sham_number,
        number: game_id,
        select: cardquantity,
        price: cardprice,
        secret_code: secretcode,
        status: "قيد الانتظار",
        note: '',
        service_type: 'العاب'
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

