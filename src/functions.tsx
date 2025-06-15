import { ErrorProps } from "@/app/(auth)/login"
import { Dispatch, SetStateAction, useCallback } from "react"
import * as Location from 'expo-location';
import { Region } from "react-native-maps";


export function handleErrorSignUp(error: ErrorProps, email: Dispatch<SetStateAction< string | null>>, password: Dispatch<SetStateAction< string | null>>) {

    if(error) {
    error.errors.map((errProp) => {
        if(errProp.meta.paramName === "password") {
            password("Senha deve ter mais de 8 caracteres: 1-9 e a-Z")
        }


    })
    }
    if(error) {
    error.errors.map((errProp) => {
        if(errProp.meta.paramName === "email_address") {
            email("Email Inválido, verifique e tente novamente (email deve seguir o padrão")
        }


    })
    }


}

export function handleErrorSignIn(error: ErrorProps, email: Dispatch<SetStateAction< string | null>>, password: Dispatch<SetStateAction< string | null>>) {

    if(error) {
    error.errors.map((errProp) => {
        if(errProp.meta.paramName === "password") {
            password("Senha inválida, verifique e tente novamente")
        }


    })
    }
    if(error) {
    error.errors.map((errProp) => {
        if(errProp.meta.paramName === "identifier") {
            email("Email inválido, verifique e tente novamnete")
        }


    })
    }


}

// export const fetchCurrentLocation = async (
//     error: Dispatch<SetStateAction< string | null>>, 
//     currentLocation: Dispatch<SetStateAction< Region | null>>) => {
//         let { status } = await Location.getForegroundPermissionsAsync();

//         if(status !== "granted") {
//             error("Permissão para acessar localização foi negada!")
//             // setHasLocationPermission(false)
//         }
            
//         currentLocation({
//             latitude:  -1.407721233196371, // Exemplo: Latitude de Belém
//             longitude: -48.471521664808094, // Exemplo: Longitude de Belém
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//         })
// }