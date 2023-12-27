import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  actualizar: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setActualizar: (estado, accion) => {
      estado.actualizar = accion.payload;
    },
  },
});

export const { setActualizar } = loadingSlice.actions;
export default loadingSlice.reducer;
