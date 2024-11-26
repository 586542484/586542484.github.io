function generateRandomString(length) {
  var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  var randomString = '';
  for (var i = 0; i < length; i++) {
    var randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }
  return randomString;
}

function byteArrayToHex(byteArray) {
  return byteArray.map(byte => {
    // 将每个字节转换为两位的十六进制字符串
    const hex = byte.toString(16).padStart(2, '0');
    return hex;
  }).join('');
}

let params = { key: generateRandomString(32), iv: generateRandomString(16), date: Date.now() }

// ------ 导入RSA ------
pm.sendRequest("https://raw.githubusercontent.com/loveiset/RSAForPostman/master/forge.js", (err, res) => {
  console.log("executeRSAOperations:", executeRSAOperations);
  if (!err) {
    pm.globals.set("forgeJS", res.text());
    executeRSAOperations();
  }
});

function executeRSAOperations() {
  // 引入 forge 库
  eval(pm.globals.get("forgeJS"));

  // 原始 JSON 数据
  const jsonData = {
    "key1": "value1",
    "key2": "value2"
  };

  // 将 JSON 数据转换为字符串
  const jsonString = JSON.stringify(params);
  console.log("params:", jsonString);
  // RSA 公钥
  const publicKeyPem = `-----BEGIN PUBLIC KEY-----\nMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAqhf41x5yT6t4q/RCsEUf\ndT8PXc3HL6maVkNKeO/MAfKyKyLzBx+UQ9xBQFtaARXtxmnLzCWt9nOi+riU/XYP\nNxTVqkYtBkMbT73+oeCBanqdeKhoTfA32kDt/IMzO9nU1BPCTpFo30VTSdiiW3e/\nksZVLSjWMdsZzbywtvehmLDOE/x9uloS6E4+0VlHMxwUnURQatDFvsx7vtn1FsKw\nrs5tDgH+xT47cARCdKoCL/Mmf6La3GcJuM/wHhD6tC9d0OiGFHPXOpaoz3uYzLow\nHpTY+ZBjVg4Ai3ttUJFfBTmWz2Lzr1W762vCpRggF6i4k44Gept4q7rryyexHHmH\ntkT/xGAUp3A+CLAa1IXxrq0eGD/ZSvPUjMYEVgyLMU/DsNKPmQRhbpnX5Y8QD6gW\nEaAgWJEYGmMFTZ11MUjOXt4B3b2P35gVI3sqIt0EWU4XUDs8qcfz5yPuzh6sB9r6\nsJhK6s1pvaMTK36bQkDyW9calmakejZ7qOhgTv08t1dtjo9Bel3gQYI3CuD9aKBr\nVqxwuOUvBBbDLwX8KF3gFG7NSVVWntxhmIW3iXNHT6+5zJ92ysAeDgjo94wdv4VF\nH76HlOXHK/U4PHT6K7afhj6CnxhvvEmiohDUwcjG6mIY6LNsS/7EoZ7+pDmCuml5\nbdnn/M57so58iZTgSjSQTZcCAwEAAQ==\n-----END PUBLIC KEY-----\n`;

  // RSA 私钥
  // const privateKeyPem = `-----BEGIN PRIVATE KEY-----
  // 私钥内容
  // -----END PRIVATE KEY-----`;

  // 使用公钥进行 RSA 加密
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
  let utf8Bytes = forge.util.encodeUtf8(jsonString);
  const byteArray = Array.from(utf8Bytes).map(char => char.charCodeAt(0));
  console.log("byteArrayToHex", byteArrayToHex(byteArray));
  const encryptedBytes = publicKey.encrypt(utf8Bytes);
  console.log("加密前数据:", encryptedBytes);
  const encryptedData = forge.util.encode64(encryptedBytes);
  console.log("加密后hex:", byteArrayToHex(Array.from(encryptedData).map(char => char.charCodeAt(0))));
  // 使用私钥进行 RSA 解密
  // const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
  // const decryptedBytes = privateKey.decrypt(forge.util.decode64(encryptedData));
  // const decryptedData = forge.util.decodeUtf8(decryptedBytes);

  // 输出加密和解密结果
  console.log("加密后数据:", encryptedData);
  // console.log("解密后数据:", decryptedData);

  // 更新请求的 Body 数据为加密后的内容
  pm.request.addHeader({
    key: 'Hook-Encryption-Parameters',
    value: encryptedData
  });
}