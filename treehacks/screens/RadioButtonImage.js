import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';

const RadioButtonImage = ({
  imageUrl,
  onPress,
  value,
  selectedValue,
  disabled,
  imageStyle,
  textStyle,
}) => {
  const [isSelected, setIsSelected] = useState(value === selectedValue);

  const handlePress = () => {
    if (!disabled && onPress) {
      onPress(value);
      setIsSelected(!isSelected);
    }
  };

  const opacity = isSelected ? 0.5 : 1;

  return (
    <TouchableOpacity onPress={handlePress} disabled={disabled}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={{ uri: imageUrl }} style={[{ opacity }, imageStyle]} />
        {textStyle && <Text style={textStyle}>{value}</Text>}
      </View>
    </TouchableOpacity>
  );
};

export default RadioButtonImage;
