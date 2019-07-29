import confDevStore from "./configureStore.dev";
import confProdStore from "./configureStore.prod";

export default (process.env.NODE_ENV === "development") ? confDevStore : confProdStore
