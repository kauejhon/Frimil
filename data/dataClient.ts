import { Region } from "react-native-maps"

export interface ClientProps {
    name: string
    currentLocation: Region
}


export const clients: ClientProps[] = [
    {
        name: "West Boi",
        currentLocation: {
            latitude: -1.4503762384424286, // Exemplo: Latitude de Belém
            longitude: -48.49687318410518, // Exemplo: Longitude de Belém
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
    },
    {
        name: "Égua da Carne",
        currentLocation: {
            latitude: -1.4613590198554425, // Exemplo: Latitude de Belém
            longitude: -48.49687318410518, // Exemplo: Longitude de Belém
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
    },
    {
        name: "D'Beef",
        currentLocation: {
            latitude: -1.4610117709509218, // Exemplo: Latitude de Belém
            longitude: -48.50173972463678, // Exemplo: Longitude de Belém
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
    },
    {
        name: "Frigobel Ver o Peso",
        currentLocation: {
            latitude: -1.450458003814239, // Exemplo: Latitude de Belém
            longitude: -48.50285552353129, // Exemplo: Longitude de Belém
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
    },
    {
        name: "Ceará Carnes",
        currentLocation: {
            latitude: -1.4700210451458025, // Exemplo: Latitude de Belém
            longitude: -48.49126838116465, // Exemplo: Longitude de Belém
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
    },
]

export const clientTwo = [
    {
        name: "Emporio Bovino",
        currentLocation: {
            latitude: -1.4546623559906415, // Exemplo: Latitude de Belém
            longitude: -48.488865122007134, // Exemplo: Longitude de Belém
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
    },
    {
        name: "Lobato Carnes & Mariscos",
        currentLocation: {
            latitude: -1.4676185755725957, // Exemplo: Latitude de Belém
            longitude: -48.4898092595333, // Exemplo: Longitude de Belém
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
    },
    {
        name: "Casa de Carnes | Boi na Brasa Belém",
        currentLocation: {
            latitude: -1.466074129483786, // Exemplo: Latitude de Belém
            longitude: -48.47435973637779, // Exemplo: Longitude de Belém
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
    },
    {
        name: "Açougue Box Boi",
        currentLocation: {
            latitude: -1.4294385332765598, // Exemplo: Latitude de Belém
            longitude: -48.484913396810654, // Exemplo: Longitude de Belém
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
    },
]

export const clientThree = [
    {
        name: "Malu Carnes",
        currentLocation: {
            latitude: -1.4461432560177845, // Exemplo: Latitude de Belém
            longitude: -48.46876795790854, // Exemplo: Longitude de Belém
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
    },
    {
        name: "Barão Carnes",
        currentLocation: {
            latitude: -1.4672400309882208, // Exemplo: Latitude de Belém
            longitude: -48.466004583046725, // Exemplo: Longitude de Belém
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
    },
    {
        name: "Açougue Senador Carnes",
        currentLocation: {
            latitude: -1.431276854934378, // Exemplo: Latitude de Belém
            longitude: -48.48553205605986, // Exemplo: Longitude de Belém
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
    },
] 
