module.exports.config = {
    name: "load",
    version: "1.0.0",
    hasPermssion: 3,
    credits: "Milo",
    description: "Quản lý/Kiểm soát toàn bộ module của bot",
    commandCategory: "Hệ thống admin-bot",
    usages: "[mdl/un/All/unAll/info/count] [tên module]",
    cooldowns: 0,
    dependencies: {
        "fs-extra": "",
        "child_process": "",
        "path": ""
    }
};

const loadCommand = function ({ moduleList, threadID, messageID }) {
    const { execSync } = global.nodemodule['child_process'];
    const { writeFileSync, unlinkSync, readFileSync } = global.nodemodule['fs-extra'];
    const { join } = global.nodemodule['path'];
    const moment = require("moment-timezone");
    var gio = moment.tz("Asia/Ho_Chi_Minh").format("D/MM/YYYY || HH:mm:ss");
    var thu = moment.tz('Asia/Ho_Chi_Minh').format('dddd');
  if (thu == 'Sunday') thu = 'Chủ Nhật'
  if (thu == 'Monday') thu = 'Thứ Hai'
  if (thu == 'Tuesday') thu = 'Thứ Ba'
  if (thu == 'Wednesday') thu = 'Thứ Tư'
  if (thu == "Thursday") thu = 'Thứ Năm'
  if (thu == 'Friday') thu = 'Thứ Sáu'
  if (thu == 'Saturday') thu = 'Thứ Bảy'
    const { configPath, mainPath, api } = global.client;
    const logger = require(mainPath + '/utils/log');

    var errorList = [];
    delete require['resolve'][require['resolve'](configPath)];
    var configValue = require(configPath);
    writeFileSync(configPath + '.temp', JSON.stringify(configValue, null, 2), 'utf8');
    for (const nameModule of moduleList) {
        try {
            const dirModule = __dirname + '/' + nameModule + '.js';
            delete require['cache'][require['resolve'](dirModule)];
            const command = require(dirModule);
            global.client.commands.delete(nameModule);
            if (!command.config || !command.run || !command.config.commandCategory) 
                throw new Error('[ 𝐋𝐎𝐀𝐃 ] - Module không đúng định dạng!');
            global.client['eventRegistered'] = global.client['eventRegistered']['filter'](info => info != command.config.name);
            if (command.config.dependencies && typeof command.config.dependencies == 'object') {
                const listPackage = JSON.parse(readFileSync('./package.json')).dependencies,
                    listbuiltinModules = require('module')['builtinModules'];
                for (const packageName in command.config.dependencies) {
                    var tryLoadCount = 0,
                        loadSuccess = ![],
                        error;
                    const moduleDir = join(global.client.mainPath, 'nodemodules', 'node_modules', packageName);
                    try {
                        if (listPackage.hasOwnProperty(packageName) || listbuiltinModules.includes(packageName)) global.nodemodule[packageName] = require(packageName);
                        else global.nodemodule[packageName] = require(moduleDir);
                    } catch {
                        logger.loader('[ 𝐋𝐎𝐀𝐃 ] ➜ Không tìm thấy package ' + packageName + ' hỗ trợ cho lệnh ' + command.config.name+ 'tiến hành cài đặt...', 'warn');
                        const insPack = {};
                        insPack.stdio = 'inherit';
                        insPack.env = process.env ;
                        insPack.shell = !![];
                        insPack.cwd = join(global.client.mainPath,'nodemodules')
                        execSync('npm --package-lock false --save install ' + packageName + (command.config.dependencies[packageName] == '*' || command.config.dependencies[packageName] == '' ? '' : '@' + command.config.dependencies[packageName]), insPack);
                        for (tryLoadCount = 1; tryLoadCount <= 3; tryLoadCount++) {
                            require['cache'] = {};
                            try {
                                if (listPackage.hasOwnProperty(packageName) || listbuiltinModules.includes(packageName)) global.nodemodule[packageName] = require(packageName);
                                else global.nodemodule[packageName] = require(moduleDir);
                                loadSuccess = !![];
                                break;
                            } catch (erorr) {
                                error = erorr;
                            }
                            if (loadSuccess || !error) break;
                        }
                        if (!loadSuccess || error) throw 'Không thể tải package ' + packageName + (' cho lệnh ') + command.config.name +', lỗi: ' + error + ' ' + error['stack'];
                    }
                }
                logger.loader('[ 𝐋𝐎𝐀𝐃 ] ➜   Đ𝐚̃ 𝐭𝐚̉𝐢 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠 𝐭𝐨𝐚̀𝐧 𝐛𝐨̣̂ 𝐩𝐚𝐜𝐤𝐚𝐠𝐞 𝐜𝐡𝐨 𝐥𝐞̣̂𝐧𝐡 ' + command.config.name);
            }
            if (command.config.envConfig && typeof command.config.envConfig == 'Object') try {
                for (const [key, value] of Object['entries'](command.config.envConfig)) {
                    if (typeof global.configModule[command.config.name] == undefined) 
                        global.configModule[command.config.name] = {};
                    if (typeof configValue[command.config.name] == undefined) 
                        configValue[command.config.name] = {};
                    if (typeof configValue[command.config.name][key] !== undefined) 
                        global.configModule[command.config.name][key] = configValue[command.config.name][key];
                    else global.configModule[command.config.name][key] = value || '';
                    if (typeof configValue[command.config.name][key] == undefined) 
                        configValue[command.config.name][key] = value || '';
                }
                logger.loader('Loaded config' + ' ' + command.config.name);
            } catch (error) {
                throw new Error('[ 𝐋𝐎𝐀𝐃 ] ➜ 𝐊𝐡𝐨̂𝐧𝐠 𝐭𝐡𝐞̂̉ 𝐭𝐚̉𝐢 𝐜𝐨𝐧𝐟𝐢𝐠 𝐦𝐨𝐝𝐮𝐥𝐞, 𝐥𝐨̂̃𝐢: ' + JSON.stringify(error));
            }
            if (command['onLoad']) try {
                const onLoads = {};
                onLoads['configValue'] = configValue;
                command['onLoad'](onLoads);
            } catch (error) {
                throw new Error('[ 𝐋𝐎𝐀𝐃 ] ➜ 𝐊𝐡𝐨̂𝐧𝐠 𝐭𝐡𝐞̂̉ 𝐨𝐧𝐋𝐨𝐚𝐝 𝐦𝐨𝐝𝐮𝐥𝐞, 𝐥𝐨̂̃𝐢: ' + JSON.stringify(error), 'error');
            }
            if (command.handleEvent) global.client.eventRegistered.push(command.config.name);
            (global.config.commandDisabled.includes(nameModule + '.js') || configValue.commandDisabled.includes(nameModule + '.js')) 
            && (configValue.commandDisabled.splice(configValue.commandDisabled.indexOf(nameModule + '.js'), 1),
            global.config.commandDisabled.splice(global.config.commandDisabled.indexOf(nameModule + '.js'), 1))
            global.client.commands.set(command.config.name, command)
            logger.loader('𝐓𝐚̉𝐢 𝐥𝐞̣̂𝐧𝐡 ' + command.config.name + ' 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠 ✓');
        } catch (error) {
            errorList.push('- ' + nameModule + ' reason:' + error + ' at ' + error['stack']);
        };
    }
    if (errorList.length != 0) api.sendMessage('[ 𝐋𝐎𝐀𝐃 ] ➜ 𝐍𝐡𝐮̛̃𝐧𝐠 𝐥𝐞̣̂𝐧𝐡 𝐯𝐮̛̀𝐚 𝐱𝐚̉𝐲 𝐫𝐚 𝐬𝐮̛̣ 𝐜𝐨̂́ 𝐤𝐡𝐢 𝐡𝐞̣̂ 𝐭𝐡𝐨̂́𝐧𝐠 𝐥𝐨𝐚𝐝𝐢𝐧𝐠: ' + errorList.join(' '), threadID, messageID);
    //api.sendMessage('[ 𝐋𝐎𝐀𝐃 ] ➜ 𝘃𝘂̛̀𝗮 𝘁𝗮̉𝗶 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴 ' + (moduleList.length - errorList.length) +' 𝗹𝗲̣̂𝗻𝗵\n━━━━━━━━━━━━━━━━\n[ 𝗦𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹 ] ➜ 𝗺𝗼𝗱𝘂𝗹𝗲𝘀 ('+moduleList.join(' 👉 ') + '.js)' , threadID, messageID)
  api.sendMessage(`[ 𝐋𝐎𝐀𝐃 ] ➜ 𝐓𝐚̉𝐢 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠 ` + (moduleList.length - errorList.length) +` 𝐥𝐞̣̂𝐧𝐡\n━━━━━━━━━━━━━━━━\n[⚜️]➜ 𝚃𝚑𝚘̛̀𝚒 𝚐𝚒𝚊𝚗 : ⌈${thu} || ${gio}」\n━━━━━━━━━━━━━━━\n=== 𝐌𝐚𝐝𝐞 𝐁𝐲 ${global.config.BOTNAME} ===` , threadID, messageID) 
    writeFileSync(configPath, JSON.stringify(configValue, null, 4), 'utf8')
    unlinkSync(configPath + '.temp');
    return;
}

