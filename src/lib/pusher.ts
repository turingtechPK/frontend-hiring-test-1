import Pusher from 'pusher-js'

export const getPusher = () => {
  console.log(process.env.NEXT_PUBLIC_PUSHER_KEY)
  const pusher = new Pusher('d44e3d910d38a928e0be' as string, {
    cluster: 'eu' as string,
    channelAuthorization: {
      endpoint: 'https://frontend-test-api.aircall.dev/pusher/auth' as string,
      transport: 'ajax',
    },
  })
  return pusher
}
