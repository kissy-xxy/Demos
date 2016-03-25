/**
 * MessagesController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 var ANDROID = 'android',
 	 IOS = 'ios',
 	 ALL_OS = 'all_os',
 	 MQTT_SERVER = 'mqtt://172.20.2.244:1884',
 	 ALL_TOPIC = 'all';


 var MessageHelper={

 	/**
 		@param targets  user_ids 
 		@param msg  	消息内容 
 	*/
 	send:function(msg,devices,isToAllTopic){
 		if(!msg || !devices) {
 			console.log("msg or devices is empty");
 			return; 
 		}
 		var mqtt    = require('mqtt');
		var client  = mqtt.connect(MQTT_SERVER);
		var allTopic = ALL_TOPIC;//默认发给所有人	 
		var self = this;	
		client.on('connect', function () {
		  //client.subscribe('presence');
		  console.log("connect success, isToAllTopic",isToAllTopic);
		  if(isToAllTopic){
			client.publish(allTopic, msg);
		  }else if(devices && devices.length>0){
		  	console.log(" isSend ");
		  	self.inSend(client,msg,devices,0,0);
		  }else{
		  	console.log("warn: 没有目标设备");
		  }
		 //  if(devices&&devices.length>0){
		 //  	console.log("send msg to "+ devices[0]);
			// client.publish(devices[0], JSON.stringify(msg),function(){
			// 	devices.shift();
			// 	MessageHelper.send(msg,devices);
			// });
		 //  // 	_.each(devices,function(token){
		 //  // 		console.log("send to "+token);
			// 	// client.publish(token, JSON.stringify(msg));
		 //  // 	});
		 //  }else if(isToAllTopic){
			//   client.publish(allTopic, msg);
		 //  }
		});

		client.on('error',function(){
			//链接失败
			var errLog = {
				message:msg
			}
			Logs.create(function(err,log){
				console.log("err when send message:\nmessage id:"+msg);
			});	
		});
		 
		// client.on('message', function (topic, message) {
		//   // message is Buffer 
		//   console.log(message.toString());
		// });
 	},
 	inSend: function(client,msg,devices,android_count,ios_count){
	 	if(devices&&devices.length>0){
		  	console.log("send msg to "+ devices[0]);
			client.publish(devices[0], JSON.stringify(msg),function(){
				if(devices[0].os_type==ANDROID) android_count++;
				if(devices[0].os_type==IOS) ios_count++;
				devices.shift();
				MessageHelper.inSend(client,msg,devices,android_count,ios_count);
			});
		 }else{
  			client.end();
  			//标记发送条数
  			msg.count_ios = ios_count;
  			msg.count_android = android_count;
			console.log('更新',JSON.stringify(msg));

  			Messages.update(msg.id,msg,function(err,message){
  				console.log('更新成功',JSON.stringify(message));
  			});
  		}
  	}
  }

