# homebridge-xiaomi-plug-m3

HomeBridge Plugin for XiaoMi Plug M3

HomeBridge 小米智能插座 Wi-Fi 版

## 对应特征
- chuangmi.plug.m3
- 小米智能插座 Wi-Fi 版
- https://item.jd.com/100003180749.html

其余型号无条件测试，不保证可用性

## 安装
```bash
npm i homebridge-xiaomi-plug-m3@latest
```

## 配置
```json
{
  "platforms": [
    {
      "platform": "XiaoMiPlugM3",
      "devices": [
        {
          "name": "Name",
          "address": "IP Address",
          "token": "Token"
        }
      ]
    }
  ]
}
```

## 参考
http://miot-spec.org/miot-spec-v2/instances?status=all
https://miot-spec.org/miot-spec-v2/instance?type=urn:miot-spec-v2:device:outlet:0000A002:chuangmi-m3:1
https://github.com/syssi/xiaomi_airpurifier/issues/72#issuecomment-711722428
