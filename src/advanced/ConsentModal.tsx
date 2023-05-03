import React from 'react'
import { Image, Modal, Platform, BackHandler, Text, TouchableWithoutFeedback, View } from "react-native";
import { Button } from "react-native-elements";

import { Icon } from 'native-base';
import { EvilIcons } from '@expo/vector-icons';



export default class ConsentModal extends React.Component {
    state = {
        visible: false,
        agree: () => { }
    }

    show = (agree: any) => {
        this.setState({ visible: true, agree: agree })
    }

    render() {
        return (
            <Modal animated visible={this.state.visible} transparent>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    backgroundColor: 'rgba(255,255,255,.95)',
                    paddingTop: 40
                }
                }>
                    <View style={{
                        backgroundColor: '#eee',
                        borderRadius: 20,
                        width: 40,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Icon as={EvilIcons} name="location" color="coolGray.800" />

                    </View>

                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: 'black'
                    }}>Use your Location</Text>
                    <Text style={{
                        marginHorizontal: 20,
                        marginVertical: 10,
                        fontSize: 16,
                        color: '#444'
                    }}>Allow MMP Tracker to access this device's location even when closed or not in use</Text>
                    <Text style={{
                        marginHorizontal: 20,
                        marginVertical: 10,
                        fontSize: 16,
                        color: '#444'
                    }}>MMP Tracker collects location data to enable recording your work tracks and verify that your job's area is covered by them.</Text>
                    <Image source={{ uri: '../../images/route.png' }} style={{
                        width: 220,
                        height: 220,
                        borderRadius: 10,
                        overflow: 'hidden',
                        margin: 20
                    }} />
                    <View style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        justifyContent: 'space-between',
                        margin: 40,
                        flexDirection: 'row'
                    }}>
                        <TouchableWithoutFeedback onPress={() => {
                            BackHandler.exitApp();
                        }}>
                            <Text style={{
                                color: '#134F98',
                                fontWeight: 'bold',
                                fontSize: 16
                            }}>No Thanks</Text>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => {
                            this.state.agree();
                            this.setState({ visible: false })
                        }}>
                            <Text style={{
                                color: '#134F98',
                                fontWeight: 'bold',
                                fontSize: 16
                            }}>Turn On</Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </Modal>
        )
    }
}
