module.exports.config = {
    name: "antiout",
    version: "1.1.2",
    hasPermssion: 1,
    credits: "Milo",
    description: "Tự động add lại thành viên out chùa | Không chắc chắn là add lại được tất cả.",
    commandCategory: "Hệ thống quản trị viên",
    usages: "antiout on/off",
    cooldowns: 5,
    dependencies: {
        "path": "",
        "fs-extra": ""
    }
};

module.exports.onLoad = function() {
    const { writeFileSync, existsSync } = global.nodemodule["fs-extra"];
    const { resolve } = global.nodemodule["path"];
    const log = require(process.cwd() + '/utils/log');
    const path = resolve(__dirname, 'cache', 'antiout.json');
    if (!existsSync(path)) {
        const obj = {
            antiout: {}
        };
        writeFileSync(path, JSON.stringify(obj, null, 4));
    } else {
        const data = require(path);
        if (!data.hasOwnProperty('antiout')) data.antiout = {};
        writeFileSync(path, JSON.stringify(data, null, 4));
    }

    //log("[!] Lưu Ý [!]", 'NOTI');
    //log("Mua file bot ib facebook.com/NHD.JRT.262", 'NOTI');
    //log("Thuê bot giá chỉ 30k/tháng", 'NOTI');
    //log("Được hỗ trợ khi mua và thuê", 'NOTI');
    //log("Hãy ib cho Nguyễn Hải Đăng để được tư vấn nhé !!!", 'NOTI');
    //log("Link Facebook: https://www.facebook.com/NHD.JRT.262", 'NOTI');
}

module.exports.run = async function({ api, event }) {
    const { writeFileSync } = global.nodemodule["fs-extra"];
    const { resolve } = global.nodemodule["path"];
    const path = resolve(__dirname, 'cache', 'antiout.json');
    const { threadID, messageID } = event;
    const database = require(path);
    const { antiout } = database;
    if (antiout[threadID] == true) {
        antiout[threadID] = false;
        api.sendMessage("⊰᯽⊱─ 𝐌𝐎𝐃𝐄 𝐎𝐅𝐅 ─⊰᯽\n[⚜️] ➜ Đ𝐚̃ 𝐭𝐚̆́𝐭 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠 𝐜𝐡𝐞̂́ đ𝐨̣̂ 𝐚𝐧𝐭𝐢𝐨𝐮𝐭 ✅\n[⚜️] ➜ 𝐁𝐚̂𝐲 𝐠𝐢𝐨̛̀ 𝐭𝐡𝐚̀𝐧𝐡 𝐯𝐢𝐞̂𝐧 𝐜𝐨́ 𝐭𝐡𝐞̂̉ 𝐨𝐮𝐭 𝐭𝐮̛̣ 𝐝𝐨 đ𝐮̛𝐨̛̣𝐜 𝐫𝐨̂̀𝐢 🐧", threadID, messageID);
    } else {
        antiout[threadID] = true;
        api.sendMessage("⊰᯽⊱─ 𝐌𝐎𝐃𝐄 𝐎𝐍 ─⊰᯽\n[⚜️] ➜ Đ𝐚̃ 𝐤𝐢́𝐜𝐡 𝐡𝐨𝐚̣𝐭 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠 𝐜𝐡𝐞̂́ đ𝐨̣̂ 𝐚𝐧𝐭𝐢𝐨𝐮𝐭 ✅\n[⚜️] ➜ 𝐊𝐡𝐨̂𝐧𝐠 𝐚𝐢 đ𝐮̛𝐨̛̣𝐜 𝐫𝐨̛̀𝐢 𝐤𝐡𝐨̉𝐢 đ𝐚̂𝐲 𝐤𝐡𝐢 𝐜𝐡𝐮̛𝐚 𝐜𝐨́ 𝐬𝐮̛̣ 𝐜𝐡𝐨 𝐩𝐡𝐞́𝐩 𝐜𝐮̉𝐚 𝐪𝐮𝐚̉𝐧 𝐭𝐫𝐢̣ 𝐯𝐢𝐞̂𝐧 𝐜𝐚̉", threadID, messageID);
    }
    writeFileSync(path, JSON.stringify(database, null, 4));
           }