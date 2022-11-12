import React, {useEffect, useState, useRef} from 'react'
import {View, Text, TouchableOpacity, BackHandler} from 'react-native'
import {SwiperFlatList} from 'react-native-swiper-flatlist'
import Colors from '../../theme/Colors'
import Fonts from '../../theme/Fonts'
import styles from './styles'

const IntroScreen = props => {
	const scrollRef = useRef(null);
  
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
  }, []);

  const handleBackButton = () => {
    return true;
  }

  return (
    <View style={styles.root}>
      <SwiperFlatList
        disableGesture={true}
        ref={scrollRef}>

        <View style={styles.contentContainerNew}>
					<View style={styles.descriptionContainer}>
						<Text>
						<Text style={styles.titleText}>
							Alliterate
						</Text>
						<Text style={[styles.description, {fontWeight:'100'}]}>
							{' (verb) '}
						</Text>
						<Text style={[styles.description, {fontFamily: Fonts.fontFamily.medium}]}>
							to use words beginning with the same sound or letter together in a sentence
						</Text>
						</Text>
					</View>
          <View style={{flex:0,}}>
          <TouchableOpacity
					activeOpacity={1}
            style={styles.buttonContainer}
            onPress={() => {
							scrollRef.current.scrollToIndex({
								index: 1,
								animated: false,
							});
            }}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
					</View>
        </View>

				<View style={styles.contentContainerNew}>
					<View style={styles.descriptionContainer}>
						<Text style={styles.titleText}>
							Example
						</Text>
						<Text>
						<Text style={[styles.description, {fontWeight:'300'}]}>
							Wage war with whacky wit wielding words while weaving a wouldbe world
						</Text>
						</Text>
					</View>
          <View style={{flex:0,}}>
          <TouchableOpacity
						activeOpacity={1}
            style={styles.buttonContainer}
            onPress={() => {
							scrollRef.current.scrollToIndex({
								index: 2,
								animated: false,
							});
            }}>
            <Text style={styles.buttonText}>See scoring</Text>
          </TouchableOpacity>
					</View>
        </View>

				<View style={styles.contentContainerNew}>
					<View style={styles.descriptionContainer}>
						<Text style={styles.titleText}>
							Example
						</Text>
						<Text>
						<Text style={[styles.description, {fontWeight:'300', color:Colors.green}]}>
							Wage war with whacky wit wielding words while weaving a wouldbe world
						</Text>
						<Text style={[styles.description, {fontWeight:'300', color:Colors.red}]}>
							{' a '}
						</Text>
						<Text style={[styles.description, {fontWeight:'300', color:Colors.green}]}>
							wouldbe world
						</Text>
						</Text>
						<View style={{marginTop:44,}}>
							<Text style={{fontFamily: Fonts.fontFamily.regular, fontSize: 18,lineHeight: 43.2,
    						letterSpacing: -0.3, fontWeight:'300', color:Colors.green}}>
								11 alliterated words + 11
							</Text>
							<Text style={{fontFamily: Fonts.fontFamily.regular, fontSize: 18,lineHeight: 43.2,
    						letterSpacing: -0.3, fontWeight:'300', color:Colors.red}}>
								1 other word - 4
							</Text>
						</View>
						<View style={{borderBottomColor: '#FFF', borderBottomWidth: 1, width: '75%'}}></View>
						<Text style={{fontFamily: Fonts.fontFamily.regular, fontSize: 18,lineHeight: 43.2,
    						letterSpacing: -0.3, fontWeight:'300', color:'#FFF'}}>
								+7 point
						</Text>
					</View>
          <View style={{flex:0,}}>
          <TouchableOpacity
						activeOpacity={1}
            style={styles.buttonContainer}
            onPress={() => props.navigation.navigate('StartScreen')}>
            <Text style={styles.buttonText}>Time to try!</Text>
          </TouchableOpacity>
					</View>
        </View>

      </SwiperFlatList>
    </View>
	)
}

export default IntroScreen