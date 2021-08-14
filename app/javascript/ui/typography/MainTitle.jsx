import React, {
  useCallback,
  useMemo,
  useState,
} from 'react';

export default function MainTitle({ className = '', children }) {
  return (
    <View style={ tw('m-4 mt-8', className) }>
      <Text style={ tw('text-3xl font-thin text-gray-600') }>
        { children }
      </Text>
    </View>
  );
}
