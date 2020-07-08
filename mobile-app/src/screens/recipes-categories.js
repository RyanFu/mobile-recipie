import React from 'react';
import { StyleSheet, Text, TextInput, FlatList, View, TouchableOpacity, Alert, Image } from 'react-native';
import PickerSelect from 'react-native-picker-select';

import { categories } from '../lib/yummly';

const styles = StyleSheet.create({
  outerView: {
    backgroundColor: '#F1F0EE',
    width: '100%',
    height: '100%'
  },
  inputsView: {
    backgroundColor: '#F1F0EE',
    padding: 16,
    padding: 22,
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
    marginBottom: 10
  },
  searchResultText: {
    fontFamily: 'IBMPlexSans-Bold',
    padding: 10,
    color: '#44346c'
  },
  flatListView: {
    backgroundColor: '#F1F0EE',
    flex: 1,
    
    alignSelf: 'center'
    // justifyContent: 'space-between'
  },
  itemTouchable: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical:10,
    margin:5,
    borderBottomColor: '#dddddd',
    borderBottomWidth: 0.25
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemName: {
    fontSize: 18,
    fontFamily: 'IBMPlexSans-Medium',
    justifyContent: 'center',
    alignSelf: 'center',
    color: '#44346c'
  },
  logo: {
    width: 160,
    height: 160,
    alignSelf: 'center'
  }
});
//source={{uri: props.display.imageIcon}}
const RecipesCategories = function ({ route, navigation }) {
  const [query, setQuery] = React.useState({ type: 'Mexican', name: '' });
  const [items, setItems] = React.useState([]);
  const [info, setInfo] = React.useState('');

  React.useEffect(() => {
    navigation.addListener('focus', () => {
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
    })
  }, []);
  
  const Item = (props) => {
    // console.log("before click on item");
    // console.log(props);
    return (
      <TouchableOpacity style={styles.itemTouchable}
          onPress={() => { navigation.navigate("Cuisine's Recipes", { item : props.display.displayName });}}
      >
        <Image
        style={styles.logo}
        source={{uri: props.display.iconImage}}
        />
        <Text style={styles.itemName}>{props.display.displayName}</Text>
      </TouchableOpacity>
    );
  };


  return (
    <View style={styles.outerView}>

      <Text style={styles.searchResultText}>{info}</Text>

      <FlatList style={styles.flatListView}
        data={items}
        columnWrapperStyle={{justifyContent:'space-between' }}
        numColumns={2}
        renderItem={({ item }) => <Item {...item} />}
        keyExtractor={item => item.id || item['_id'] || item['tracking-id']}
      />
    </View>
  );
};

export default RecipesCategories;
