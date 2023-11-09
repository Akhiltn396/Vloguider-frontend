import { createSlice } from "@reduxjs/toolkit";
const searchSlice = createSlice({
  name: "search",
  initialState: {
    destination:"",
    latitude: undefined,
    longitude : undefined,

    zoom: 4,
  },
  reducers: {
    search: (state, action) => {

      state.destination = action?.payload?.title || action?.payload?.currentaddress;
      state.latitude = action?.payload?.location?.coordinates[1] || action?.payload?.currentlat;
      state.longitude = action?.payload?.location?.coordinates[0] || action?.payload?.currentlong;
      state.zoom = 11;
    },
    remove: (state, action) => {
      state.latitude = "";
      state.longitude = "";
      state.zoom = 0
    },
  },
});

export const { search, remove } = searchSlice.actions;

export default searchSlice.reducer;
