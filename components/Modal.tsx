import { useState } from "react"
import { Modal } from "react-native"


export function ModalSreen() {
    const [ visible, setVisible ] = useState<boolean>(false);
    return(
        <Modal
          visible={visible}
          animationType="fade"
          onRequestClose={() => setVisible(false)}
          transparent={true}
        >

            
        </Modal>
    )
}