module.exports.config = {
  name: "txiu",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Milo",
  description: "taixiu nhiều người có ảnh",
  commandCategory: "Trò chơi",
  usages: "[create/leave/start]\n[tài/xỉu]",
  cooldowns: 2
};

const axios = require('axios');

module.exports.languages = {
  "vi": {
        "missingInput": "[ BOT ] - Số tiền cược không hợp lệ, hoặc số âm",
        "wrongInput": "[ BOT ] - Nhập liệu không hợp lệ",
        "moneyBetNotEnough": "[ BOT ] - Tiền đủ đéo đâu mà cược to vậy cháu?",
        "limitBet": "[ BOT ] - Đéo có tiền all sĩ gái à:))",
        "alreadyHave": "[ BOT ] - Nhóm này đang mở 1 bàn tài xỉu",
        "alreadyBet": "[ BOT ] - Bạn đã thay mức cược %1 đô vô con %2.",
        "createSuccess": "🎲==== [ GAME CASINO ] ====🎲\n\nĐã tạo room tài xỉu thành công\nĐể vào tiền làm giàu, dùng:\n%1%2 [ xỉu hoặc tài ] [ vốn vào ]\nĐặt cược rồi có thể đổi\n\nNote: Hên thì bạn thành triệu phú, xui thì bán nhà nhé thằng ngu=))))",
        "noGame": "🎲==== [ WARNING ] ====🎲\n\nQuên tạo bàn kìa, cược cái cl :))",
        "betSuccess": "[ BOT ] - Bạn đã bán nhà và cược %1 VND vào con %2",
        "notJoined": "[ BOT ] - Vào cược chưa vậy đm:)",
        "outSuccess": "[ BOT ] - Bạn đã rời phòng, số tiền cược sẽ được hoàn lại",
        "shaking": "[ Loading ] - Đang lắc... Chúc mày may mắn bán nhà nhé =))) ",
        "final": "====[💎 FINAL POINT 💎]====",
        "notAuthor": "[ ERROR ] - Cút, đéo phải chủ phòng xổ cmm",
        "unknown": "[ ERROR ] - Sai cú pháp alo?",
        "noPlayer": "[ BOT ] - Đéo thằng nào cược đâu, xổ cái l",
        "info": "🎲==== [ INFO ROOM ] ====🎲\n👤 Chủ sòng: %1\n──────────────\n👥 Các con gà bị lùa: \n%2"
  }
}

const dice_images = [
  "https://i.ibb.co/1JGMF5Q/row-1-column-1.jpg",
  "https://i.ibb.co/tq3nykP/row-1-column-2.jpg",
  "https://i.ibb.co/bP4d8tR/row-2-column-1.jpg",
  "https://i.ibb.co/GdhsNG7/row-2-column-2.jpg",
  "https://i.ibb.co/884GLkx/row-3-column-1.jpg",
  "https://i.ibb.co/2N86jZ1/row-3-column-2.jpg"
];

