export default function SecondaryTitle({ className = "", children }) {
  return (
    <View style={tw("m-4", className)}>
      <Text style={tw("text-2xl font-thin text-gray-400")}>{children}</Text>
    </View>
  );
}
