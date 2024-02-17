module.exports.config = {
	name: "updatefile", 
	version: "1.0.0",
	hasPermssion: 3, 
	credits: "Milo", 
	description: "Cập nhật file quann trọng", 
	commandCategory: "system", 
	usages: "update [file muốn update]",
	cooldowns: 1, 
	dependencies: {
		"fs": ""
	}
};

const fs = require('fs');
const path = require('path');
const { Octokit } = require("@octokit/rest");


module.exports.run = async function({ api, event}) {
	//Lấy path
	//const databasePath = path.join(__dirname, '..', '..', 'data', 'data.sqlite');// Đường dẫn đến cơ sở dữ liệu
	
	const { threadID } = event;
	
	const octokit = new Octokit({
		auth: "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", // Replace with your actual token
	  });

	const result = await octokit.request(`GET /repos/baohuyai/shikimori/contents/data/data.sqlite`, {
		owner: "baohuyai",
		repo: "shikimori",
		file_path: "data/data.sqlite",
		branch: "main"
	});


	const content = fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'data.sqlite'), "base64");
	
	await octokit.rest.repos.createOrUpdateFileContents({
		owner: "baohuyai",
		repo: "shikimori",
		path: "data/data.sqlite",
		message: "Cập nhật data.sqlite",
		content: content,
		committer: {
		  name: "Octokit Bot",
		  email: "danghoangbaohuyc3@gmail.com"
		},
		sha: result.data.sha
	  });

	return  api.sendMessage({ body: `Update thành công!\nĐây là link file: ${result.data.download_url} `}, threadID)
	

};
	
		
		