module.exports.run = async function({ api, event, args, getText, Users, Threads, Currencies }) {
  
  if (!global.client.taixiu_ca) global.client.taixiu_ca = {};
  

  //DEFINE SOME STUFF HERE..
   const { senderID, messageID, threadID } = event;
 if (args.length == 0) return api.sendMessage(`===[ 🎲 𝐓𝐀̀𝐈 𝐗𝐈̉𝐔 🎲 ]===\n\n» tạo: Tạo room\n» rời: Rút vốn cút khỏi bàn\n» xổ: Lắc cái chén 
`, event.threadID, event.messageID);
  
  const { increaseMoney, decreaseMoney, getData } = Currencies;
    const moneyUser = (await getData(senderID)).money;
  const sendC = (msg, callback) => api.sendMessage(msg, threadID, callback, messageID);
  const sendTC = async (msg, callback) => api.sendMessage(msg, threadID, callback);
  const sendT = (msg) => sendTC(msg, () => {});
  const send = (msg) => sendC(msg, () => {});
    const threadSetting = (await Threads.getData(String(event.threadID))).data || {};
    const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

    //HERE COMES SWITCH CASE...
  switch(args[0]) {
    case "tạo": {
      if (threadID in global.client.taixiu_ca) send(getText("alreadyHave")); //SMALL CHECK
      else sendTC(getText("createSuccess", prefix, this.config.name), () => {
        global.client.taixiu_ca[threadID] = {
          players: 0,
          author: senderID,
          data: {},
          status: "pending",
          author: senderID
        };
      });
      return;
    };
    case "clear":{
      let dataThread = (await Threads.getData(event.threadID)).threadInfo;
      if (!global.client.taixiu_ca[threadID]) return send(getText("noGame"));
      if(!dataThread.adminIDs.find(item => item.id == senderID)  && !global.config.ADMINBOT.includes(senderID)){return api.sendMessage('[ WARNING ] - Bạn đéo có thẩm quyền :))',threadID)}
      else {
        delete global.client.taixiu_ca[threadID]
        return api.sendMessage("[ ✅ ] - Đã dọn rác thành công!", threadID)
      }
    }
    case "rời": {
      console.log(global.client.taixiu_ca[threadID].author)
      try {
      if (!global.client.taixiu_ca[threadID]){ return api.sendMessage('[ ❌ ] - Có bàn đéo đâu mà rời, sản à :))???', threadID)}
      if (!global.client.taixiu_ca[threadID].data[senderID]) return send(getText("notJoined"));
      if(global.client.taixiu_ca[threadID].author == senderID){
        for(i in global.client.taixiu_ca[threadID].data){
           await increaseMoney(i, global.client.taixiu_ca[threadID].data[i].bet * 2);
        }
        delete global.client.taixiu_ca[threadID]
        return api.sendMessage('[ BOT ] - Chủ phòng bị chủ nợ dí, cả sòng được hoàn vốn nhé kkk', threadID)
      }
      else {
        //REMOVING PLAYER
        global.client.taixiu_ca[threadID].players--;
        // global.client.taixiu_ca[threadID].data[senderID].forEach(async (e) => {
        //   console.log(e)
        //   await increaseMoney(senderID, e.bet);
        // })
        await increaseMoney(senderID, global.client.taixiu_ca[threadID].data[senderID].bet);
        delete global.client.taixiu_ca[threadID].data[senderID];
        send(getText("outSuccess"));
      }
      return;
    } catch(e){
      console.log(e)
    }
  }
    ;
    case "xổ": {
      //SMALL CHECK...
      if (!global.client.taixiu_ca[threadID]) return send(getText("noGame"));
      if (global.client.taixiu_ca[threadID].author != senderID) return send(getText("notAuthor"));
      if (global.client.taixiu_ca[threadID].players == 0) return send(getText("noPlayer"));

      //GET SHAKING DICES GIF AND SEND
      let shakingGif = (await axios.get('https://i.imgur.com/4xrrxVB.gif', { responseType: "stream"}).catch(e => console.log(e))).data;
      await api.sendMessage({
        body: getText("shaking"),
        attachment: shakingGif
      }, threadID, (err, info) => setTimeout(async () => await api.unsendMessage(info.messageID).then(async() => {
        await new Promise(resolve => setTimeout(resolve, 500)); //A LITTLE DELAY...

        //GET DICES
        let _1st = Math.ceil(Math.random() * 6);
        let _2nd = Math.ceil(Math.random() * 6);
        let _3rd = Math.ceil(Math.random() * 6);


        //MAKING MSG...
        let name = "";
        let msg = getText("final");

        //GET IMAGES
        let dice_one_img = (await axios.get(dice_images[_1st - 1], { responseType: "stream"}).catch(e => console.log(e))).data;
        let dice_two_img = (await axios.get(dice_images[_2nd - 1], { responseType: "stream"}).catch(e => console.log(e))).data;
        let dice_three_img = (await axios.get(dice_images[_3rd - 1], { responseType: "stream"}).catch(e => console.log(e))).data;
        let atms = [dice_one_img, dice_two_img, dice_three_img]; //ADD TO ARRAY

        //SPLIT 2 TYPE OF PLAYERS
        const rees = _1st + _2nd + _3rd;
        const uuu = _1st == _2nd == _3rd;
        let tai = [], xiu = [], result;
        for (i in global.client.taixiu_ca[threadID].data) {
          if(rees >= 4 && rees <= 10) { var dd = 'Xỉu' }
          else if(rees >= 11 && rees <= 17) { var dd = 'Tài'}
          name = await Users.getNameUser(i) || "Player"; //GET NAME
          console.log(rees)
          console.log()
      if (dd == "Xỉu") {
  if (["xỉu", "xiu"].includes(global.client.taixiu_ca[threadID].data[i].name)) {
    xiu.push(`${name}: +${global.client.taixiu_ca[threadID].data[i].bet.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}$`)
    await increaseMoney(i, global.client.taixiu_ca[threadID].data[i].bet * 2);
  } else {
    tai.push(`${name}: -${global.client.taixiu_ca[threadID].data[i].bet.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}$`);
    await decreaseMoney(i, global.client.taixiu_ca[threadID].data[i].bet);
  }
} else {
  if (["tài", "tài"].includes(global.client.taixiu_ca[threadID].data[i].name)) {
    tai.push(`${name}: +${global.client.taixiu_ca[threadID].data[i].bet.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}$`)
    await increaseMoney(i, global.client.taixiu_ca[threadID].data[i].bet * 2);
  } else {
    xiu.push(`${name}: -${global.client.taixiu_ca[threadID].data[i].bet.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}$`);
    await decreaseMoney(i, global.client.taixiu_ca[threadID].data[i].bet);
  }
}
        }
        msg += `\n\n---------[ User theo tài ]---------\n${tai.join("\n")}\n\n---------[ User theo xỉu ]---------\n${xiu.join("\n")}\n\n[ Kết quả của thằng lồn cái ] -「 ${dd} 」`;

        //FINAL SEND
        sendC({
          body: msg,
          attachment: atms
        }, () => delete global.client.taixiu_ca[threadID]);
        return;
      }), 2400));
    };
    case "info": {
      //SMALL CHECK
      if (!global.client.taixiu_ca[threadID]) return send(getText("noGame"));
      if (global.client.taixiu_ca[threadID].players == 0) return send(getText("noPlayer"));

      let name = "";
      let tempL = [];
      let nameAuthor = await Users.getNameUser(global.client.taixiu_ca[threadID].author) || "Player"; //GET NAME AUTHOR
      for (e in global.client.taixiu_ca[threadID].data) {
        name = await Users.getNameUser(e) || "Player"; //GET NAME PLAYER
        tempL.push(`${name}: ${global.client.taixiu_ca[threadID].data[e].name} - ${global.client.taixiu_ca[threadID].data[e].bet}$`);
      }
      send(getText("info", nameAuthor, tempL.join("\n")));
      return;
    }
    default: {
      //IF IF IF AND IF

      //LITTLE CHECK...
      if (!["tai","tài","xỉu","xiu"].includes(args[0])) return send(getText("unknown", prefix, this.config.name));
      if (!global.client.taixiu_ca[threadID]) return send(getText("noGame"));
      if (args.length < 2) return send(getText("wrongInput"));
      if(args[1] == "all" || args[1] == "allin") {
        var moneyyy = (await Currencies.getData(senderID)).money
      } else {
        var moneyyy = args[1]
      }
      moneyBet = parseInt(moneyyy);
        if (isNaN(moneyBet) || moneyBet <= 0) return send(getText("missingInput"));
      if (moneyBet > moneyUser) return send(getText("moneyBetNotEnough"));
      if (moneyBet < 50) return send(getText("limitBet"));

      if (threadID in global.client.taixiu_ca) {
        if (global.client.taixiu_ca[threadID].status == "pending") {
          let luachon = args[0];
          //CHECK INPUT
          if (["xiu","xỉu"].includes(luachon)) luachon = "xỉu";
          if (["tài","tai"].includes(luachon)) luachon = "tài";

          if (!global.client.taixiu_ca[threadID].data[senderID]) global.client.taixiu_ca[threadID].players++;
          if (global.client.taixiu_ca[threadID].data[senderID]) return sendC(getText("alreadyBet", moneyBet, luachon), async () => {
            await increaseMoney(senderID, global.client.taixiu_ca[threadID].data[senderID].bet);
            await decreaseMoney(senderID, moneyBet)
            global.client.taixiu_ca[threadID].data[senderID] = {
              name: luachon,
              bet: moneyBet
            }
          });
          sendC(getText("betSuccess", moneyBet.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."), luachon), async () => {
            await decreaseMoney(senderID, moneyBet);
            global.client.taixiu_ca[threadID].data[senderID] = {
              name: luachon,
              bet: moneyBet
            }
          });
        }
      }
      return;
    }
  }
                                            }