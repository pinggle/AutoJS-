"ui";

ui.statusBarColor("#ffffff");
ui.layout(
    <frame background="#d9edf7">
        <vertical align="top" margin="5">
          
            <text text="待加密、解密的文本:" size="8" color="#3a87ad" />
            <input id="aym" color="#0f3f94" text="你好" gravity="left" bg="#ffffff" size="9" h="100" w="360" />
            <linear>
                <button h="35" w="60" id="aen" text="AES加密" bg="#eb8f00" size="11" margin="0 0 0 105" style="Widget.AppCompat.Button.Colored" />
                <button h="35" w="60" id="ade" text="AES解密" bg="#eb8f00" size="11" margin="0 0 0 10" style="Widget.AppCompat.Button.Colored" />
            </linear>
            <text text="AES加密、解密转换结果(base64了):" size="8" color="#3a87ad" />
            <input id="ajg" color="#0f3f94" gravity="left" bg="#ffffff" text="" size="9" h="100" w="360" />
            
        </vertical>
    </frame>
);

var AES_Padding = "PKCS7Padding";  //PKCS5Padding/PKCS7Padding/NoPadding/ISO10126Padding
var AES_Model="ECB";  //ECB/CBC/CTR/OFB/CFB
var AES_Key="1234567898765432";  //16位
var AES_Aws="128";
var AES_OutType="base64";  //base64,Hex
var AES_Chat="UTF-8";  //UTF-8/gb2312/gbk/gb18030
ui.aen.click(() => {
    ui.ajg.text(AesEncrypt(ui.aym.text(),AES_Key));
});
ui.ade.click(() => {
    ui.aym.text(AesDecrypt(ui.ajg.text(),AES_Key));
});


function AesEncrypt(souce,passkey)
{
    var result="";
    var errstr="";
    var zx = 1;

    if(passkey==undefined || passkey=="") passkey=AES_Key;
    var text = java.lang.String(souce).getBytes(AES_Chat);
    var mm = java.lang.String(passkey).getBytes(AES_Chat);
    if (AES_Padding == "NoPadding" && (AES_Model == "ECB" || AES_Model == "CBC")) {
        if (text.length % 16 != 0) {
            //输出错误
            errstr=AES_Model + "/" + AES_Padding + "要加密的内容长度必须是16的整数倍";
            zx = 0;
        }
    }
    if (mm.length != AES_Aws / 8) {
        //输出错误
        errstr="密码长度必须为" + AES_Aws / 8 + "位!"; 
        zx = 0;
    }
    var iv = "";
    if (AES_Model != "ECB") {
        iv = java.lang.String(passkey).getBytes();
        if (iv.length != AES_Aws / 8) {
            //输出错误
            errstr="偏移量长度必须为" + AES_Aws / 8 + "位!";
            zx = 0;
        }
    }
    var lx = "AES/" + AES_Model + "/" + AES_Padding;

    if (zx == 1) {
        var jg = aesEncode(text, mm, lx, iv);
        if (AES_OutType == "base64") {
            result=java.lang.String(android.util.Base64.encode(jg, 0));
        } else if (AES_OutType == "Hex") {
            result=bytestohexstring(jg);
        } else {
            errstr="输出形式未选择";
        }
    }
    //根据需要可选择是否输入错误内容
    return result + errstr;
}

function AesDecrypt(souce,passkey)
{
    var result="";
    var errstr="";
    var zx = 1;
    var text="";

    if(passkey==undefined || passkey=="") passkey=AES_Key;
    if (AES_OutType == "base64") {
        text = android.util.Base64.decode(souce, 0);
    } else if (AES_OutType == "Hex") {
        text = hexstringtobytes(souce);
    } else {
        errstr="输出形式未选择"; 
        zx = 0;
    }

    var mm =java.lang.String(passkey).getBytes(AES_Chat);
    if (mm.length != AES_Aws / 8) {
        errstr="密码长度必须为" + AES_Aws / 8 + "位!";
        zx = 0;
    }
    var iv = "";
    if (AES_Model != "ECB") {
        var iv =java.lang.String(AES_Key).getBytes();
        if (iv.length != AES_Aws / 8) {
            errstr="偏移长度必须为" + AES_Aws / 8 + "位!";
            zx = 0;
        }
    }
    var lx ="AES/" + AES_Model + "/" + AES_Padding;
    if (zx == 1) {
        try {
            var jg = aesDecode(text, mm, lx, iv);
            result=java.lang.String(jg, AES_Chat);
        } catch (e) {
            errstr="解密错误!";
        }
    }
    //根据需要可选择是否输入错误内容
    return result + errstr;
}
function aesEncode(byteContent, password, lx, iv) {
    var key = javax.crypto.spec.SecretKeySpec(password, "AES");
    var cipher = javax.crypto.Cipher.getInstance(lx);
    if (AES_Model == "ECB") {
        cipher.init(javax.crypto.Cipher.ENCRYPT_MODE, key);
    } else {
        cipher.init(javax.crypto.Cipher.ENCRYPT_MODE, key, javax.crypto.spec.IvParameterSpec(iv));
    }
    return cipher.doFinal(byteContent);
}
function aesDecode(byteContent, password, lx, iv) {
    var key = javax.crypto.spec.SecretKeySpec(password, "AES");
    var cipher = javax.crypto.Cipher.getInstance(lx);
    if (AES_Model == "ECB") {
        cipher.init(javax.crypto.Cipher.DECRYPT_MODE, key);
    } else {
        cipher.init(javax.crypto.Cipher.DECRYPT_MODE, key, javax.crypto.spec.IvParameterSpec(iv));
    }
    return cipher.doFinal(byteContent);
}

function bytestohexstring(bytes) {
    var val = "";
    for (var i = 0; i < bytes.length; i++) {
        var tmp = bytes[i];
        if (tmp < 0) {
            tmp = 256 + tmp;
        }
        tmp = tmp.toString(16);
        if ((tmp + "").length == 1) {
            tmp = "0" + tmp;
        }
        val += tmp;
    }
    return val;
}
function hexstringtobytes(str) {
    var val = [];
    str = str.split("");
    for (var i = 0; i < str.length; i++) {
        var tmp = "" + str[i] + str[i + 1];
        tmp = parseInt(tmp, 16);
        if (tmp <= 127) {
            val[i / 2] = tmp;
        } else {
            val[i / 2] = tmp - 256;
        }
    }
    return val;
}