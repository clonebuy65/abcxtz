const fs = require("fs")
const axios = require("axios")
module.exports.config = {
  name: "bopmong",
  version: "1.0.0",
  hasPermssion: 3,
  credits: "Milo",
  description: "Bóp mông người bạn tag",
  commandCategory: "Hành động",
  usages: "[tag]",
  cooldowns: 5,
};

module.exports.run = async({ api, event, Threads, global }) => {
  var link = [    
"https://i.postimg.cc/W43LzFn1/dkUlEBe.gif",
"https://i.postimg.cc/mr5xHLXN/squeeze-dat-ass-001.gif",
"https://i.postimg.cc/V6rx9x2y/tumblr-0a7f78ae0514fd8654409bd7e2410068-a200b089-500.gif",
"https://i.postimg.cc/rs573S8Q/tumblr-os64hm-Sc-AN1smwom8o10-1280.gif",
"https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWxqdDVvcDBha2tuZGFjbjFxdndjc3l4cDE2aGF1emJsOXdqaWJxbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/DZhaXUfqDJPPiiHYUW/giphy.gif",
"https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExaHp4cGNqcG1hazZrMHU5c3lpcmQxZWtodzZkMWdnNG56ZGxuaWN2bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohjUTzD4UI1gRFPkk/giphy.gif",
"https://media2.giphy.com/media/n9khuKY4oBpnO/giphy.gif?cid=ecf05e47ovdllef5x5rxbiong1zht21ummkrp0r4q200mzjx&ep=v1_gifs_related&rid=giphy.gif",
   ];
   var mention = Object.keys(event.mentions);
     let tag = event.mentions[mention].replace("@", "");
    if (!mention) return api.sendMessage("Vui lòng tag 1 người", threadID, messageID);
   var callback = () => api.sendMessage({body:`${tag}` + ` 𝗔𝗻𝗵 𝗕𝗼́𝗽 𝗠𝗼̂𝗻𝗴 𝗦𝘂̛𝗼̛́𝗻𝗴 𝗖𝗵𝘂̛𝗮 𝗘𝗺 🍑`,mentions: [{tag: tag,id: Object.keys(event.mentions)[0]}],attachment: fs.createReadStream(__dirname + "/cache/bopmong.gif")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/bopmong.gif"));  
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/bopmong.gif")).on("close",() => callback());
   }
