import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  carga: true,
};

const cargaSlice = createSlice({
  name: "carga",
  initialState,
  reducers: {
    setCarga: (estado, accion: PayloadAction<boolean>) => {
      estado.carga = accion.payload;
    },
  },
});

export const { setCarga } = cargaSlice.actions;
export default cargaSlice.reducer;
