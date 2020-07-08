import React from 'react';
import { StyleSheet, Text, TextInput, FlatList, View, TouchableOpacity, Alert, Image } from 'react-native';
import PickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
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
    marginBottom: 10
  },
  button: {
    backgroundColor: '#44346c',
    color: '#68ddea',
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 16,
    overflow: 'hidden',
    padding: 12,
    textAlign:'center',
    marginTop: 15
  },
  searchResultText: {
    fontFamily: 'IBMPlexSans-Bold',
    padding: 10,
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
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal:10,
    marginVertical:5,
    justifyContent: 'flex-start',
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

const CategoriesList = (props) =>  {
    const navigation = useNavigation();
  const [query, setQuery] = React.useState({ q: props.route.params.item });
  const [items, setItems] = React.useState([]);
  const [info, setInfo] = React.useState('');
  console.log("You are here")
    console.log(props.route.params.item);
    console.log(query);

    React.useEffect(() => {
        navigation.addListener('focus', () => {
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
        })
      }, []);

    
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

  const searchItem = () => { //need to fire on load with query value set
    const payload = {
      ...query //need to assign query value to category clicked
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

  return (
    <View style={styles.outerView}>
      <Text style={styles.searchResultText}>{info}</Text>

      <FlatList style={styles.flatListView}
        data={items}
        renderItem={({ item }) => <Item {...item} />}
        keyExtractor={item => item.id || item['_id'] || item['tracking-id']}
      />
    </View>
  );
};

export default CategoriesList;