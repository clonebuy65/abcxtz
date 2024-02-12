module.exports.config = {
	name: "setname",
	version: "1.1.0",
	hasPermssion: 0,
	credits: "Milo",
	description: "Đổi biệt danh của bạn hoặc người bạn tag, có thể phản hồi tin nhắn người khác!",
	commandCategory: "Nhóm",
	usages: "[trống/tag/reply] + [name]",
	cooldowns: 5
}

module.exports.run = async ({ api, event, args, Users }) => {
  let { threadID, messageReply, senderID, mentions, type } = event;
  const delayUnsend = 5;// tính theo giây
	if (type == "message_reply") {
    let name2 = await Users.getNameUser(messageReply.senderID)
    const name = args.join(" ")
    return api.changeNickname(`${name}`, threadID, messageReply.senderID),
      api.sendMessage({
    body: `[⚜️]=== 『 UPDATE SETNAME 』 ===[⚜️]\n━━━━━━━━━━━━━━━━\n[⚜️]➜ Đã đổi tên của: ${name2} thành ${name || "tên gốc"}`, attachment: (await axios.get((await axios.get(`https://docs-api.jrtxtracy.repl.co/images/wallpaper?apikey=JRTvip_8675561608`)).data.data, {
                    responseType: 'stream'
                })).data
}, threadID, (err, info) =>
	setTimeout(() => {api.unsendMessage(info.messageID) }, delayUnsend * 1000))
  }
  else {
	const mention = Object.keys(mentions)[0];
	const name2 = await Users.getNameUser(mention || senderID)
    if (args.join().indexOf('@') !== -1 ) {
      const name = args.join(' ')
      return api.changeNickname(`${name.replace(mentions[mention],"")}`, threadID, mention),
        api.sendMessage({body: `[⚜️]=== 『 UPDATE SETNAME 』 ===[⚜️]\n━━━━━━━━━━━━━━━━\n[⚜️]➜ Đã đổi tên của: ${name2} thành ${name.replace(mentions[mention],"") || "tên gốc"}`, attachment: (await axios.get((await axios.get(`https://docs-api.jrtxtracy.repl.co/images/wallpaper?apikey=JRTvip_8675561608`)).data.data, {
                    responseType: 'stream'
                })).data
}, threadID, (err, info) =>
          setTimeout(() => {api.unsendMessage(info.messageID) } , delayUnsend * 1000))
      } else {
    const name = args.join(" ")
      return api.changeNickname(`${name}`, threadID, senderID),
        api.sendMessage({body: `[⚜️]=== 『 UPDATE SETNAME 』 ===[⚜️]\n━━━━━━━━━━━━━━━━\n[⚜️]➜ Đã đổi tên của bạn thành: ${name || "tên gốc"}`, attachment: (await axios.get((await axios.get(`https://docs-api.jrtxtracy.repl.co/images/wallpaper?apikey=JRTvip_8675561608`)).data.data, {
                    responseType: 'stream'
                })).data
}, threadID, (err, info) =>
          setTimeout(() => {api.unsendMessage(info.messageID) } , delayUnsend * 1000))
      }
    }
  }
