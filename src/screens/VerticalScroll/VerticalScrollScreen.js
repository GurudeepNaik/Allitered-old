import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Share, FlatList, SafeAreaView, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';
import { useSelector } from 'react-redux';

const VerticalScroll = props => {


  const [ savedPrompts ] = useSelector( ({ Events }) => [ Events.savedPrompts ] );


  const array = savedPrompts.sort( (a, b) => {
    if ( parseInt( a.promptId ) > parseInt( b.promptId ) ) {
      return -1;
    } else {
      return 1;
    }
  });


  const handleBackButtonClick = () => {
    props.navigation.goBack();
    return true;
  };


  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
  }, []);


  const handleShare = async each => {
    try {
      await Share.share({
        message: each.promptTitle,
      });
    } catch ( error ) {
      alert( error.message );
    }
  };


  const renderItem = ( { item } ) => {
    if ( item.type === 'daily' ) {
      let date = new Date(item.date).toDateString().split(' ');
      date.pop();
      let num=date[date.length-1];
      console.log(num);
      date = date.join(' ');
      const nth = function(d) {
        if (d > 3 && d < 21) return 'th';
        switch (d % 10) {
          case 1:  return "st";
          case 2:  return "nd";
          case 3:  return "rd";
          default: return "th";
        }
      }
      date=date+nth(parseInt(num));

      return (
        <View style={ styles.view }>
          <Text style={ styles.date }>{date}</Text>
          <Text style={ styles.text }>{item.promptTitle}</Text>
          <TouchableOpacity onPress={ () => handleShare(item) }>
            <Icon name="share-social-outline" size={15} color="#fff" style={ styles.share } />
          </TouchableOpacity>
        </View>
      );
    } else {
      
      return (
        <View style={styles.view}>
          <Text style={styles.level}>{item.promptId}</Text>
          <Text style={styles.text}>{item.promptTitle}</Text>
          <TouchableOpacity onPress={() => handleShare(item)}>
            <Icon name="share-social-outline" size={15} color="#fff" style={ styles.share } />
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Icon name="arrow-back" size={25} color="#fff" style={[styles.arrowright, {transform: [{rotate: '-180deg'}]}]}/>
        </TouchableOpacity>
      </View>
      <SafeAreaView style={styles.scrollView}>
        <FlatList data={ array } renderItem={ renderItem } keyExtractor={item => item.id}/>
      </SafeAreaView>
    </View>
  );
};

export default VerticalScroll;
