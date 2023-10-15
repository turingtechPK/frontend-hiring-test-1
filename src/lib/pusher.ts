import Pusher from 'pusher-js'

export const getPusher = () => {
  const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER as string,
    channelAuthorization: {
      endpoint: process.env.NEXT_PUBLIC_PUSHER_URL as string,
      transport: 'ajax',
    },
  })
  return pusher
}
