import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import webpush from 'https://esm.sh/web-push@3.6.7'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const vapidPublicKey = Deno.env.get('VAPID_PUBLIC_KEY')!
const vapidPrivateKey = Deno.env.get('VAPID_PRIVATE_KEY')!

webpush.setVapidDetails('mailto:example@example.com', vapidPublicKey, vapidPrivateKey)
Deno.serve(async (req) => {
  const supabase = createClient(supabaseUrl, supabaseKey)

  const { data: subscriptions, error } = await supabase
    .from('admin_subscriptions')
    .select('*')

  if (error || !subscriptions || subscriptions.length === 0) {
    return new Response(JSON.stringify({ message: 'no subscriptions' }), { status: 200 })
  }

  const payload = JSON.stringify({
    title: 'طلب جديد',
    body: 'وصل طلب جديد للوحة التحكم'
  })

  for (const sub of subscriptions) {
    const pushSubscription = {
      endpoint: sub.endpoint,
      keys: {
        p256dh: sub.p256dh,
        auth: sub.auth
      }
    }
    try {
      await webpush.sendNotification(pushSubscription, payload)
    } catch (err) {
      console.log('failed to send to one subscription', err)
    }
  }

  return new Response(JSON.stringify({ message: 'sent' }), { status: 200 })
})
