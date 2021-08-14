export default function TableCell({ textColor='text-gray-600', twp='', ...props }) {
  return (
    <Text style={ tw('text-center', textColor, twp) } {...props} />
  );
}
