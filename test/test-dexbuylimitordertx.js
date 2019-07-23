'use strict'

// const express = require("express");
var bitcore = require('..');
var WriterHelper = require('../lib/util/writerhelper')
var privateKey = bitcore.PrivateKey.fromWIF('Y6J4aK6Wcs4A3Ex4HXdfjJ6ZsHpNZfjaS4B9w7xqEnmFEYMqQd13')

/*
Build a transaction for dex buy limit transfer
note:
1, nValidHeight: the height of the block when creating the signature, and the height difference when submitting the broadcast transaction must be <=250
2, fees: handling fee when deploying a smart contract, >= 10000 sawi (0.0001 wicc)
3. The same transaction cannot be submitted repeatedly before it is confirmed(BPS=0.1). It is recommended to solve the problem of batch initiated transaction by adding random handling fee.
4, coinType: currency type
5, assetType: asset type
6, assetAmount: the amount of assets
7, bidPrice: price
*/
/*
构建普通限价买交易的交易单
注意：
1、nValidHeight:创建签名时的区块高度,与提交广播交易时的高度差必须 <=250
2、fees:发布合约时的手续费, >= 10000 sawi(0.0001 wicc)
3、相同的交易在未被确认前不能重复提交(BPS=0.1),建议采用添加随机手续费方式解决批量发起交易问题
4、coinType:币种类型
5、assetType:资产类型
6、assetAmount:资产金额
7、bidPrice:价格
*/
var dexBuyLimitTxinfo = {
    nTxType: bitcore.WiccApi.DEX_BUY_LIMIT_ORDER_TX,
    nVersion: 1,
    nValidHeight: 5360,
    fees: 10000,
    srcRegId: '0-1',
    coinType: WriterHelper.prototype.CoinType.WICC,
    assetType:WriterHelper.prototype.CoinType.WUSD,
    assetAmount:10,
    bidPrice:200,
    network: 'testnet'
  };

  var dexBuyLimitOrderTx = new bitcore.Transaction.DexBuyLimitOrderTx(dexBuyLimitTxinfo);

  var hex = dexBuyLimitOrderTx.SerializeTx(privateKey)
  console.log(hex)
