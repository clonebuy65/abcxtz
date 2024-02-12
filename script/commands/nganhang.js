module.exports.config = {
        name: "nganhang",
        version: "0.0.1",
        hasPermssion: 0,
        credits: "Milo",
        description: "Ngân hàng MB",
        commandCategory: "Tài chính",
        usages: "nganhang",
        cooldowns: 0,
dependencies: {
         "fs-extra": "",
      "request": "",
      "axios": ""
  }, 
envConfig: {
      APIKEY: "chinhdz"
}  
};
module.exports.onLoad = async () => {
	const { existsSync, writeFileSync, mkdirSync } = require("fs-extra")
	const { join } = require("path")
	const axios = require("axios");
	const dir = __dirname + `/banking`;
	if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    const pathData = join(__dirname + '/banking/banking.json');
    if (!existsSync(pathData)) return writeFileSync(pathData, "[]", "utf-8"); 
	return;
}
module.exports.run = async function({ api, event, args, models, Users, Threads, Currencies, permssion }) {
  const { threadID, messageID, senderID } = event;
  const axios = require("axios")
  const { readFileSync, writeFileSync } = require("fs-extra")
  const { join } = require("path")
  const pathData = join(__dirname + '/banking/banking.json');
  const user = require('./banking/banking.json');
  const timeIM = 60*60
  const laisuat = 1
  const moneyInput = parseInt(args[1])
  if(args[0] == '-r' || args[0] == 'register') {
    if (!user.find(i => i.senderID == senderID)) {
      var add = { senderID: senderID,  money: 500000}
      user.push(add);
      writeFileSync(pathData, JSON.stringify(user, null, 2));
      return api.sendMessage(`[ 𝗦𝗨𝗖𝗖𝗘𝗦𝗦 ] ➜ đăng kí thành công!! Bạn được tặng 500000$ vào tài khoản khi đăng ký bank\n➜ gửi ít nhất 5000$ để có lãi`, threadID, messageID)
    }
  else return api.sendMessage(`[ 𝗪𝗔𝗥𝗡𝗜𝗡𝗚 ] ➜ Bạn đã có tài khoản trên hệ thống MB Bank`, threadID, messageID)
  }
  if(args[0] == 'check' || args[0] == 'coins') {
  if (!user.find(i => i.senderID == senderID)) return api.sendMessage('[ 𝗪𝗔𝗥𝗡𝗜𝗡𝗚 ] ➜ Người dùng chưa đăng kí sử dụng banking, banking register để đăng kí', threadID, messageID)
    else { 
      var userData = user.find(i => i.senderID == senderID);
      return api.sendMessage(`[ 𝗦𝗨𝗖𝗖𝗘𝗦𝗦 ] ➜ Số tiền bạn đang gửi MB Bank là: ${userData.money}$\n💰 Lãi: +${laisuat}% trong ${timeIM/60} phút`, threadID, messageID)
    }
  } 
  if(args[0] == 'gửi' || args[0] == 'send') {
  if (!args[1] || isNaN(args[1]) || parseInt(args[1]) < 5000) return api.sendMessage("[ 𝗪𝗔𝗥𝗡𝗜𝗡𝗚 ] ➜ Số tiền cần gửi phải là 1 con số và lớn hơn 5000$", threadID, messageID);
  if (!user.find(i => i.senderID == senderID)) {
    return api.sendMessage('[ 𝗪𝗔𝗥𝗡𝗜𝗡𝗚 ] ➜ Người dùng chưa đăng kí sử dụng banking, banking register để đăng kí 💰', threadID, messageID)
  }
  else { 
      let balance = (await Currencies.getData(senderID)).money;
      if(balance < moneyInput) return api.sendMessage(`[ 𝗪𝗔𝗥𝗡𝗜𝗡𝗚 ] ➜ Số dư không đủ ${moneyInput} để gửi vào MB Bank 💰`, threadID, messageID)
      var userData = user.find(i => i.senderID == senderID);
      var money = userData.money;
      userData.money = parseInt(money) + parseInt(moneyInput)
      writeFileSync(pathData, JSON.stringify(user, null, 2));
      await Currencies.decreaseMoney(senderID, parseInt(moneyInput));
      return api.sendMessage(`[ 𝗦𝗨𝗖𝗖𝗘𝗦𝗦 ] ➜ Bạn đã gửi ${moneyInput}$ vào MB Bank\n[💰]➜ Lãi: +${laisuat}% trong ${timeIM/60} phút`, threadID, messageID)
    }
  }
  if(args[0] == 'rút' || args[0] == 'lấy') { 
    if (!args[1] || isNaN(args[1]) || parseInt(args[1]) < 500000) return api.sendMessage("[ 𝗪𝗔𝗥𝗡𝗜𝗡𝗚 ] ➜ Số tiền cần rút phải là 1 con số và lớn hơn 500000$", threadID, messageID);
    if (!user.find(i => i.senderID == senderID)) {
      return api.sendMessage('[ 𝗪𝗔𝗥𝗡𝗜𝗡𝗚 ] ➜ Người dùng chưa đăng kí sử dụng banking, banking register để đăng kí', threadID, messageID)
    }
  else {  
    var userData = user.find(i => i.senderID == senderID); 
    var money = userData.money;
    if(parseInt(money) < parseInt(moneyInput)) return api.sendMessage('[ 𝗪𝗔𝗥𝗡𝗜𝗡𝗚 ] ➜ Số dư của bạn không đủ để thực hiện giao dịch này!', threadID, messageID)
      else {
        await await Currencies.increaseMoney(senderID, parseInt(moneyInput));
        userData.money = parseInt(money) - parseInt(moneyInput)
        writeFileSync(pathData, JSON.stringify(user, null, 2));
        return api.sendMessage(`[ 𝗦𝗨𝗖𝗖𝗘𝗦𝗦 ] ➜ Rút thành công ${parseInt(moneyInput)} vnd, số dư còn lại là ${userData.money} vnd`, threadID, messageID)
      }
    }
  }
  else return api.sendMessage({
    body:`[⚜️]=== 『 MB BANK 』 ===[⚜️]\n◆━━━━━━━━━━━━━━━━◆\n\n➜ Đăng kí gửi tiền tại MB Bank - [ register/-r ]\n\n➜ Xem số tiền trong MB Bank - [check/coins]\n\n➜ Gửi tiền vào MB Bank - [ gửi/send ]\n\n➜ Rút tiền từ MB Bank - [ rút ]\n\n➜ Lãi suất hiện tại: +${laisuat}% trong ${timeIM/60} phút`,  attachment: (await require('axios').get(`https://i.imgur.com/QJSX9uN.jpg`, {
        responseType: 'stream'
    })).data
}, event.threadID);
       }