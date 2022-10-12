import type { AppProps } from "next/app";
import withTwindApp from "@twind/next/shim/app";
import { Provider, useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { wrapper } from "@app/store";

function MyApp({ Component, ...rest }: AppProps) {
  // const store = useStore();
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider {...{ store }}>
      <PersistGate persistor={(store as any).__persistor} loading={null}>
        {() => <Component {...props.pageProps} />}
      </PersistGate>
    </Provider>
  );
}

export default withTwindApp(MyApp);
