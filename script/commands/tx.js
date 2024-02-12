module.exports.config = {
    name: "tx",
    version: "1.1.1",
    hasPermssion: 0,
    credits: "Milo",
    description: "Chơi tài xỉu ngay trên message",
    commandCategory: "Game",
    usages: "tx [xỉu/xiu/x || tai/tài/t] + [tiền cược/all/50%]",
    cooldowns: 0,
    envConfig: {
        timeout: 3000, // thời gian kết thục tung xí ngầu, 1000 = 1s
        core: 3, // số tiền cược nhân cho 3
        api_key: "JRTvip_2200708248" // key dùng để dùng api
    }
}
module.exports.languages = {
    "vi": {
      "noOption1": "[⚜️] ➜ Bạn phải cược Tài hoặc Xỉu + tiền cược",
        "InvalidSelection": "[⚜️] ➜ Lựa chọn của bạn không hợp lệ\n[⚜️] ➜ Các lựa chọn hợp lệ ↓↓💦\n • %5: %4, %5, %6\n • %1: %1, %2, %3",
        "noOption2": "[⚜️] ➜ Bạn phải nhập số tiền cược hoặc all, 50%\n - all sẽ cược toàn bộ số tiền hiện có trong túi\n - 50% sẽ cược 50% số tiền hiện có",
        "InvalidBets": "[⚜️] ➜ Tiền cược không hợp lệ hoặc nhỏ hơn %1$",
        "notEnoughMoney": "[⚜️] ➜ Không đủ %1$ để bắt đầu cược, Bạn còn %2$ trong túi",
        "rollTheDice": "[⚜️] ➜ 🎲 Tung xí ngầu...\n[⚜️] ➜ Chúc bạn may mắn :))",
        "win": "[⚜️] ➜ Nhà cái ra %1, bạn cược %2 => win\n - Thu về %3$\n - Tài sản còn: %4$",
        "lose": "[⚜️] ➜ Nhà cái ra %1, bạn cược %2 => lose\n - Mất %3$\n - Tài sản còn: %4$",
        "error": "[⚜️] ➜ %1, Đã xảy ra lỗi, vui lòng thử lại sau giây lát!"
    },
    "en": {}
}
const axios = require("axios")
module.exports.run = async ({ api, event, args, Currencies, getText }) => {
  const { threadID: tid, messageID: mid, senderID: sid } = event
    try {
      if (!args[0]) return api.sendMessage(getText("noOption1"), tid, mid)
        const { name, envConfig } = this.config
        const { timeout, core, api_key } = global.config[name]
        let get = (await axios.get(`https://docs-api.jrtxtracy.repl.co/game/taixiu`)).data
        var moneyUsers = (await Currencies.getData(sid)).money
        var choose = args[0].toLowerCase()
        var bets = parseInt(args[1])
        var typeTai = ["tai", "tài", "t"]
        var typeXiu = ["xiu", "xỉu", "x"]
        var other = ["all", "50%"]
        var arrayNew = []
        if (!arrayNew.concat(typeTai, typeXiu).includes(choose)) return api.sendMessage(getText("InvalidSelection", typeXiu[0], typeXiu[1], typeXiu[2], typeTai[0], typeTai[1], typeTai[2]), tid, mid)
        if (!args[1]) return api.sendMessage(getText("noOption2"), tid, mid)
        if ((isNaN(bets) || bets < 100) && !other.includes(args[1])) return api.sendMessage(getText("InvalidBets", 100), tid, mid)
        if (bets > moneyUsers && !other.includes(args[1])) return api.sendMessage(getText("notEnoughMoney", ChangeCurrency(bets), ChangeCurrency(moneyUsers)), tid, mid)
        return api.sendMessage({
            body: getText("rollTheDice"),
            attachment: await DownLoad(get.gif)
        }, tid, (error, info) => {
            return setTimeout(CheckResult, (timeout || envConfig.timeout))
            async function CheckResult() {
              bets = args[1] == "all"? moneyUsers: args[1] == "50%"? moneyUsers / 2: bets
                api.unsendMessage(info.messageID)
                if (typeTai.includes(choose)) {
                    choose = "tài"
                } else choose = "xỉu"
                if (choose == get.result) {
                    msg = "win", as = "increaseMoney", bets = bets * (core || envConfig.core), moneyUser = moneyUsers + parseInt(bets)
                } else msg = "lose", as = "decreaseMoney", bets = bets, moneyUser = moneyUsers - parseInt(bets)
                return api.sendMessage({
                    body: getText(msg, get.result + ' ' + get.total, choose, ChangeCurrency(bets), ChangeCurrency(moneyUser)),
                    attachment: await DownLoad(get.images)
                }, tid, () => Currencies[as](sid, bets), mid)
            }
        }, mid)
    } catch (e) {
        api.sendMessage(getText("error", e), tid)
    }
}
function ChangeCurrency(number) {
  return number.toLocaleString("en-US")
  }
async function DownLoad(url) {
  if(typeof url == "object") {
    var attachment = [];
    for(let i of url) {
      var resp = (await axios.get(i, {
          responseType: "stream"
      })).data
      attachment.push(resp)
    }
    return attachment
  }
  return (await axios.get(url, {
      responseType: "stream"
  })).data
}
