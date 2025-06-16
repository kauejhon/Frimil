import { Region } from "react-native-maps"

export interface ClientProps {
    name: string
    currentLocation: Region
    saldo: number
    codigo: number
}


export const clients: ClientProps[] = [
    {
        name: "West Boi",
        currentLocation: {
            latitude: -1.4503762384424286, // Exemplo: Latitude de Belém
            longitude: -48.49687318410518, // Exemplo: Longitude de Belém
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        saldo: 12345, // Exemplo: Saldo inicial do cliente
        codigo: 8372, // Exemplo: Código do cliente
    },
    {
        name: "Égua da Carne",
        currentLocation: {
            latitude: -1.4613590198554425, // Exemplo: Latitude de Belém
            longitude: -48.49687318410518, // Exemplo: Longitude de Belém
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        saldo: 7000, // Exemplo: Saldo inicial do cliente
        codigo: 6997, // Exemplo: Código do cliente
    },
    {
        name: "D'Beef",
        currentLocation: {
            latitude: -1.4610117709509218, // Exemplo: Latitude de Belém
            longitude: -48.50173972463678, // Exemplo: Longitude de Belém
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        saldo: 1000, // Exemplo: Saldo inicial do cliente
        codigo: 2315, // Exemplo: Código do cliente
    },
    {
        name: "Frigobel Ver o Peso",
        currentLocation: {
            latitude: -1.450458003814239, // Exemplo: Latitude de Belém
            longitude: -48.50285552353129, // Exemplo: Longitude de Belém
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        saldo: 8500, // Exemplo: Saldo inicial do cliente
        codigo: 9098, // Exemplo: Código do cliente
    },
    {
        name: "Ceará Carnes",
        currentLocation: {
            latitude: -1.4700210451458025, // Exemplo: Latitude de Belém
            longitude: -48.49126838116465, // Exemplo: Longitude de Belém
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        saldo: 2200, // Exemplo: Saldo inicial do cliente
        codigo: 9999, // Exemplo: Código do cliente
    },
{
        name: "Emporio Bovino",
        currentLocation: {
            latitude: -1.4546623559906415, // Exemplo: Latitude de Belém
            longitude: -48.488865122007134, // Exemplo: Longitude de Belém
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        saldo: 5000, // Exemplo: Saldo inicial do cliente
        codigo: 2123, // Exemplo: Código do cliente
    },
    {
        name: "Lobato Carnes & Mariscos",
        currentLocation: {
            latitude: -1.4676185755725957, // Exemplo: Latitude de Belém
            longitude: -48.4898092595333, // Exemplo: Longitude de Belém
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        saldo: 3000, // Exemplo: Saldo inicial do cliente
        codigo: 1827, // Exemplo: Código do cliente
    },
    {
        name: "C.C. Boi na Brasa Belém",
        currentLocation: {
            latitude: -1.466074129483786, // Exemplo: Latitude de Belém
            longitude: -48.47435973637779, // Exemplo: Longitude de Belém
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        saldo: 4000, // Exemplo: Saldo inicial do cliente
        codigo: 2389, // Exemplo: Código do cliente
    },
    {
        name: "Açougue Box Boi",
        currentLocation: {
            latitude: -1.4294385332765598, // Exemplo: Latitude de Belém
            longitude: -48.484913396810654, // Exemplo: Longitude de Belém
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        saldo: 5000, // Exemplo: Saldo inicial do cliente
        codigo: 7654, // Exemplo: Código do cliente
    },
    {
        name: "Malu Carnes",
        currentLocation: {
            latitude: -1.4461432560177845, // Exemplo: Latitude de Belém
            longitude: -48.46876795790854, // Exemplo: Longitude de Belém
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        saldo: 3000, // Exemplo: Saldo inicial do cliente
        codigo: 8867, // Exemplo: Código do cliente
    },
    {
        name: "Barão Carnes",
        currentLocation: {
            latitude: -1.4672400309882208, // Exemplo: Latitude de Belém
            longitude: -48.466004583046725, // Exemplo: Longitude de Belém
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        saldo: 4000, // Exemplo: Saldo inicial do cliente
        codigo: 3234, // Exemplo: Código do cliente
    },
    {
        name: "Açougue Senador Carnes",
        currentLocation: {
            latitude: -1.431276854934378, // Exemplo: Latitude de Belém
            longitude: -48.48553205605986, // Exemplo: Longitude de Belém
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        saldo: 5000, // Exemplo: Saldo inicial do cliente
        codigo: 6123, // Exemplo: Código do cliente
    },
] 
