import React, { useEffect, useState } from 'react'
import styles from './styles'
import { View, Text, TouchableOpacity, Dimensions, BackHandler } from 'react-native' 
import {promptPath} from '../../helper/prompts'
import { EventsAction } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'


const StartScreen = props => {
  const fileName = 'all_prompts'
  const dispatch = useDispatch()
  const {width, height} = Dimensions.get('window')
  const [promptData, setPromptData] = useState([])
  const [promptToDisplay, setPromptToDisplay] = useState([])
  const Level = 13
  const [started, userLevel, userPoints, tempSavedPrompt, savedPrompts] = useSelector(({ Events }) => [
    Events.started,
    Events.userLevel,
    Events.userPoints,
    Events.tempSavedPrompt,
    Events.savedPrompts,
  ])

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
  }, []);

  const handleBackButton = () => {
    return true;
  }
  
  useEffect(() => {
    loadPrompts(fileName)
  },[tempSavedPrompt, userLevel, promptToDisplay])

  const loadPrompts = (path) => {
    let currentPromptData
    if(userLevel){
      currentPromptData = promptPath[path].filter((item) => item.level == userLevel)
      if(tempSavedPrompt.length > 0){
        setPromptToDisplay(tempSavedPrompt[0].userTypedPrompt)
      }else{
        setPromptToDisplay(currentPromptData[0]?.title)  
      }
      setPromptData(currentPromptData)
    }else{
      currentPromptData = promptPath[path].filter((item) => item.level == 1)
      setPromptData(currentPromptData)
      setPromptToDisplay(currentPromptData[0]?.title)  
      dispatch(EventsAction.SetUserLevel(1))
    }
  }

  return(
    <View style={styles.root}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{'Level '+ userLevel}</Text>
      </View>
      { started && (<View style={[styles.headerContainer,
          {top: 0, right: 0, position: 'absolute', marginRight: 24,}]}>
        <Text style={styles.pointText}>
          {tempSavedPrompt.length > 0 ? 
            (userPoints+tempSavedPrompt[0].points == 1 ? (userPoints+tempSavedPrompt[0].points)+' pt' : (userPoints+tempSavedPrompt[0].points)+' pts')
            :userPoints == 1 ? userPoints+' pt' : userPoints+' pts'}
        </Text>
      </View>)}
      <View style={{flex: 1, marginHorizontal: 24,}}>
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <Text style={styles.contentText}> 
            {tempSavedPrompt.length > 0 ? promptToDisplay : promptToDisplay + ' _____'}
          </Text>
        </View>
        <View style={{flex:0, justifyContent:'flex-end'}}>
        <TouchableOpacity
						activeOpacity={1}
            style={styles.buttonContainer}
            onPress={() => {
              if(!started){
                dispatch(EventsAction.SetStarted(true))
              }
              props.navigation.navigate('EditScreen',{
                promptData,
                promptToDisplay
              })
            }}>
            <Text style={styles.buttonText}>{tempSavedPrompt.length > 0?'Continue':'Start'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default StartScreen