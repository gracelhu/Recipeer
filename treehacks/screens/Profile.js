import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import {getIngredients, getFriends} from '../convex/ConvexGetters';
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

// Import the styles from the CSS file
import styles from './ProfileStyles';

const Profile = ({ username }) => {
  const picSource = require('../pictures/gracelhu_pic.png'); // Assuming the image exists
  const users = useQuery(api.tasks.userList) || [];
  const ingredients = getIngredients("gracelhu", users);
  const friends = getFriends("gracelhu", users);

  const topSectionBackgroundColor = '#EBE9E9';
  const bottomSectionBackgroundColor = '#FFFFFF';
  return (
    <View>
      <View className="profileTop" style={[styles.container, { topSectionBackgroundColor }]}>
      <Image
        source={picSource}
        style={styles.profileImage}
      />
      <Text style={[styles.headingText, { color: '#333' }]}>
        @gracelhu
      </Text>
      </View>
      <View className="profileBottom" style={[styles.container, { bottomSectionBackgroundColor }]}>
        <Text style={[styles.headingText, { color: '#333' }]}>Ingredients</Text>
        {ingredients.map((ingredient, index) => (
            <Text key={index}>{ingredient}</Text>
        ))}
        <Text style={[styles.headingText, { color: '#333' }]}>Friends</Text>
        {friends.map((friend, index) => (
            <Text key={index}>{friend}</Text>
        ))}
      </View>
    </View>
  );
};

export default Profile;