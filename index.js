//Emod
module.exports = function pingRemover(dispatch){
	var enabled = false;
	var zone;
	var Item_ID = 98260;//Mark for Test
	var Stringus;
	var hexString;
	var currentEmote = 14;
	var num;
	var time = 200;
	var autoplay = false;
	var timeautoplay = 2000;
	var baitplay = false;
	dispatch.game.initialize(['me']);//not used right now..
	/*
	Stoped tests at emote id 3000
	*/
	dispatch.command.add('emoautoplay', (atime)=>{
		if(atime==undefined)
		{
			autoplay = !autoplay;
			if(autoplay)playEmo();
		}else{timeautoplay = atime;}
	});
	dispatch.command.add('emoping', (tim)=>{
		time = tim;
	});
	dispatch.command.add('emobait', (num)=>{
		if(num==undefined)
		{
			baitplay = !baitplay;
			dispatch.command.message("BaitPlay " + (baitplay ? 'Activated':'Deactivated'));
		}else{
		dispatch.command.message("Bait Emote = " + num);
		currentEmote = num;
		}
	});
	
	dispatch.hook('C_USE_ITEM', 3, event => {
		if(baitplay && (event.id==206004 || event.id==206003 || event.id==206002 || event.id==206001 || event.id==206000))
		{
			setTimeout(() => {
				dispatch.toServer('C_SOCIAL', 1, { emote: currentEmote, unk: 0 });
			}, time);
			//dispatch.command.message("Emote: " + currentEmote);
			//currentEmote++;
		}
	});
	
	dispatch.command.add('emo', (emote)=>{
		if (emote == undefined) {
			dispatch.command.message('\ncommands:'
			+ '\n>emo id - play emote with id'
			+ '\nemobait to activate bait emote'
			+ '\n>emobait [] - change emote for bait and autoplay'
			+ '\n>emoping [] - change bait>emote delay'
			+ '\n>emoautoplay - switch autoplay on/off'
			+ '\n>emoautoplay [] - change time for autoplay(milisec)'
			+ '\n>*******************************'
			
			+ "\n11,12,13 or craft1~2~3: crafting"
			+ '\n14 or nyan: nyan'
			+ '\n15: idle animation'
			+ '\n16-30: normal emotes'
			+ '\n31,32,33 or idle1~2~3: idle'
			+ '\n34,35,36 or talk1~2~3: talk to npc'
			+ '\n37 or bind: binding'
			+ '\n38,39: sit, stand'
			+ '\n40,41 or midle1~2: mount idle'
			+ '\n42 or mtalk: mount talk'
			+ '\n43,44: maid bow, kitchen dance'
			+ '\n45: human settle'
			+ '\n46: human peace'
			+ '\n47: high elf settle'
			+ '\n48: high eld peace'
			+ '\n49: castanic settle'
			+ '\n50: castanic peace'
			+ '\n51: elin settle'
			+ '\n52: elin peace'
			+ '\n53: GFToday Human'
			+ '\n54: GFTime Human'
			+ '\n55: GFToday High Elf'
			+ '\n56: GFTime High Elf'
			+ '\n57: GFToday Castanic'
			+ '\n58: GFTime Castanic'
			+ '\n59: GFToday Elin'
			+ '\n60: GFTime Elin'
			+ '\n61: GFToday Aman'
			+ '\n62: GFTime Aman'
			+ '\n73: Servant"s Bow(2017) Aman'
			+ '\n73: Servant"s Bow(2017) Castanic'
			+ '\n73: Servant"s Bow(2017) High Elf'
			+ '\n73: Servant"s Bow(2017) Human'
			+ '\n73: Servant"s Bow(2017) Elin'
			);
		return;
		}
		switch (emote) {
			case 'craft1':
				emote=11;
			break;
			case 'craft2':
				emote=12;
			break;
			case 'craft3':
				emote=13;
			break;
			case 'nyan':
				emote=14;
			break;
			case 'idle1':
				emote=31;
			break;
			case 'idle2':
				emote=32;
			break;
			case 'idle3':
				emote=33;
			break;
			case 'talk1':
				emote=34;
			break;
			case 'talk2':
				emote=35;
			break;
			case 'talk3':
				emote=36;
			break;
			case 'bind':
				emote=37;
			break;
			case 'midle1':
				emote=40;
			break;
			case 'midle2':
				emote=41;
			break;
			case 'mtalk':
				emote=42;
			break;
		}
		dispatch.toServer('C_SOCIAL', 1, { emote: emote, unk: 0 })
	});
	dispatch.hook('S_LOAD_TOPO', 3, e=>{
		zone = e.zone;
	});
	
	
	/////////////
	//FUNCTIONS//
	/////////////
	function playEmo(){
		setTimeout(() => {
			dispatch.toServer('C_SOCIAL', 1, { emote: currentEmote, unk: 0 });
		}, time);
		dispatch.command.message("Emote: " + currentEmote);
		//currentEmote++;
		
		if(autoplay){
			setTimeout(() => {
				playEmo();
			}, timeautoplay);
		};
	}
	
	function toHexString(numba){
		hexString = numba.toString(16);
		if (hexString.length % 2) {
			hexString = '0' + hexString;
		}
		return hexString;
	}
	function spawnMark(idRef, loc) {
			dispatch.send('S_SPAWN_DROPITEM', 6, {
				gameId: idRef,
				loc: loc,
				item: Item_ID, 
				amount: 1,
				expiry: 300000,
				explode:false,
				masterwork:false,
				enchant:0,
				source:0,
				debug:false,
				owners: [{id: 0}]
			});
	}
	
	
}
