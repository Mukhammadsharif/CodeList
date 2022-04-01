import React, { Fragment, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Formik } from 'formik'
import { launchImageLibrary } from 'react-native-image-picker'
import { fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '../utils/normalizeStyle'
import Container from './common/Container'
import InputLight from './common/InputLight'
import { usePostRequest } from '../hooks/request'
import { CATEGORY_LIST } from '../urls'
import { AddProductImage } from './common/Svgs'

export default function AddCategoryModal() {
    const [name, setName] = useState('')
    const [image, setImage] = useState(null)
    const addCategory = usePostRequest({ url: CATEGORY_LIST })

    async function onSubmit(data) {
        if (data.name !== '') {
            const { response, error } = await addCategory.request({ data: {
                ...data,
                name: data.name,
            } })
        }
    }

    function chooseFile() {
        const options = {
            mediaType: 'photo',
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
        }
        launchImageLibrary(options, setImage)
    }

    return (
        <View>
            <Container style={styles.container}>
                <Text style={styles.title}>Yangi to'plam qo'shish</Text>

                <Formik initialValues={{ name: '' }} onSubmit={onSubmit}>
                    {({ handleSubmit }) => (
                        <Fragment>
                            <TouchableOpacity
                                style={styles.imageContainer}
                                onPress={() => chooseFile()}
                            >
                                <AddProductImage width={36} height={33} />
                                <Text style={styles.imageText}>Kategoriya rasmi</Text>
                                <Text style={styles.formatText}>jpg,png – tavsiya qilinadigan hajm 10MB</Text>
                            </TouchableOpacity>

                            <InputLight
                                value={name}
                                wrapperStyle={styles.input}
                                label="Kategoriya nomi"
                                placeholder="Dropdown uchun"
                                onChange={(value) => setName(value)}
                                name="name"
                            />

                            <TouchableOpacity
                                onPress={handleSubmit}
                                style={styles.submit}>
                                <Text style={styles.submitText}>Saqlash</Text>
                            </TouchableOpacity>
                        </Fragment>
                    )}
                </Formik>

            </Container>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: heightPixel(320),
    },
    title: {
        fontSize: fontPixel(20),
        lineHeight: 14,
        fontWeight: 'bold',
        marginLeft: pixelSizeHorizontal(15),
        marginVertical: pixelSizeVertical(20),
        paddingTop: pixelSizeVertical(10),
    },
    input: {
        alignItems: 'center',
        height: heightPixel(65),
    },
    submit: {
        alignItems: 'center',
        backgroundColor: '#03758E',
        borderRadius: 15,
        height: heightPixel(60),
        justifyContent: 'center',
        marginTop: pixelSizeVertical(10),
    },
    submitText: {
        fontSize: fontPixel(14),
        color: '#ffffff',
    },
    imageText: {
        fontSize: fontPixel(14),
        lineHeight: 20,
        fontWeight: 'bold',
        marginTop: pixelSizeVertical(5),
    },
    formatText: {
        fontSize: fontPixel(14),
        lineHeight: 20,
    },
    imageContainer: {
        width: widthPixel(384),
        height: heightPixel(100),
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#F2F2F2',
        borderRadius: 21,
        borderWidth: 1,
        marginVertical: pixelSizeVertical(10),
    },
})