module.exports = {
	index: function(req,res,next){
		Messages.find({sort:{id:'desc'}}).populate('category').populate('app').exec(function(err,msgs){
			//console.log("messages",msgs);
			return res.view({messages:msgs});
		});
	},
	new: function(req,res,next){
		//待优化,一起请求
		Categories.find(function(err,categories){
			Apps.find(function(err,apps){
				Devices.find(function(err,devices){
					Versions.find(function(err,versions){
						var ios_versions=[],android_versions=[];
						_.each(versions,function(version){
							if(version.os_type==ANDROID){
								android_versions.push(version);
							}else if(version.os_type==IOS){
								ios_versions.push(version);
							}
						});
						return res.view({
							categories:categories||[],
							apps:apps||[],
							devices:devices||[],
							ios_versions:ios_versions||[],
							android_versions:android_versions||[]
						});
					});
				});
			});
		});
	},
	create:function(req,res,next){

		//TODO: 数据验证
		try{
			var android_version = req.param('android_version') && req.param('android_version').split('_');
			var ios_version = req.param('ios_version') && req.param('android_version').split('_');

			var android_version_number =android_version[1];
			var android_version_id = android_version[0]; 
			var ios_version_number = ios_version[1];
			var ios_version_id = ios_version[0];

		}catch(ex){
			console.log(" err when get android_version,ios_version param");
			var android_version_number= '';
			var android_version_id ='';
			var ios_version_number='' 
			var ios_version_id ='';
		}
		

		var msg = {
			category:req.param("category"),
			content: req.param("content"),
			payloads: req.param("payloads"),
			app: parseInt(req.param("app")),
			user_ids: !!req.param('user_ids') ? req.param("user_ids").split(','):null,
			os_type:req.param('os_type')||ALL_OS,
			android_version: android_version_id,
			ios_version: ios_version_id,
			creator: req.param("creator"),
			count_ios: req.param("count_ios"),
			count_android: req.param("count_android")
		}

		// 判断是不是所有版本		

		console.log("msg:",JSON.stringify(msg));
		//TODO: add send mqtt message
		var deviceWhere={};
		if(msg.app){
			deviceWhere.app=msg.app;
		}
		//系统版本
		if(msg.os_type && msg.os_type!=ALL_OS) deviceWhere.os_type=msg.os_type;
		//Android 系统版本
		if((msg.os_type==ALL_OS || msg.os_type==ANDROID) && msg.android_version) deviceWhere.os_version={'>=':msg.android_version};
		// IOS 版本
		if((msg.os_type==ALL_OS || msg.os_type==IOS) && msg.ios_version) deviceWhere.os_version={'>=':msg.ios_version};

		var versionQuery = {or:[]};
		if(!msg.os_type){
			msg.os_type=ALL_OS;
		}
		if(msg.os_type==ALL_OS || msg.os_type==ANDROID){
			versionQuery.or.push({
				os_type:ANDROID,
				number:{'>=':android_version_number}
			});
		}else if(msg.os_type==ALL_OS ||msg.os_type==IOS){
			versionQuery.or.push({
				os_type:ANDROID,
				number:{'>=':ios_version_number}
			});
		}

		//id 取 version.number
		//筛 device.number 以上版本
		//取device.id,

		console.log('versionQuery',JSON.stringify(versionQuery));

		//查找版本
		Versions.find(versionQuery,function(err,versions){
			console.log('err',err);
			console.log("versions:",versions);
			var versionIds = [];
			_.each(versions,function(version){
				versionIds.push(version.id);
			});	

			console.log("versionIds:",versionIds);
			//筛选设备
			Devices.find({where:{
				version:versionIds
			}},function(err,devices){
				console.log("err",err);
				console.log("devices",devices);
				//与user_ids取交集
				var targetDevices = [];
				var user_ids = [];
				var isToAllTopic = !msg.ios_version && !msg.android_version && msg.os_type==ALL_OS;
				if(msg.user_ids && msg.user_ids.length>0){
					_.each(devices,function(device){
						if(msg.user_ids && msg.user_ids.length>0 && msg.user_ids.indexOf(device.user_id)>=0){
							targetDevices.push(device);
							user_ids.push(device.user_id);
						}
					});
				}else{
					targetDevices=devices;
					_.each(devices,function(device){
						user_ids.push(device.user_id);
					});
				}
				msg.user_ids = user_ids;

				console.log(" MSG ",JSON.stringify(msg));
				if(!msg.android_version) delete msg.android_version;
				if(!msg.ios_version) delete msg.ios_version;

				Messages.create(msg,function(err,message){
					if(err) {
						req.session.flash={
							err:err
						}
						return res.redirect("/messages/new");
					}
					//筛选完成后的user_ids
					console.log('实际发送通知到：',JSON.stringify(targetDevices));
					console.log("user_ids",user_ids);
					MessageHelper.send(message,targetDevices,isToAllTopic);
					res.redirect("/messages/index");
				});
			});
		});

		return;


		console.log("user_ids:"+msg.user_ids);
		console.log("device where:",deviceWhere);
		Devices.find(deviceWhere,function(err,devices){
			//与user_ids取交集
			var targetDevices = [];
			var user_ids = [];
			var isToAllTopic = !msg.ios_version && !msg.android_version && msg.os_type==ALL_OS;
			if(msg.user_ids && msg.user_ids.length>0){
				_.each(devices,function(device){
					if(msg.user_ids && msg.user_ids.length>0 && msg.user_ids.indexOf(device.user_id)>=0){
						targetDevices.push(device);
						user_ids.push(device.user_id);
					}
				});
			}else{
				targetDevices=devices;
				_.each(devices,function(device){
					user_ids.push(device.user_id);
				});
			}
			msg.user_ids = user_ids;
			Messages.create(msg,function(err,message){
				if(err) {
					req.session.flash={
						err:err
					}
					return res.redirect("/messages/new");
				}
				//筛选完成后的user_ids
				console.log('实际发送通知到：',JSON.stringify(targetDevices));
				console.log("user_ids",user_ids);
				MessageHelper.send(message,targetDevices,isToAllTopic);
				res.redirect("/messages/index");
			});


		});

	},
	show: function(req,res,next){
		Messages.findOne(req.param('id')).populate('app').populate('category').exec(function(err,message){
			if(err) return next(err);
			if(!message) return next("");
			res.view({
				message:message
			});
		});
	},
};

