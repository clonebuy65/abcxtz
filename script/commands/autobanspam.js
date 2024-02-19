module.exports.config = {
	name: "autobanspam",
	version: "1.0.0",
	hasPermssion: 2, 
	credits: "Milo",
	description: "Tự động cấm người dùng nếu spam bot (random image)",
	commandCategory: "Hệ thống support-bot",
	usages: "autobanuser",
	cooldowns: 5
};

module.exports. run = ({api, event}) => {
  return api.sendMessage("[⚜️] ➜ Bạn sẽ bị ban nếu spam bot quá 3 lần !!!", event.threadID, event.messageID);
};

module.exports.handleEvent = async ({ Users, api, event}) => {
	const fs = require("fs");
	const moment = require("moment-timezone");
  let { messageID, threadID } = event;
  const senderID = event.messageReply.senderID;
  const so_lan_spam = 3; // số lần spam, vượt quá sẽ bị ban
  const thoi_gian_spam = 50000; // 60000 millisecond (1 phút)
  const unbanAfter = 1800000; // 1800000 millisecond (30 phút) 
  const folderRandomImage = __dirname + "/noprefix/ban";
  const allImage = fs.readdirSync(folderRandomImage);

  if (!global.client.autoban) global.client.autoban = {};
  if (!global.client.autoban[senderID]) {
    global.client.autoban[senderID] = {
      timeStart: Date.now(),
      number: 0
    }
  };

  
  //const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const prefix =  global.config.PREFIX || threadSetting.PREFIX ;
	if (!event.messageReply.body|| event.messageReply.body.indexOf(prefix) != 0) return;


	let dataUser = await Users.getData(senderID) || {};
	let data = dataUser.data || {};
	

	if ((global.client.autoban[senderID].timeStart + thoi_gian_spam) <= Date.now()) {
	  global.client.autoban[senderID] = {
	    timeStart: Date.now(),
	    number: 0
	  }
	}
	else {
	  global.client.autoban[senderID].number++;
	  if (global.client.autoban[senderID].number >= so_lan_spam) {
	    const time = moment.tz("Asia/Ho_Chi_minh").format("DD/MM/YYYY HH:mm:ss");
			if (data && data.banned == true) return;
			data.banned = true;
			data.reason = `[⚜️] ➜ Spam bot ${so_lan_spam} lần/${thoi_gian_spam/60000}phút`;
			data.autoban = {
			  timeStart: Date.now(),
			  unbanAfter
			};
			data.dateAdded = time;
			await Users.setData(senderID, { data });
			global.data.userBanned.set(senderID, { reason: data.reason, dateAdded: data.dateAdded });
			global.client.autoban[senderID] = {
	      timeStart: Date.now(),
	      number: 0
	    };
  		api.sendMessage({
  		  body: `=== 『 BANNED SPAM 』 ===\n━━━━━━━━━━━━━━━━\n[⚜️] ➜ UID: ${senderID}\n[⚜️] ➜ Nạn nhân: ${dataUser.name}\n[🚫] ➜ Bạn đã bị cấm sử dụng bot ${unbanAfter/60000} phút với lý do: spam bot \n[✅] ➜ Auto unban sau: ${Math.floor(unbanAfter/60000)} phút\n[🤡] ➜ Muốn mở sớm thì liên hệ admin nhé cu !\n[👻] ➜ Fb Admin nè: https://www.facebook.com/danghoangbaohuy.milo`, attachment: fs.createReadStream(`${folderRandomImage}/${allImage[Math.floor(Math.random()*allImage.length)]}`)}, threadID, () => {
  		    setTimeout(async function() {
  		      delete data.autoban;
      	    data.banned = true;
      			data.reason = null;
      			data.dateAdded = null;
      			await Users.setData(senderID, { data });
      			global.data.userBanned.delete(senderID);
      				api.sendMessage("=== 『 UNBAN SPAM 』 ===\n━━━━━━━━━━━━━━━━\n[⚜️] ➜ Bot đã gỡ ban cho " + dataUser.name + " bạn bị ban vào lúc " + time +  ` đừng spam nữa nhé cu không lại bị khóa mỏm!!! `, threadID); //mod by toàn
 			  }, unbanAfter);
  		  });
        for (let idAdmin of global.config.ADMINBOT) {
  		  api.sendMessage(`=== 『 USER SPAM 』 ===\n━━━━━━━━━━━━━━━━\n[⚜️] ➜ Bot vừa ban\n[⚜️] ➜ UID: ${senderID}\n[⚜️] ➜ Nạn nhân: ${dataUser.name}\n[⚜️] ➜ Tại nó spam dựa trên ${so_lan_spam} lần/phút\n[⚜️] ➜ Thời gian bị ban là: ` + time, idAdmin);
		  };
	  }
	}
};

//gửi all admin
// FIX ERROR
