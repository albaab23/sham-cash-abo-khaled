const supabase_url = '  https://tirzgdurubwiyankpvyi.supabase.co/'
const supabase_key = ' eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpcnpnZHVydWJ3aXlhbmtwdnlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkzNDI3MDgsImV4cCI6MjEwNDkxODcwOH0.KMW5EtFYmKAI-kKTqcVEKKn3GyB5DBsRkuvBGg5xdjQ'
const _supabase = supabase.createClient(supabase_url, supabase_key)
async function login() {
    const email = document.getElementById('username').value
    const password = document.getElementById('password').value
    if (!email || !password) {
        console.log("يرجى ادخال كلمة المرور والبريد الالكرتوني")
        return
    }
    const {data, error} = await _supabase.auth.signInWithPassword({
email: email,
password: password
    })
    if (error) {
        alert('خطا في تسجيل الدخول')
    }else {
        alert('تم تسجيل الدخول بنجاح')
        window.location.href = 'admin.html'
    }
}