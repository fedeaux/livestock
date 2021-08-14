export default function SidePanel({ children, isVisible, close, position='right', style={}, className='' }) {
  const finalStyle = {
    ...style,
    ...tw('absolute top-0 right-0 w-1/3 bg-gray-200 h-full'),
    ...tw(className)
  };

  if(!isVisible) {
    return null;
  }

  return (
    <View style={ finalStyle }>
      {children}
    </View>
  );
}
