import { StyleSheet } from 'react-native'
import Colors from '../../theme/Colors'
import Fonts from '../../theme/Fonts'
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000',
  },
  headerContainer: {
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
  },
  pointText: {
    fontFamily: Fonts.fontFamily.regular,
    fontWeight: Fonts.weight.normal,
    fontSize: 18,
    color: '#FFF',
    lineHeight: 43.2,
    letterSpacing: -0.3,
  },
  contentText: {
    fontFamily: Fonts.fontFamily.regular,
    fontWeight: Fonts.weight.normal,
    fontSize: 36,
    color: '#FFF',
    lineHeight: 43.2,
    letterSpacing: -0.3,
  },
  buttonContainer: {
    alignSelf: 'stretch',
    borderRadius: 36,
    backgroundColor: Colors.button_grey,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 60,
  },
  buttonText: {
    fontFamily: Fonts.fontFamily.medium,
    fontSize: 36,
    fontWeight: Fonts.weight.bold,
    color: '#FFF',
  }
})

export default styles