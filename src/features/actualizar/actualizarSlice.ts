import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  actualizar: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setActualizar: (estado, accion: PayloadAction<boolean>) => {
      estado.actualizar = accion.payload;
    },
  },
});

export const { setActualizar } = loadingSlice.actions;
export default loadingSlice.reducer;
