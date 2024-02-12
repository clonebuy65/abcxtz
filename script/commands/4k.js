exports.config = {
  name: '4k',
  version: '0.0.1',
  hasPermssion: 0,
  credits: 'Milo',
  description: 'Tăng độ phân giải full hd 4k!',
  commandCategory: 'Tiện ích',
  usages: 'phản hồi hình ảnh',
  cooldowns: 3
};
let eta = 3;
exports.run = async o=> {
  let send = msg => o.api.sendMessage(msg, o.event.threadID, o.event.messageID);

  if (o.event.type != 'message_reply')return send(`⚡ Vui lòng phản hồi một hình ảnh nào đó!`);
  send(`⚡ Tiến hành tăng độ phân giải cho ${o.event.messageReply.attachments.length} ảnh, thời gian ước tính: ${o.event.messageReply.attachments.length*eta}s`);

  let stream = [];
  let exec_time = 0;
  for (let i of o.event.messageReply.attachments)try {
    let res = await require('axios').get(encodeURI(`https://nams.live/upscale.png?{"image":"${i.url}","model":"4x-UltraSharp"}`), {
      responseType: 'stream',
    });

    exec_time+=+res.headers.exec_time;
    eta = res.headers.exec_time/1000<<0;
    res.data.path = 'tmp.png';
    stream.push(res.data);
  } catch (e) {};

  send({
    body: `✅ Tăng độ phân giải hình ảnh lên full hd 4k thành công\n⏱️ Thời gian thực thi: ${exec_time/1000<<0}s`,
    attachment: stream,
  });
};