//6628568379%7Cc1e620fa708a1d5696fb991c1bde5662
module.exports.config = {
    name: "ad",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Milo",
    description: "Kiểm tra thông tin admin .",
    commandCategory: "Thông tin",
    usages: "ad",
    cooldowns: 5,
    dependencies: {
        "request": "",
        "fs-extra": "",
        "axios": ""
    }
};

module.exports.run = async function({ api,event,args,client,Users,Threads,__GLOBAL,Currencies }) {
var name = (await Users.getData(event.senderID)).name
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
var link = [
"https://i.imgur.com/xhAQLw3.mp4"
];
var callback = () => api.sendMessage({body:`[⚜️]=== 『 INFORMATION ADMIN 』 ===[⚜️]
◆━━━━━━━━━━━━━━━━◆

[👀] ➜ Tên: Đặng Hoàng Bảo Huy
[💮] ➜ Biệt danh: Huy
[❎] ➜ Ngày tháng năm sinh: 04/10/2007
[👤] ➜ Giới tính: Nam
[💫] ➜ Chiều cao cân nặng: 1m75 x 58 kg
[❤️] ➜ Tên duyên phận: 式守 都
[🧸] ➜ Biệt danh: Shikimori 
[💥] ➜ Ngày sinh: 07/12/2001
[💘] ➜ Mối quan hệ: waifu
[🌎] ➜ Quê quán: Ninh Hòa - Khánh Hòa
[🌸] ➜ Tính cách: Hòa đồng, vu vẻ, dứt khoát, thân thiện và hài hước
[🌀] ➜ Sở thích: Thích gái đẹp, viết code, quây quần bên gia đình và bạn bè

[⚜️]=== 『 CONTACT 』 ===[⚜️]
◆━━━━━━━━━━━━━━━━◆

[☎] ➜ SĐT & Zalo: 0372768928
[🌐] ➜ Facebook: https://www.facebook.com/danghoangbaohuy.milo
[⛱] ➜ TikTok: https://www.tiktok.com/@danghoangbaohuy.milo
[⛲] ➜ Instagram: https://www.instagram.com/danghoangbaohuy.milo
[📋] ➜ Telegram: https://t.me/danghoangbaohuy
[✉️] ➜ Email: danghoangbaohuyc3@gmail.com

[⚜️]=== 『 DONATE - TIPS 』 ===[⚜️]
◆━━━━━━━━━━━━━━━━◆

[💵] ➜ MBBANK: 0372768928 / https://i.imgur.com/a4itSf8.jpeg / Đặng Hoàng Bảo Huy
[💵] ➜ ZALO PAY: 0372768928 / https://i.imgur.com/H5mCoC4.jpeg / Đặng Hoàng Bảo Huy

[⚜️]=== 『 PROBLEM 』 ===[⚜️]
◆━━━━━━━━━━━━━━━━◆

[❗] ➜ Mọi thắc mắc hay bot không hoạt động có thể hỏi trực tiếp admin theo các link ở trên.
[📌] ➜ Hãy đồng hành cùng tôi và Milo nhé. Cảm ơn mọi người <3

✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

[📝] ➜ Bot được điều hành bởi Milo`,

    attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => 

    fs.unlinkSync(__dirname + "/cache/1.png"));  

      return request(

        encodeURI(`https://graph.facebook.com/${1824557330}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(

fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());

       };