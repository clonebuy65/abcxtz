module.exports.config = {
  name: "ngực",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "JRT",
  description: "Random ảnh ngực",
  commandCategory: "Random-img",
  usages: "ngực",
  cooldowns: 5,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};

const request = require('request');
const fs = require("fs");

module.exports.run = async ({ api, event }) => {
  const axios = require('axios');
  const threadID = event.threadID;

  const imageUrls = await Promise.all(Array.from({ length: 6 }, async () => {
    const res = await axios.get(`${global.configApi.domain}/nsfw/du?apikey=${global.configApi.keyApi}`);
    return res.data.data;
    
  }));

  const attachments = await Promise.all(imageUrls.map(async (url) => {
    return (await axios({
      url,
      method: "GET",
      responseType: "stream"
    })).data
  }));

  const res = await axios.get(`${global.configApi.domain}/saying/hearing?apikey=${global.configApi.keyApi}`);
  var thinh = res.data.data;
  api.sendMessage({
    body: `🌸 ===『 𝗜𝗠𝗔𝗚𝗘 𝗦𝗨𝗖𝗖𝗘𝗦𝗦 』===🌸
━━━━━━━━━━━━━━━━━━━━
[🎊] ➜ 𝗧𝗵𝗶́𝗻𝗵 : ${thinh}
[🖤] ➜ 𝗔̉𝗻𝗵 ${this.config.name} 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 𝗯𝗲̂𝗻 𝗱𝘂̛𝗼̛́𝗶
━━━━━━━━━━━━━━━━━━━━
⚠️ 𝗔̉𝗻𝗵 𝘀𝗲̃ 𝗿𝗮 𝗻𝗴𝗮̂̃𝘂 𝗻𝗵𝗶𝗲̂𝗻 𝘁𝘂̛̀ 𝟭 => 𝟲 𝗮̉𝗻𝗵`,
    attachment: attachments
  }, threadID);
};
