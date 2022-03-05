"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Device = void 0;
const homebridge_mi_devices_1 = require("homebridge-mi-devices");
const device_constant_1 = require("./device.constant");
class Device {
    constructor(props) {
        this.PlugSetup = () => {
            this.PlugDevice.addCharacteristicListener(homebridge_mi_devices_1.Shared.hap.Characteristic.On, {
                get: {
                    defaultValue: 0,
                    formatter: (valueMapping) => valueMapping[device_constant_1.Specs.SwitchStatus] === device_constant_1.SwitchStatusCode.On
                        ? 1
                        : 0
                },
                set: {
                    property: 'set_power',
                    formatter: (value) => value
                        ? [device_constant_1.SwitchStatusCode.On]
                        : [device_constant_1.SwitchStatusCode.Off]
                },
            });
        };
        // Requirement
        this.name = props.identify.name;
        this.token = props.identify.token;
        this.address = props.identify.address;
        // Information
        this.informationService = new homebridge_mi_devices_1.Shared.hap.Service.AccessoryInformation()
            .setCharacteristic(homebridge_mi_devices_1.Shared.hap.Characteristic.Category, 8 /* SWITCH */)
            .setCharacteristic(homebridge_mi_devices_1.Shared.hap.Characteristic.Manufacturer, 'XiaoMi')
            .setCharacteristic(homebridge_mi_devices_1.Shared.hap.Characteristic.Model, 'M3');
        // AirPurifier
        this.PlugService = new homebridge_mi_devices_1.Shared.hap.Service.Switch(props.identify.name);
        this.PlugDevice = new homebridge_mi_devices_1.MIIODevice({ ...props, service: this.PlugService, specs: device_constant_1.Specs });
        this.PlugSetup();
    }
    /*
     * This method is optional to implement. It is called when HomeKit ask to identify the accessory.
     * Typical this only ever happens at the pairing process.
     */
    identify() {
        homebridge_mi_devices_1.Shared.log.info(`Identifying ${this.name} ${this.address}`);
    }
    /*
     * This method is called directly after creation of this instance.
     * It should return all services which should be added to the accessory.
     */
    getServices() {
        return [
            this.informationService,
            this.PlugService,
        ];
    }
}
exports.Device = Device;
