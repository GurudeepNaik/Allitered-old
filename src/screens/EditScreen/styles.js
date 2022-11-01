import { StyleSheet } from 'react-native'
import Colors from '../../theme/Colors'
import Fonts from '../../theme/Fonts'
import { Dimensions } from 'react-native' 
const {width} = Dimensions.get('window')

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000',
  },
  headerContainer: {
    backgroundColor:'red',
    flex: 0,
    marginTop: 12,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center'
  },
  headerText: {
    fontFamily: Fonts.fontFamily.bold,
    fontWeight: Fonts.weight.bold,
    fontSize: 28,
    color: '#FFF',
    lineHeight: 43.2,
    letterSpacing: -0.3,
    textAlign: 'center'
  },
  pointsContainer: {
    top: 0,
    right: 0,
    position: 'absolute',
    marginRight: 24,
    alignItems:'center',
    justifyContent:'center'
  },
  pointsText: {
    fontFamily: Fonts.fontFamily.regular,
    fontWeight: Fonts.weight.normal,
    fontSize: 18,
    color: '#FFF',
    lineHeight: 43.2,
    letterSpacing: -0.3,
  },
  saveText: {
    fontFamily: Fonts.fontFamily.regular,
    fontWeight: Fonts.weight.normal,
    fontSize: 16,
    color: Colors.button_grey,
    lineHeight: 43.2,
    letterSpacing: -0.3,
  },
  promptText: {
    width: width - 48,
    alignSelf:'center',
    fontFamily: Fonts.fontFamily.regular,
    fontWeight: Fonts.weight.light,
    fontSize: 36,
    color: '#FFF',
    lineHeight: 43.2,
    letterSpacing: -0.3,
  },
  finishText: {
    fontFamily: Fonts.fontFamily.bold,
    fontWeight: Fonts.weight.bold,
    fontSize: 16,
    color: '#FFF',
    lineHeight: 43.2,
    letterSpacing: -0.3,
  }
})

export default styles