import { TextInput, TouchableOpacity, Modal as RNModal } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Modal({
  showingModal,
  hideModal,
  children,
  title = "",
  ...props
}) {
  return (
    <RNModal animationType="fade" transparent={true} visible={showingModal}>
      <View style={tw("p-4 h-full flex")}>
        <View
          style={tw("rounded p-4 bg-gray-900 bg-opacity-90 flex-grow flex")}
        >
          <View style={tw("min-h-14")}>
            <Text style={tw("text-center text-blue-300 pt-1")}>{title}</Text>
            <TouchableOpacity
              style={tw("mr-4 pt-1 text-blue-200 absolute top-0 right-0")}
              onPress={hideModal}
            >
              <Icon size={18} name="close" color={getColor("blue-200")} />
            </TouchableOpacity>
          </View>
          <View>{children}</View>
        </View>
      </View>
    </RNModal>
  );
}
