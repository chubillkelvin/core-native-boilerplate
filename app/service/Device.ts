import {Dimensions, Platform} from "react-native";
import DeviceInfo from "react-native-device-info";

export class Device {
    private static deviceHasNotch = false;
    private static deviceId = "";
    private static deviceOS = "";
    private static deviceModel = "";
    private static deviceName = "";
    private static deviceCarrier = "";
    private static deviceManufacturer = "";
    private static dimensions = Dimensions.get("window");

    static async getDeviceInfo() {
        /*
         * This part blocks "yarn ios" to function normally on an iOS emulator.
         * Existing issue (closed, but seem to be unsolved): https://github.com/react-native-community/react-native-device-info/issues/793#issue-494557857
         * New issue based on our project: https://github.com/react-native-community/react-native-device-info/issues/931
         */
        if (__DEV__ && Platform.OS === "ios") {
            Device.deviceHasNotch = true;
            Device.deviceId = "test";
            Device.deviceModel = "emulator";
            Device.deviceName = "emulator";
            Device.deviceCarrier = "carrier";
        } else {
            Device.deviceHasNotch = DeviceInfo.hasNotch();
            Device.deviceId = DeviceInfo.getUniqueId();
            Device.deviceModel = DeviceInfo.getDeviceId();
            Device.deviceName = await DeviceInfo.getDeviceName();
            Device.deviceCarrier = await DeviceInfo.getCarrier();
        }
        Device.deviceOS = Platform.OS + " " + Platform.Version;
        Device.deviceManufacturer = await DeviceInfo.getManufacturer();
    }

    static hasNotch() {
        return Device.deviceHasNotch;
    }

    static id() {
        return Device.deviceId;
    }

    static os() {
        return Device.deviceOS;
    }

    static model() {
        return Device.deviceModel;
    }

    static username() {
        return Device.deviceName;
    }

    static carrier() {
        return Device.deviceCarrier;
    }

    static manufacturer() {
        return Device.deviceManufacturer;
    }
}
