import Button from "ui/controls/button";

const colorVariations = {
  default: {
    style: "bg-blue-600",
    textStyle: "text-blue-300",
  },
  success: {
    style: "bg-green-600",
    textStyle: "text-green-200",
  },
  danger: {
    style: "bg-red-600",
    textStyle: "text-red-200",
  },
  neutral: {
    style: "bg-gray-500",
    textStyle: "text-gray-200",
  },
};

const sizeVariations = {
  default: {
    style: "py-2 px-4",
    textStyle: "text-lg",
  },
  small: {
    style: "py-1 px-2",
    textStyle: "",
  },
  large: {
    style: "py-3 px-6",
    textStyle: "text-xl",
  },
};

export default function PrimaryButton({
  size = "default",
  color = "default",
  tws = "",
  ...props
}) {
  const sizeVariation = sizeVariations[size];
  const colorVariation = colorVariations[color];

  return (
    <Button
      {...props}
      style={tw(
        "rounded text-center",
        sizeVariation.style,
        colorVariation.style,
        tws
      )}
      textStyle={tw(sizeVariation.textStyle, colorVariation.textStyle)}
    />
  );
}
