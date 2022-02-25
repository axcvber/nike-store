import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IModalProps {
  title: string
  description: string
  logo?: boolean
  closeModal?: any
}

export interface ModalState {
  open?: boolean
  mounted?: boolean
  modalType: string | null
  modalProps: IModalProps
}

const initialState: ModalState = {
  open: false,
  mounted: false,
  modalType: null,
  modalProps: {
    title: '',
    description: '',
    logo: false,
  },
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal(state, action: PayloadAction<ModalState>) {
      state.open = true
      state.mounted = action.payload.mounted
      state.modalType = action.payload.modalType
      state.modalProps = action.payload.modalProps
    },
    hideModal(state) {
      state.open = false
    },
    resetModal: () => initialState,
  },
})

export const { showModal, hideModal, resetModal } = modalSlice.actions
export default modalSlice.reducer
