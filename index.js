let web3=new Web3("https://rinkeby.infura.io/v3/083836b2784f48e19e03487eb3209923");
let senderAdd='0x57335538C8D4354c9de1B153674C6601ECE52Cfa';
let rcvAdd='0xbc742f7bd7d16B8f667326C70299159396f191C1';
var prvtKey='0x633BC6EF07E8334213B032CCFAA11FD9CB04C823B8A137196D8D665C391B5CE0';
var conObj;



$("#batch").click(()=>{
	let batchreq=new web3.eth.BatchRequest();
	batchreq.add(web3.eth.getBalance(senderAdd,(err1,res1)=>{
		if(!err1)
			$("#output").html("response 1  :"+res1);
	}));
	batchreq.add(web3.eth.getBalance(rcvAdd,(err2,res2)=>{
		if(!err2)
			$("#outputex").html("response 2  :"+res2);
	}));
batchreq.execute();
});
//////////////////////////////////////



$("#batchtran").click(()=>{
	let batchreq=new web3.eth.BatchRequest();
	var etherTransfer = {  
    "from": senderAdd, 
     "to": rcvAdd, 
      "value": web3.utils.toHex(web3.utils.toWei("0.001", "ether")), 
       "gas": 800000,  
       "chainId": 4
 };

var etherTransfer2 = {  
    "from": senderAdd, 
     "to": rcvAdd, 
      "value": web3.utils.toHex(web3.utils.toWei("0.002", "ether")), 
       "gas": 800000,  
       "chainId": 4
 };


 batchreq.add(

 	 web3.eth.accounts.signTransaction(etherTransfer,prvtKey,async(err1,res1)=>{
$("#outputex").html("Raw Transaction : "+res1.rawTransaction);
web3.eth.sendSignedTransaction(res1.rawTransaction,(error1,trn1)=>{
	if(!error1)
	{
		$("#output").html("Transaction1 Successfull Hash is :"+trn1);
	}
	else{
		alert('error 1 is'+error1);
	}
})
 })
 	);



 batchreq.add(

 	 web3.eth.accounts.signTransaction(etherTransfer2,prvtKey,async(err2,res2)=>{
$("#outputex").html("Raw Transaction : "+res2.rawTransaction);
web3.eth.sendSignedTransaction(res2.rawTransaction,(error2,trn2)=>{
	if(!error2)
	{
		$("#outputex").html("Transaction2 Successfull Hash is :"+trn2);
	}
	else{
		alert('error 2 is'+error2);
	}
})
 })
 	);



});










$("#getdata").click(async()=>{
	let conabi=$("#contractinp").val();
    let conadd=$("#inpaddress").val();
    let conObj=new web3.eth.Contract(JSON.parse(conabi),conadd);
   conObj.methods.getData().call((err,res)=>{
   	if(!err)
   		$("#output").html(res);
   	else
   		$("#output").html(err);
   });
});



$("#setdata").click(()=>{
	let conabi=$("#contractinp").val();
    let conadd=$("#inpaddress").val();
    let inpdata=$("#inpdata").val();
    let conObj=new web3.eth.Contract(JSON.parse(conabi),conadd);
    let sendData=conObj.methods.setData(inpdata).encodeABI();

    let txObj = {  
    "from": senderAdd, 
     "to": conadd, 
     "data":sendData,
       "gas": 800000,  
       "chainId": 4
 };


 web3.eth.accounts.signTransaction(txObj,prvtKey,async(err,res)=>{
$("#outputex").html("Raw Transaction : "+res.rawTransaction);
web3.eth.sendSignedTransaction(res.rawTransaction,(error,trn)=>{
	if(!error)
	{
		$("#output").html("Contract Updated Hash Is  :"+trn);
	}
	else{
		alert('error is'+error);
	}
})
 });
  

});










$("#getcontract").click(async()=>{
let conadd=$("#inpaddress").val();
let conabi=$("#contractinp").val();
depCont=new web3.eth.Contract(JSON.parse(conabi),conadd);
$("#output").html("Contract Cloned :"+JSON.stringify(depCont));
});


$("#deploycontract").click(()=>{
	let binaryFile=$("#contractinp").val();
	var depCon = {  
    "from": senderAdd, 
     "to": '', 
     "data":binaryFile,
       "gas": 800000,  
       "chainId": 4
 };



 web3.eth.accounts.signTransaction(depCon,prvtKey,async(err,res)=>{
$("#outputex").html("Raw Transaction : "+res.rawTransaction);
web3.eth.sendSignedTransaction(res.rawTransaction,(error,trn)=>{
	if(!error)
	{
		$("#output").html("Contract Deploy Successfull Hash :"+trn);
	}
	else{
		alert('error is'+error);
	}
})
 });


});












$("#sendether").click(()=>{
	var etherTransfer = {  
    "from": senderAdd, 
     "to": rcvAdd, 
      "value": web3.utils.toHex(web3.utils.toWei("0.001", "ether")), 
       "gas": 800000,  
       "chainId": 4
 };

 web3.eth.accounts.signTransaction(etherTransfer,prvtKey,async(err,res)=>{
$("#outputex").html("Raw Transaction : "+res.rawTransaction);
web3.eth.sendSignedTransaction(res.rawTransaction,(error,trn)=>{
	if(!error)
	{
		$("#output").html("Transaction Successfull Hash is :"+trn);
	}
	else{
		alert('error is'+error);
	}
})
 });




});










$("#trandet").click(()=>{
let inp=$("#inpaddress").val();
web3.eth.getTransactionReceipt(inp,(err,res)=>{
if(!err){
	$("#output").html("Transaction "+JSON.stringify(res.contractAddress));
}
else
{
	alert(err);
}
});
});


$("#trancount").click(()=>{
let inp=$("#inpaddress").val();
web3.eth.getBlockTransactionCount(inp,(err,res)=>{
if(!err){
	$("#output").html("No of Transaction "+JSON.stringify(res));
}
else
{
	alert(err);
}
});
});







$("#getblock").click(()=>{
let inp=$("#inpaddress").val();
web3.eth.getBlock(inp,(err,res)=>{
if(!err){
	$("#output").html("Block details "+JSON.stringify(res));
}
else
{
	alert(err);
}
});
});






$("#lastblock").click(async ()=>{
	let lb=await web3.eth.getBlockNumber();
	$("#output").html("Last Block Number: "+lb);
});

$("#getBal").click(()=>{
let inp=$("#inpaddress").val();
web3.eth.getBalance(inp,(err,res)=>{
if(!err){
	$("#output").html("Balance is "+res);
}
else
{
	alert(err);
}
});
});