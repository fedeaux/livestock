export default function TertiaryTitle({ className = "", children }) {
  return (
    <View style={tw("my-2", className)}>
      <Text style={tw("text-xl font-thin text-gray-400")}>{children}</Text>
    </View>
  );
}
