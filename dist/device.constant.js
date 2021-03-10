"use strict";
// 特性信息
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwitchStatusCode = exports.Specs = void 0;
exports.Specs = {
    // 状态
    SwitchStatus: 'power',
    // 温度
    SwitchTemperature: 'temperature',
    // 照明
    SwitchIndicatorLight: 'wifi_led',
};
// 状态枚举
var SwitchStatusCode;
(function (SwitchStatusCode) {
    SwitchStatusCode["On"] = "on";
    SwitchStatusCode["Off"] = "off";
})(SwitchStatusCode = exports.SwitchStatusCode || (exports.SwitchStatusCode = {}));
