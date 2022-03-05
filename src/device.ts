import { AccessoryPlugin, Service, Categories } from 'homebridge'
import { MiIdentify, Shared, MIIODevice } from 'homebridge-mi-devices'
import { Specs, SwitchStatusCode } from './device.constant'

type Props = {
  identify: MiIdentify
}

export class Device implements AccessoryPlugin {

  // Requirement
  private readonly name: string
  private readonly token: string
  private readonly address: string
  // Services
  private readonly informationService: Service
  private readonly PlugService: Service
  // Device
  private PlugDevice: MIIODevice

  constructor (props: Props) {
    // Requirement
    this.name = props.identify.name
    this.token = props.identify.token
    this.address = props.identify.address
    // Information
    this.informationService = new Shared.hap.Service.AccessoryInformation()
      .setCharacteristic(Shared.hap.Characteristic.Category, Categories.SWITCH)
      .setCharacteristic(Shared.hap.Characteristic.Manufacturer, 'XiaoMi')
      .setCharacteristic(Shared.hap.Characteristic.Model, 'M3')
    // AirPurifier
    this.PlugService = new Shared.hap.Service.Switch(props.identify.name)
    this.PlugDevice = new MIIODevice({ ...props, service: this.PlugService, specs: Specs })
    this.PlugSetup()
  }

  PlugSetup = () => {
    this.PlugDevice.addCharacteristicListener(Shared.hap.Characteristic.On, {
      get: {
        defaultValue: 0,
        formatter: (valueMapping) => valueMapping[Specs.SwitchStatus] === SwitchStatusCode.On
          ? 1
          : 0
      },
      set: {
        property: 'set_power',
        formatter: (value) => value
          ? [SwitchStatusCode.On]
          : [SwitchStatusCode.Off]
      },
    })
  }

  /*
   * This method is optional to implement. It is called when HomeKit ask to identify the accessory.
   * Typical this only ever happens at the pairing process.
   */
  identify (): void {
    Shared.log.info(`Identifying ${this.name} ${this.address}`)
  }

  /*
   * This method is called directly after creation of this instance.
   * It should return all services which should be added to the accessory.
   */
  getServices (): Service[] {
    return [
      this.informationService,
      this.PlugService,
    ]
  }

}
