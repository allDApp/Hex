
$(function() {
	var NebPay = require("nebpay"); 
	var nebpay = new NebPay();
	function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
		var r = window.location.search.substr(1).match(reg);
		if (r!=null)
			 return (r[2]);
			 return null;
	}
	var uid= GetQueryString('uid');
	document.getElementById('PLAYERSOCS').innerHTML="Your Score:" + uid + '</br></br><div  role="presentation" href="javascript:void(0)" style="text-align:center"><a id="upnew" href="javascript:void(0)" class="title">Click to Update</a></div>';
	if (uid==null){document.getElementById('PLAYERSOCS').innerHTML="Have Not Play Yet"}
$("#getnew").click(function() {
	
	var to = "n1shkMzXNSn6J4swqx2jJ9oYFUm8dK4iDM1";
	var value = "0";
	var callFunction = "HexList";
	var callArgs = "[]";
	nebpay.simulateCall(to, value, callFunction, callArgs, {
		listener: function(resp) {
			//console.log(JSON.stringify(resp.result));
			if(resp.result == ""){
				$("#searchresult").html('<div class="panel-body">nodata</div>');
				return;
			}
			var res = JSON.parse(resp.result);
			if(res.length == 0){
				$("#searchresult").html('<div class="panel-body">nodata</div>');
				return;
			}

			var tempStr = "";

			for (var i = 0; i < res.length; i++) {
				if (i % 2 == 0) {
					tempStr += '<div class="panel-body">';
				} else {
					tempStr += '<div class="panel-footer">';
				}

				//					
				tempStr += '<p>';
				tempStr += res[i].Data+'  <small><cite>' + 'Player: ' + res[i].author.substr(3,5) + ' Time: ' + ttt(res[i].createdDate) + '</cite></small>'
				tempStr += '</p> </div> ';
			}
			console.log(tempStr);
			$("#searchresult").html(tempStr);
		}
	});

});
$("#getnew").click();

$("#upnew").click(function() {
	var NebPay = require("nebpay"); //https://github.com/nebulasio/nebPay
    var nebpay = new NebPay();
	var to = "n1shkMzXNSn6J4swqx2jJ9oYFUm8dK4iDM1";
	var value = "0";
	var callFunction = "SaveHex";
	var callArgs = "[\"" + "Score:" + uid +"\"]";
	nebpay.call(to, value, callFunction, callArgs, {
		listener: function Push(resp) {
			console.log("response of push: " + JSON.stringify(resp))
			var respString = JSON.stringify(resp);
			if(respString.search("rejected by user") !== -1){
				alert("Close,cancel update")
			}else if(respString.search("txhash") !== -1){
				alert("Hash: " + resp.txhash)
			}
		}
	});
});

function ttt(timestamp) {
	var date = new Date(timestamp * 1000);//10*1000，13*0
	Y = date.getFullYear() + '-';
	M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
	D = date.getDate() + ' ';
	h = date.getHours() + ':';
	m = date.getMinutes();
	return Y+M+D+h+m;
}
});
