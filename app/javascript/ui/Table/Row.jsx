export default function TableRow({ twp = '', ...props }) {
  return (
    <View style={ tw('px-4 py-2 flex flex-row border-b border-gray-300', twp) } {...props} />
  );
}
