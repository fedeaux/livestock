import React, {
  useCallback,
  useMemo,
  useState,
} from "react";
import MainTitle from "ui/typography/MainTitle";

export default function AnalyticsIndex() {
  return (
    <View style={ tw("p-4") }>
      <MainTitle>
        Analytics
      </MainTitle>
    </View>
  );
}
