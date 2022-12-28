import Pusher from "pusher-js";
import TokenService from "./token.service";

Pusher.logToConsole = true;
const token = TokenService.getLocalAccessToken();
const pusher = new Pusher("d44e3d910d38a928e0be", {
  cluster: "eu",
  channelAuthorization: {
    endpoint: "https://frontend-test-api.aircall.io/pusher/auth",
    headers: {
      Authorization: "Bearer " + token,
    },
  },
});

console.log("pusher" + pusher);
const channel = pusher.subscribe("private-aircall");


export { channel };
