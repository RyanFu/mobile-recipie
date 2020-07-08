import React from 'react';
import { StyleSheet, Text, TextInput, FlatList, View, TouchableOpacity, Alert, Image } from 'react-native';
import PickerSelect from 'react-native-picker-select';

import { search, categories } from '../lib/yummly';

const styles = StyleSheet.create({
  outerView: {
    backgroundColor: '#F1F0EE',
    width: '100%',
    height: '100%'
  },
  inputsView: {
    backgroundColor: '#F1F0EE',
    padding: 16
  },
  label: {
    fontFamily: 'IBMPlexSans-Medium',
    color: '#44346c',
    fontSize: 14,
    paddingBottom: 5
  },
  selector: {
    fontFamily: 'IBMPlexSans-Medium',
    backgroundColor: '#fff',
    padding: 8,
    marginBottom: 10
  },
  textInput: {
    fontFamily: 'IBMPlexSans-Medium',
    backgroundColor: '#fff',
    padding: 8,
    marginBottom: 5
  },
  button: {
    backgroundColor: '#44346c',
    color: '#68ddea',
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 16,
    overflow: 'hidden',
    padding: 12,
    textAlign:'center',
    marginTop: 8
  },
  searchResultText: {
    fontFamily: 'IBMPlexSans-Bold',
    paddingHorizontal: 10,
    color: '#44346c'
  },
  flatListView: { //background container
    backgroundColor: '#F1F0EE',
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    flex: 1,
    // flexDirection: 'row',
  },
  itemTouchable: {
    flexDirection: 'column',
    padding: 15,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    marginHorizontal:10,
    marginVertical:5,
    alignItems: 'stretch',
    borderBottomColor: '#dddddd',
    borderBottomWidth: 0.25
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemName: {
    fontSize: 14,
    color: '#44346c',
    fontFamily: 'IBMPlexSans-Medium',
  },
  itemDescription: {
    fontSize: 12,
    fontFamily: 'IBMPlexSans-Medium',
    color: 'gray'
  },
  logo: { 
    justifyContent: 'flex-start',
    padding: 2,
    width: "100%",
    height: 150
  }
});

const SearchRecipes = function ({ route, navigation }) {
  const [query, setQuery] = React.useState({ kcal: '', q: 'Chicken and Soup' });
  const [items, setItems] = React.useState([]);
  const [info, setInfo] = React.useState('');

  const Item = (props) => {
    return (
      <TouchableOpacity style={styles.itemTouchable}
          onPress={() => { navigation.navigate('Recipe Details', { item: props }); }}>
      
        <View style={styles.itemView}>
        <Image
        style={styles.logo}
        source={{uri: props.display.images[0]}}  
        />

        </View>
        <Text style={styles.itemName}>{props.display.displayName}</Text> 
        <Text style={styles.itemDescription}>{props.seo.web['meta-tags'].description}</Text>
      </TouchableOpacity>

    );
  };

  const searchItem = () => {
    const payload = {
      ...query
    };

    search(payload)
      .then((results) => {
        setInfo(`${results.seo.web['display-title']}: ${results.feed.length} result(s)`)
        setItems(results.feed);
      })
      .catch(err => {
        console.log(err);
        Alert.alert('ERROR', 'Please try again. If the problem persists contact an administrator.', [{text: 'OK'}]);
      });
  };

  const searchCuisines = () => {
    const payload = {
      ...query
    };

    categories(payload)
      .then((results) => {
        let cuisines = results['browse-categories'].filter((cat)=>{
          if(cat['tracking-id'] == 'cuisines'){
            return true;
          }
        }); 
        setInfo(`${cuisines[0].display.categoryTopics.length} result(s)`)
        setItems(cuisines[0].display.categoryTopics);
      })
      .catch(err => {
        console.log(err);
        Alert.alert('ERROR', 'Please try again. If the problem persists contact an administrator.', [{text: 'OK'}]);
      });
  };

  return (
    <View style={styles.outerView}>
      <View style={styles.inputsView}>
        
        <Text style={styles.label}>Calories Limit</Text>
        <TextInput
          style={styles.textInput}
          value={query.kcal}
          onChangeText={(t) => setQuery({ ...query, kcal: t})}
          onSubmitEditing={searchItem}
          returnKeyType='send'
          enablesReturnKeyAutomatically={true}
          placeholder='e.g., 7000'
          blurOnSubmit={false}
        />
        <Text style={styles.label}>Ingredients</Text>
        <TextInput
          style={styles.textInput}
          value={query.q}
          onChangeText={(t) => setQuery({ ...query, q: t})}
          onSubmitEditing={searchItem}
          returnKeyType='send'
          enablesReturnKeyAutomatically={true}
          placeholder='e.g., Chicken and soup'
          blurOnSubmit={false}
        />
        <TouchableOpacity onPress={searchItem}>
          <Text style={styles.button}>Search</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.searchResultText}>{info}</Text>

      <FlatList style={styles.flatListView}
        data={items}
        renderItem={({ item }) => <Item {...item} />}
        keyExtractor={item => item.id || item['_id'] || item['tracking-id']}
      />
    </View>
  );
};

export default SearchRecipes;
