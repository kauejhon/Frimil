import { router, Stack } from "expo-router";
import { useEffect } from "react";

// function RouteGuard({ children }: { children: React.ReactNode }) {
//     const isAuth = false;

//     useEffect(() => {
//         if(!isAuth) {
//             router.replace("/auth")
//         }
//     }, [])

//     return <>{ children }</>

// }
 
export default function RootLayout() {
  return(
        <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown: false}} />
        </Stack>
  );
}


