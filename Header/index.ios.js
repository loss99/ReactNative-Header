/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
//这个是自定义的组件,可以适配安卓和苹果
import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
	View,
	Text,
	Image,
	TouchableHighlight,
	Dimensions,
	Platform
} from 'react-native';

const standard = 375;

export default class Header extends Component {
    //属性声名
    static propTypes = {
        headercolor:PropTypes.string,
        showback:PropTypes.bool,

        title: PropTypes.string,
        titlecolor: PropTypes.string,

        lefticon: PropTypes.number,
        leftmenu: PropTypes.string,
        leftmenucolor: PropTypes.string,

        righticon: PropTypes.number,
        rightmenu: PropTypes.string,
        rightmenucolor: PropTypes.string,

        leftAction:PropTypes.func,
        titleAction:PropTypes.func,
        rightAction:PropTypes.func,

        renderCustomView:PropTypes.func,
    };

    //默认属性
    static defaultProps = {
        headercolor:'#18242e',
        showback:true,

        title: '标题',
        titlecolor: '#FFFFFF',

        leftmenu: '',
        leftmenucolor: '#FFFFFF',
        lefticon: require('../image/zuo.png'),

        rightmenu: '',
        rightmenucolor: '#FFFFFF',
    };

    //构造函数
    constructor(props) {
        super(props);
        this.state = { //状态机变量声明

        }
    }


    //渲染
    render() {

        if (typeof this.props.renderCustomView === 'function') {
            //使用自定的头部视图
            return (
                <View style={[styles.container, {backgroundColor:this.props.headercolor}]}>
                    {this.props.renderCustomView()}
                </View>
            );
        }else {
            /**
             * 否则显示默认的视图
             */
            return (
                <View style={[styles.container, {backgroundColor:this.props.headercolor}]}>

                    <TouchableHighlight
                        underlayColor='#FFFFFF00'
                        style={styles.containerleft}
                        onPress={()=>{
                            if(this.props.leftAction == null && this.props.showback) {
                                if (this.props.navigator) {
                                    this.props.navigator.pop();
                                }
                            } else {
                                this.props.leftAction();
                            }
                        }} >

                        <View style={[{flexDirection:'row', alignItems:'center', flex:1, width:60}]}>
                            {this.props.showback? <Image style={{width:26, height:28, marginLeft:10, resizeMode:'contain'}} source={this.props.lefticon}></Image>: null}

                            <Text style={{color:this.props.leftmenucolor, fontSize:this._adapt(16),}}>
                                {this.props.leftmenu}
                            </Text>
                        </View>

                    </TouchableHighlight>



                    <TouchableHighlight
                        underlayColor='#FFFFFF00'
                        style={styles.containercenter}
                        onPress={this.props.titleAction} >

                        <View style={[{flexDirection:'row', alignItems:'center'}]}>
                            <Text style={{color:this.props.titlecolor, fontSize:this._adapt(16)}} numberOfLines={1}>
                                {this.props.title}
                            </Text>
                        </View>
                    </TouchableHighlight>



                    <TouchableHighlight
                        underlayColor='#FFFFFF00'
                        style={styles.containerright}
                        onPress={this.props.rightAction} >

                        <View style={[{flexDirection:'row', alignItems:'center', justifyContent:'flex-end', flex:1, width:60}]}>
                            <Text style={{color:this.props.rightmenucolor, fontSize:this._adapt(16), paddingRight:10,}}>
                                {this.props.rightmenu}
                            </Text>

                            {this.props.righticon? <Image style={{width:18, height:18, marginRight:10, resizeMode:'contain'}} source={this.props.righticon}></Image>: null}
                        </View>

                    </TouchableHighlight>

                </View>
            );
        }
    }
    _adapt(width){
        return Dimensions.get('window').width/standard * width;
    }


};


const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        height: (Platform.OS == "android")? 50: 64,
        paddingTop: (Platform.OS == "android")? 0: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },


    containerleft: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    containercenter: {
        flex: 2,
        flexDirection: 'column',
        alignItems: 'center',
    },
    containerright: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
});
AppRegistry.registerComponent('Header', () => Header);
