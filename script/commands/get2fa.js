module.exports.config = {
  name: "get2fa",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Milo",
  description: "lấy mã 2 fa",
  commandCategory: "Công cụ",
  usages: "get2fa + key 2fa",
  cooldowns: 5,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};

module.exports.run = async({api,event,args,client,Users,Threads,__GLOBAL,Currencies}) => {
  const authenticator = require('authenticator');
  var formattedToken = authenticator.generateToken(args.join(""));
   
  var { threadID, messageID } = event;
   return api.sendMessage('[⏳] ➜ Đang lấy mã 2 fa cho bạn...', event.threadID, (err, info) => {
    setTimeout(() => {
  return api.sendMessage(`=== 『 GET 2FA 』 ===\n━━━━━━━━━━━━━━━━\n[⚜️] ➜ Mã 2fa của bạn đây: ${formattedToken}`,threadID,messageID);
   }, 200);
  }, event.messageID);
};