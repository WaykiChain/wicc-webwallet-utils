'use strict';
console.error('\n=====RUN-TEST-ASSETCREATETX-START=====\n')
// usage: node test-assetcreatetx.js

/*
Build a transaction for asset create
note:
In addition to publishing assets miners fee, we need additional deduction 550WICC

1, nValidHeight: the height of the block when creating the signature, and the height difference when submitting the broadcast transaction must be <=250
2, fees: >= 1000000 sawi (0.01 wicc)
3. The same transaction cannot be submitted repeatedly before it is confirmed(BPS=0.1). It is recommended to solve the problem of batch initiated transaction by adding random handling fee.
4. assetSymbol: Asset symbols, publishing success can not be modified (asset Symbol Capital letter A-Z 1-7 digits [A_Z])
5. ownerRegid: asset owner
6. tokeName: asset name
7. totalSupply: total asset circulation
8. modifiAble: Whether the asset can be updated 
9、feeSymbol: fee type(WICC/WUSD)
*/
/*
构建发布资产交易

发布资产除了矿工费,还需额外扣除550WICC

注意：
1、nValidHeight:创建签名时的区块高度,与提交广播交易时的高度差必须 <=250
2、fees:手续费, >= 1000000 sawi(0.01 wicc)
3、同一笔交易在确认之前无法重复提交（BPS = 0.1）。 建议通过增加随机手续费来解决批量启动交易的问题。
4、assetSymbol: 资产符号，发布成功无法再修改(1-7位大写字母)
ownerRegid: 资产拥有者
6、assetName: 资产名称
7、totalSupply: 资产总发行量
8、modifiAble: 资产是否可以更新
9、feesCoinSymbol: 小费类型(WICC/WUSD)
*/

var { WaykiTransaction, Wallet } = require("../index")
var wallet = new Wallet("Y9wDyMys64KVhqwAVxbAB4aYDNVQ4HpRhQ7FLWFC3MhNNXz4JHot")

var assetData = {
  assetSymbol: "STOKENN",   //asset Symbol Capital letter A-Z 6-7 digits [A_Z]
  ownerRegid: "0-1",  //asset owner
  assetName: "SS Token",  //asset token name
  totalSupply: 10000000000000000,// total Supply *10^8
  modifiAble: false    //whether to allow modify
}

//note: change "nValidHeight" to current valid height, so that you can execute “submittx” ok after get the result
var assetCreateInfo = {
  nTxType: 9,
  nValidHeight: 8720, // create height
  srcRegId: "8267-2", // sender's regId
  asset: assetData,
  feeSymbol: "WICC",
  fees: 55000000000 + 1000000, // fees pay for miner min 0.01 wicc  +550wicc
};

var transaction = new WaykiTransaction(assetCreateInfo, wallet)
var rawtx = transaction.genRawTx()
console.log("asset create tx raw: ")
console.log(rawtx)
console.error('\n=====RUN-TEST-ASSETCREATETX-END=====\n')