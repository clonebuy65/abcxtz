module.exports.config = {
  name: "cu",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Milo",
  description: "Random ảnh ciu to :v",
  commandCategory: "Random-img",
  usages: "cu",
  cooldowns: 2,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }
    
};

module.exports.run = async({api,event,args,Users,Threads,Currencies}) => {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
    var link = [
"https://i.imgur.com/W2uEEQ0.jpeg",
"https://i.imgur.com/W2uEEQ0.jpeg",
""
     ];
     var callback = () => api.sendMessage({body:`Như thế này mà nhét vào Lồn rồi bắn tinh trùng thì phê chết đi được.`,attachment: fs.createReadStream(__dirname + "/cache/1.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.jpg"));  
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/1.jpg")).on("close",() => callback());
   };