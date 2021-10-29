import { TouchableOpacity } from "react-native";

export default function Button({
  label,
  onClick,
  disabled = false,
  block = false,
  textStyle = {},
  style = "",
  to,
  ...props
}) {
  const disabledStyle = disabled ? "opacity-50" : "";
  const blockStyle = block ? "flex-grow" : "";

  const onPress = useCallback((e) => {
    if (disabled) return;

    if (onClick) {
      onClick(e);
    }
  });

  return (
    <TouchableOpacity
      {...props}
      onPress={onPress}
      style={tw(disabledStyle, blockStyle, style)}
    >
      <Text style={tw(textStyle, "text-center")}>{label}</Text>
    </TouchableOpacity>
  );
}
