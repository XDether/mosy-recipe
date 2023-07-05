import { Text } from "react-native";
import { Camera, useCameraDevices } from "react-native-vision-camera";

export default function CameraTest()
{
    const devices = useCameraDevices();
    const device = devices.back
    if (device == null) return <Text>null</Text>
    return (
        <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        />
    )
}