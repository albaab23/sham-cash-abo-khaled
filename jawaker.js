const supabase_url = 'https://tirzgdurubwiyankpvyi.supabase.co/'
const supabase_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpcnpnZHVydWJ3aXlhbmtwdnlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkzNDI3MDgsImV4cCI6MjEwNDkxODcwOH0.KMW5EtFYmKAI-kKTqcVEKKn3GyB5DBsRkuvBGg5xdjQ'
const _supabase = supabase.createClient(supabase_url, supabase_key)

async function addbutton() {
    let price = document.getElementById('price').value
    let number = document.getElementById('number').value
    let discount = document.getElementById('discount').value
    let select = document.getElementById('select')
    if (!price || !number  || !select) {
        alert('يرجى ملئ جميع الحقول')
        return
    }else if(price < 10000){
        alert('يجب وضع 10000 على الاقل')
        return
    }else if(price){
       let amount =  price * 17
       discount.value = amount
    }
    
    let secretcode = crypto.randomUUID()
    let newrequest = {
        price: price ,
        number: number,
        discount: discount,
        select: select,
        secret_code: secretcode,
        status: "قيد الانتظار",
        note: '',
        service_type: 'جواكر' 
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