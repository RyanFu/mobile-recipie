import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { saveFavoriteRecipes } from '../lib/async-storage';

const styles = StyleSheet.create({
  outerView: {
    flex: 1,
    padding: 5,
    backgroundColor: '#F1F0EE'
  },
  splitView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  fieldArea: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 10
  },
  label: {
    fontFamily: 'IBMPlexSans-Medium',
    color: '#44346c',
    fontSize: 14,
    paddingBottom: 5
  },
  selector: {
    fontFamily: 'IBMPlexSans-Medium',
    borderColor: '#D0E2FF',
    borderWidth: 2,
    padding: 16,
    marginBottom: 25
  },
  quantityArea: {
    width: '40%'
  },
  textInput: {
    fontFamily: 'IBMPlexSans-Medium',
    flex: 1,
    borderColor: '#D0E2FF',
    borderWidth: 2,
    padding: 5,
    elevation: 2,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10
  },
  checkboxLabel: {
    fontFamily: 'IBMPlexSans-Light',
    fontSize: 13
  },
  textInputDisabled: {
    fontFamily: 'IBMPlexSans-Medium',
    backgroundColor: '#f4f4f4',
    color: '#999',
    flex: 1,
    padding: 16,
    elevation: 2,
    marginBottom: 25
  },
  updateButton: {
    backgroundColor: '#44346c',
    color: '#68ddea',
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 16,
    overflow: 'hidden',
    padding: 12,
    textAlign:'center',
    marginTop: 15
  },
  deleteButton: {
    backgroundColor: '#da1e28',
    color: '#FFFFFF',
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 16,
    overflow: 'hidden',
    padding: 12,
    textAlign:'center',
    marginTop: 15
  },
  logo: {
    marginTop: 12,
    width: '100%',
    height: 200,
  }
});


const DetailRecipes = (props) => {
  const clearItem = {id: '', name: '', description:'', ingredients:'', steps:'', imageUrl:''}  
  const [item, setItem] = React.useState(clearItem);

  const addToCookbook = () => {
    Alert.alert(
      'Cookbook',
      'Are you sure you want to add this recipe to cookbook?',
      [
        { text: 'Cancel' },
        { text: 'Add', onPress: () => saveRecipe() }
      ]
    )
  }
  
  const saveRecipe = () => {
    saveFavoriteRecipes(item)
    .then(() => {
      console.log('Recipe saved successfully in cookbook');
    })
    .catch(err => {
      console.log('Error saving recipe in cookbook', err);
    });
  };

 
  React.useEffect(() => {

    props.navigation.addListener('focus', () => {
      const item = props.route.params.item;
      let steps, ingredients = '';
      
      if(item.steps != undefined){
        steps = item.steps;
      }else{
        steps = item.content.preparationSteps.map((element, index)=>{
          return (index + 1) + ') ' + element;
        });
      } 

      if(item.ingredients != undefined){
        ingredients = item.ingredients;
      }else{
        ingredients = item.content.ingredientLines.map((element, index)=>{
          return element.category + '\n'
          + '- ' + element.wholeLine;
        });        
      }
      setItem({ 
        id: item.id || item['tracking-id'],
        name: item.name || item.display.displayName,
        description: item.description || item.seo.web['meta-tags'].description,
        ingredients: ingredients.join?ingredients.join('\n\n'):ingredients,
        steps: steps.join?steps.join('\n\n'):steps,
        imageUrl: item.imageUrl || item.display.images[0]
       });
    })
  }, []);

  return (
    
    <ScrollView style={styles.outerView}>
      <TouchableOpacity onPress={addToCookbook}>
        <Text style={styles.updateButton}>Add to Cookbook</Text>
      </TouchableOpacity>
      <Image
        style={styles.logo}
        source={{uri: item.imageUrl}}
        
      />
        <View style={styles.fieldArea}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.textInput}
            multiline={true}
            value={item.name}
            returnKeyType='send'
            enablesReturnKeyAutomatically={true}
            placeholder='e.g., 10'
          />
        </View>
        <View style={styles.fieldArea}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.textInput}
          multiline={true}
          value={item.description}
          returnKeyType='send'
          enablesReturnKeyAutomatically={true}
        />
         </View>
         <View style={styles.fieldArea}>
        <Text style={styles.label}>Ingredients List</Text>
        <TextInput
          style={styles.textInput}
          multiline={true}
          value={item.ingredients}
          returnKeyType='send'
          enablesReturnKeyAutomatically={true}
        />
         </View>
         <View style={styles.fieldArea}>
        <Text style={styles.label}>Preparation Steps</Text>
        <TextInput
          style={styles.textInput}
          multiline={true}
          value={item.steps}
          returnKeyType='send'
          enablesReturnKeyAutomatically={true}
        />
         </View>
      
    </ScrollView>
  );
};

export default DetailRecipes;
