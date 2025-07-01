import { View, Text, ScrollView, Linking , Image } from 'react-native'
import React, { useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../../../constants/index'
import { Link, useFocusEffect } from 'expo-router'
import { useState, useEffect } from 'react'
import LocationIcon from '../../../components/app3/location'
import Navbar from '../../../components/app3/navbar'


const Place = (props) => {
    const handleClick = () => {
        Linking.openURL(props.address)
    }
    return(
        <View
            className='h-[170px] w-[310px] border rounded-xl py-2 px-1 flex flex-row justify-center gap-2 bg-secondary'
        >
            <View 
                className='w-[110px] rounded-[10px]'
            >
                <Image
                    source={images[props.imageName]}
                    className='h-[150px] w-[100px] rounded-[10px]'
                    resizeMode="stretch"
                />
            </View>
            <View
                className='bg-tertiary w-[180px] rounded-[10px] flex flex-col justify-center items-center'
            >
                <Text
                    className = 'text-[20px] text-quaternary font-psemibold'
                >{props.locationName}</Text>

                <Text
                    className='bg-primary w-[100px] text-center text-white h-[27px] p-1 rounded-[10px]'
                    onPress={handleClick}
                >
                Navigate</Text>
                
            </View>
        </View>
    )
}

const CampusMap = () => {

    const[load, setLoad] = useState(false)

    useFocusEffect(
        useCallback(() => {
            setLoad(false)
           const timer =  setTimeout(() => setLoad(true), 3000)

           return () => clearTimeout(timer)
        }, [])
    )

    return (
        <SafeAreaView className='flex-1 flex-row justify-center items-center bg-tertiary'>
            {load ?
            <ScrollView contentContainerStyle={{flexGrow : 1}} className='flex' showsVerticalScrollIndicator={false}>
                <Navbar/>
                <View
                    className='flex-1 flex-col items-center'
                >
                    <View>
                        <Text
                            className='text-[30px] font-psemibold m-4 text-center'
                        >Campus map</Text> 
                    </View>
                    <View className='m-[20px] flex flex-col gap-[20px]'>
                        <Place imageName="RB" locationName="Red Building" address="https://maps.app.goo.gl/rL3rRjc6icGtmXAX9" />
                        <Place imageName="" locationName="CEG Square" address="https://maps.app.goo.gl/9Kb4KUM5rAo7Bemh9" />
                        <Place imageName="Maths" locationName="Department of Maths" address="https://maps.app.goo.gl/JvWqm1WZkSJ6XnRn8" />
                        <Place imageName="CS" locationName="Department of Computer Science and Engineering" address="https://maps.app.goo.gl/JgGfbozazsgLvXJw9" />
                        <Place imageName="IT" locationName="Department of Information Science and Technology" address="https://maps.app.goo.gl/hYvaEhXhpamcR2RU6" />
                        <Place imageName="Electronics" locationName="Department of Electronics and Communication Engineering" address="https://maps.app.goo.gl/n4S449236mD87Y1f7" />
                        <Place imageName="Mechanical" locationName="Department of Mechanical Engineering" address="https://maps.app.goo.gl/yWfMJjmvwoqUkt9Z6" />
                        <Place imageName="Civil" locationName="Department of Civil Engineering" address="https://maps.app.goo.gl/1PpycAn9mD6XXPyP7" />
                        <Place imageName="Electrical" locationName="Department of Electrical and Electronics Engineering" address="https://maps.app.goo.gl/PwgXbKUCo72zpE1V7" />
                        <Place imageName="Mining" locationName="Department of Mining Engineering" address="https://maps.app.goo.gl/ZfYfDiwE3JZjDNgW9" />
                        <Place imageName="Manufacturing" locationName="Department Of Manufacturing Engineering" address="https://maps.app.goo.gl/jw3MjcPe2zp9GyrVA" />
                        <Place imageName="Printing" locationName="Department of Printing Technology" address="https://maps.app.goo.gl/Bww5fBU51n3bXr126" />
                        <Place imageName="Industrial" locationName="Department of Industrial Engineering" address="https://maps.app.goo.gl/p3xhoKJAdsVBTxiV8" />
                        <Place imageName="Geology" locationName="Department Of Geology" address="https://maps.app.goo.gl/dPSuyfat3VmFPAN29" />
                        <Place imageName="KP" locationName="Knowledege Park" address="https://maps.app.goo.gl/zsMmU6cMgynTxENi7" />
                        <Place imageName="SAH" locationName="Science and Humanities" address="https://maps.app.goo.gl/rH1fYCzkJy9Sg3aJ7" />
                        <Place imageName="SBI" locationName="State Bank of India" address="https://maps.app.goo.gl/qj2t8cWYLhmitV9d6" />
                        <Place imageName="VivekAudi" locationName="Vivekananda Auditorium" address="https://maps.app.goo.gl/PN1J1hP9Kbyty2vn7" />
                        <Place imageName="TagAudi" locationName="Tag Auditorium" address="https://maps.app.goo.gl/6YEJR63ChzDYh4ZX9" />
                        <Place imageName="" locationName="ACOE" address="https://maps.app.goo.gl/rwNA7LjPNPiixXaU8" />
                        <Place imageName="CTF" locationName="CEG Tech Forum" address="https://maps.app.goo.gl/hezNFJTrJ85UewxM9" />
                        <Place imageName="AlumniCentre" locationName="Alumni Centre" address="https://maps.app.goo.gl/Y3vE614piMBfVnzLA" />
                        <Place imageName="" locationName="Students Amenities centre" address="https://maps.app.goo.gl/p9hQZwHbod1qV49v8" />
                        <Place imageName="HealthCentre" locationName="Health Centre" address="https://maps.app.goo.gl/8Ypr9Tb96BSQnjov5" />
                        <Place imageName="Gurunath" locationName="Gurunath Store" address="https://maps.app.goo.gl/SBrMMGwLcdEJaEUV6" />
                        <Place imageName="Transport" locationName="Transportation Engineering Department" address="https://maps.app.goo.gl/qdCj9DDvsF3WX3Ga7" />
                        <Place imageName="HVL" locationName="High Voltage Laboratory" address="https://maps.app.goo.gl/X8Eba6SAN1JhqFng6" />
                        <Place imageName="SMF" locationName="Division of Soil Mechanics and Foundation Management" address="https://maps.app.goo.gl/UECK1D5fqMnjfMTq9" />
                        <Place imageName="" locationName="Engineering Design Division" address="https://maps.app.goo.gl/U86VaVrvMmUp2pxZ6" />
                        <Place imageName="" locationName="Structural Engineering" address="https://maps.app.goo.gl/2hG8qTGmfae8zgRw7" />
                        <Place imageName="Coop" locationName="Cooperative Store-Anna University" address="https://maps.app.goo.gl/LKnN9xK8ZfjRixEB7" />
                        <Place imageName="WR" locationName="Water Resources" address="https://maps.app.goo.gl/LZcmeyzkMZVpFtWG8" />
                        <Place imageName="Ocean" locationName="Institute of Ocean Management" address="https://maps.app.goo.gl/ACAQxnJq63RLcNNS8" />
                        <Place imageName="Chemistry" locationName="Department Of Physics And Chemistry" address="https://maps.app.goo.gl/xY84ZDkswCaEppcR7" />
                        <Place imageName="Library" locationName="Anna University Central Library" address="https://maps.app.goo.gl/ipKga5twscDLq4BQ7" />
                        <Place imageName="RCC" locationName="Ramanujan Computing Centre" address="https://maps.app.goo.gl/2ioqJ7xdwPUdHLPE6" />
                        <Place imageName="AUSB" locationName="Anna University Sports Board" address="https://maps.app.goo.gl/y9RddYZ9rVvdK4C78" />
                    </View>
                </View>
            </ScrollView>
            :<LocationIcon/>}
        </SafeAreaView>
    )
}

export default CampusMap