const unloadModule = function ({ moduleList, threadID, messageID }) {
    const { writeFileSync, unlinkSync } = global.nodemodule["fs-extra"];
    const { configPath, mainPath, api } = global.client;
    const logger = require(mainPath + "/utils/log").loader;

    delete require.cache[require.resolve(configPath)];
    var configValue = require(configPath);
    writeFileSync(configPath + ".temp", JSON.stringify(configValue, null, 4), 'utf8');

    for (const nameModule of moduleList) {
        global.client.commands.delete(nameModule);
        global.client.eventRegistered = global.client.eventRegistered.filter(item => item !== nameModule);
        configValue["commandDisabled"].push(`${nameModule}.js`);
        global.config["commandDisabled"].push(`${nameModule}.js`);
        logger(`Unloaded command ${nameModule}!`);
    }

    writeFileSync(configPath, JSON.stringify(configValue, null, 4), 'utf8');
    unlinkSync(configPath + ".temp");

    return api.sendMessage(`[ 𝐋𝐎𝐀𝐃 ] ➜ 𝐓𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠 𝐡𝐮𝐲̉ ${moduleList.length} 𝐥𝐞̣̂𝐧𝐡 ✨`, threadID, messageID);
}

module.exports.run = function ({ event, args, api, permssion }) {
  
    if (permssion != 3) return api.sendMessage( `[DONATE] ➜ Momo/Mbbank: 0396049649. Xin cám ơn ạ!! ❤️`, event.threadID, event.messageID)
    
    const { readdirSync } = global.nodemodule["fs-extra"];
    const { threadID, messageID } = event;

    var moduleList = args.splice(1, args.length);

    switch (args[0]) {
      case "count": {
      let commands = client.commands.values();
		  let infoCommand = "";
			api.sendMessage("[ 𝐋𝐎𝐀𝐃 ] ➜  𝐇𝐢𝐞̣̂𝐧 𝐭𝐚̣𝐢 𝐠𝐨̂̀𝐦 𝐜𝐨́ " + client.commands.size + " 𝐥𝐞̣̂𝐧𝐡 𝐜𝐨́ 𝐭𝐡𝐞̂̉ 𝐬𝐮̛̉ 𝐝𝐮̣𝐧𝐠 ✓"+ infoCommand, event.threadID, event.messageID);
      break;
		}
        case "mdl": {
            if (moduleList.length == 0) return api.sendMessage("[ 𝐋𝐎𝐀𝐃 ] ➜ 𝐓𝐞̂𝐧 𝐦𝐨𝐝𝐮𝐥𝐞 𝐤𝐡𝐨̂𝐧𝐠 𝐜𝐡𝐨 𝐩𝐡𝐞́𝐩 𝐛𝐨̉ 𝐭𝐫𝐨̂́𝐧𝐠 ⚠️", threadID, messageID);
            else return loadCommand({ moduleList, threadID, messageID });
        }
        case "un": {
            if (moduleList.length == 0) return api.sendMessage("[ 𝐋𝐎𝐀𝐃 ] ➜ 𝐓𝐞̂𝐧 𝐦𝐨𝐝𝐮𝐥𝐞 𝐤𝐡𝐨̂𝐧𝐠 𝐜𝐡𝐨 𝐩𝐡𝐞́𝐩 𝐛𝐨̉ 𝐭𝐫𝐨̂́𝐧𝐠 ⚠️", threadID, messageID);
            else return unloadModule({ moduleList, threadID, messageID });
        }
        case "All": {
            moduleList = readdirSync(__dirname).filter((file) => file.endsWith(".js") && !file.includes('example'));
            moduleList = moduleList.map(item => item.replace(/\.js/g, ""));
            return loadCommand({ moduleList, threadID, messageID });
        }
        case "unAll": {
            moduleList = readdirSync(__dirname).filter((file) => file.endsWith(".js") && !file.includes('example') && !file.includes("command"));
            moduleList = moduleList.map(item => item.replace(/\.js/g, ""));
            return unloadModule({ moduleList, threadID, messageID });
        }
        case "info": {
            const command = global.client.commands.get(moduleList.join("") || "");

            if (!command) return api.sendMessage("[ 𝐋𝐎𝐀𝐃 ] ➜ 𝐌𝐨𝐝𝐮𝐥𝐞 𝐛𝐚̣𝐧 𝐧𝐡𝐚̣̂𝐩 𝐤𝐡𝐨̂𝐧𝐠 𝐭𝐨̂̀𝐧 𝐭𝐚̣𝐢 ⚠️", threadID, messageID);

            const { name, version, hasPermssion, credits, cooldowns, dependencies } = command.config;

            return api.sendMessage(
                "=== " + name.toUpperCase() + " ===\n" +
                "- Được code bởi: " + credits + "\n" +
                "- Phiên bản: " + version + "\n" +
                "- Yêu cầu quyền hạn: " + ((hasPermssion == 0) ? "Người dùng" : (hasPermssion == 1) ? "Quản trị viên" : "Người vận hành bot" ) + "\n" +
                "- Thời gian chờ: " + cooldowns + " giây(s)\n" +
                `- Các package yêu cầu: ${(Object.keys(dependencies || {})).join(", ") || "Không có"}`,
                threadID, messageID
            );
        }
        default: {
            return global.utils.throwError(this.config.name, threadID, messageID);
        }
    }
}
