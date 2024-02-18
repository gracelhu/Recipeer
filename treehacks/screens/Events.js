import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import Markdown from 'react-native-markdown-display';

const copy = `
**Chinese-inspired dishes with your combined ingredients:**
**Dish 1:
Pork Stir-fry with Bell Peppers and Milk Rice**
Ingredients:\n
    1/2 lb ground pork
    1 red bell pepper, sliced
    1 green bell pepper, sliced
    1 clove garlic, minced
    1 cup cooked rice
    1/2 cup milk
    1 egg, beaten
    2 tbsp cooking oil
    Salt and pepper to taste
Instructions:\n
    Heat oil in a wok or large pan over medium-high heat.
    Add the pork and cook until browned.
    Add the garlic and bell peppers, stir-fry for 2-3 minutes until softened.
    In a separate bowl, whisk together the milk and egg.
    Pour the milk-egg mixture into the pan and scramble with the pork and vegetables.
    Add the cooked rice and stir-fry until heated through and combined.
    Season with salt and pepper to taste.
    Serve hot with additional vegetables or fried egg (optional).
`;

const Events = () => {
    // const md = new Remarkable();
    // const TextWithMarkdown = ({ markdown }) => {
        
    //     return <Text dangerouslySetInnerHTML={{ __html: md.render(markdown) }} />;
    //   };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
      <Markdown>
            {copy}
          </Markdown>



        {/* <Text style={styles.text}>
        Chinese-inspired dishes with your combined ingredients:
Dish 1: Pork Stir-fry with Bell Peppers and Milk Rice
Ingredients:\n
    1/2 lb ground pork
    1 red bell pepper, sliced
    1 green bell pepper, sliced
    1 clove garlic, minced
    1 cup cooked rice
    1/2 cup milk
    1 egg, beaten
    2 tbsp cooking oil
    Salt and pepper to taste
Instructions:
    Heat oil in a wok or large pan over medium-high heat.
    Add the pork and cook until browned.
    Add the garlic and bell peppers, stir-fry for 2-3 minutes until softened.
    In a separate bowl, whisk together the milk and egg.
    Pour the milk-egg mixture into the pan and scramble with the pork and vegetables.
    Add the cooked rice and stir-fry until heated through and combined.
    Season with salt and pepper to taste.
    Serve hot with additional vegetables or fried egg (optional).
        </Text> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: '#ffc0a2',
    marginHorizontal: 20,

  },
  text: {
    fontSize: 18,
    marginHorizontal: 20,
    marginVertical: 20,
    
  },
});

export default Events;