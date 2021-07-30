import React, {
  useCallback,
  useMemo,
  useState,
} from "react";

export default function MainTitle({ className = "", children }) {
  return (
    <Text style={ tw("text-lg mt-4 mb-2 font-semibold text-gray-600", className) }>
      { children }
    </Text>
  );
}
