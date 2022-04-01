import React, { useEffect } from 'react'
import { View,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    Text,
    SafeAreaView,
    ScrollView } from 'react-native'
import { HomeIndicator, PlasticCard, Description } from './common/Svgs'
import Container from './common/Container'
import Women from '../assets/images/women.jpg'
import ButtonOutline from './ButtonOutline'
import FoodList from './FoodList'
import { formatNumber } from '../utils/number'
import { ORDER_SHOW } from '../urls'
import { usePutRequest } from '../hooks/request'
import { fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '../utils/normalizeStyle'

export default function FoodDetailModal({ item, orders }) {
    const update = usePutRequest({ url: ORDER_SHOW.replace('{id}', item.id) })

    useEffect(() => {
        onShow()
    }, [])

    function onShow() {
        update.request({ ...item, isShow: true })
        orders.setResponse({
            count: orders.response.count,
            results: orders.response.results.map((i) => (i.id === item.id ? { ...item, isShow: true } : i)),
        })
    }

    let amount = 0
    // eslint-disable-next-line no-return-assign
    item.orderProducts.map((i) => amount += i.count * i.price)

    return (
        <View>
            <TouchableOpacity style={styles.homeIndicatorContainer}>
                <HomeIndicator height={38} width={38} />
            </TouchableOpacity>

            <Container style={styles.container}>
                <View style={styles.clientContainer}>
                    <View style={styles.orderNumber}>

                        <Image source={Women} style={styles.clientImage} />

                        <View style={styles.orderName}>
                            <Text style={styles.clientName}>{item.userTitle}</Text>
                            <Text style={styles.orderNumberText}>Buyurtma - {item.id}</Text>
                        </View>
                    </View>

                    <View style={styles.card}>
                        <View style={styles.cardImage}>
                            <PlasticCard />
                        </View>

                        <View style={styles.cardText}>
                            <Text style={styles.cardName}>Plastik karta</Text>
                            <Text style={styles.priceText}>
                                {formatNumber(amount)} UZS
                            </Text>
                        </View>

                    </View>
                </View>

                <View style={styles.separator} />

                <View>
                    <Text style={styles.title}>Taomlar</Text>
                </View>

                <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView scrollEnabled showsVerticalScrollIndicator={false}>
                        <TouchableHighlight>
                            <FoodList item={item} />
                        </TouchableHighlight>
                    </ScrollView>
                </SafeAreaView>

                <View style={styles.descriptionContainer}>
                    <View style={styles.descriptionImage}>
                        <Description width={20} height={20} />
                    </View>

                    <View style={styles.descriptionTextContainer}>
                        <Text style={styles.descriptionText}>
                            Lavashga mayonez qo’shilmasin. Burgerga esa
                            tuzlangan bodiring qo’shilmasin. Salfetka ham
                            berib yuborish esdan chiqib qolmasin iltimos.
                        </Text>
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <ButtonOutline value="Bekor qilish" style={styles.buttonReject} color="#D21234" />
                    <ButtonOutline value="Qayta yuborish" style={styles.buttonReset} color="#FFFFFF" />
                </View>
            </Container>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: heightPixel(600),
        marginVertical: pixelSizeVertical(20),
        marginHorizontal: pixelSizeHorizontal(20),
    },
    homeIndicatorContainer: {
        alignItems: 'center',
    },
    clientContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    orderNumber: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    clientImage: {
        width: widthPixel(62),
        height: widthPixel(62),
        borderRadius: 10000,
    },
    orderName: {
        marginLeft: pixelSizeHorizontal(15),
        marginTop: pixelSizeVertical(10),
    },
    card: {
        flexDirection: 'row',
        marginTop: pixelSizeVertical(7),
    },
    cardImage: {
        marginTop: pixelSizeVertical(5),
    },
    cardText: {
        marginLeft: pixelSizeHorizontal(10),
    },
    clientName: {
        fontSize: fontPixel(16),
        fontWeight: '400',
        lineHeight: fontPixel(19),
    },
    orderNumberText: {
        fontSize: fontPixel(16),
        fontWeight: '500',
        lineHeight: fontPixel(19),

    },
    cardName: {
        fontSize: fontPixel(16),
        lineHeight: pixelSizeHorizontal(21),
    },
    priceText: {
        fontSize: fontPixel(16),
        fontWeight: 'bold',
        lineHeight: pixelSizeHorizontal(20),
    },
    separator: {
        height: heightPixel(1),
        width: '100%',
        backgroundColor: '#F2F2F2',
        marginVertical: pixelSizeVertical(20),
    },
    title: {
        fontSize: fontPixel(20),
        fontWeight: 'bold',
    },
    radioCheckContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioCheck: {
        width: widthPixel(25),
        height: heightPixel(25),
        backgroundColor: '#F7F7F7',
        borderRadius: fontPixel(50),
        marginVertical: pixelSizeVertical(5),
    },
    foodContainer: {
        flexDirection: 'row',
        marginVertical: pixelSizeVertical(15),
    },
    foodNameContainer: {
        marginLeft: pixelSizeHorizontal(20),
    },
    foodName: {
        fontSize: fontPixel(18),
        fontWeight: 'bold',
        lineHeight: pixelSizeHorizontal(23),
    },
    foodQuantity: {
        fontSize: fontPixel(16),
    },
    foodPrice: {
        fontSize: fontPixel(16),
    },
    foodPriceContainer: {
        position: 'absolute',
        right: pixelSizeHorizontal(5),
    },
    separatorFood: {
        height: heightPixel(3),
        width: '100%',
        backgroundColor: '#F2F2F2',
        marginVertical: pixelSizeVertical(5),
    },
    descriptionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#F7F7F7',
        width: '100%',
        borderRadius: fontPixel(15),
        minHeight: pixelSizeHorizontal(100),
        marginVertical: pixelSizeVertical(20),
    },
    descriptionImage: {
        marginTop: pixelSizeVertical(22),
        paddingLeft: pixelSizeHorizontal(10),
    },
    descriptionTextContainer: {
        width: '80%',
        marginVertical: pixelSizeVertical(20),
    },
    descriptionText: {
        paddingRight: pixelSizeHorizontal(20),
        lineHeight: pixelSizeHorizontal(24),
        fontSize: fontPixel(16),
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    buttonReject: {
        borderColor: '#D21234',
        color: '#D21234',
        width: '45%',
        height: pixelSizeHorizontal(55),
    },
    buttonReset: {
        backgroundColor: '#000000',
        width: '45%',
        height: pixelSizeHorizontal(55),
    },
})
