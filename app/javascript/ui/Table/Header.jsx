export default function TableHeader({ twp = "", ...props }) {
  return (
    <Text style={ tw("text-gray-400 font-bold text-center", twp) } {...props} />
  );
}
