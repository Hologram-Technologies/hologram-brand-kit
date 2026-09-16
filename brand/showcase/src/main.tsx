import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { useHashRoute } from "./router";
import { ScreensIndex } from "./ScreensIndex";
import { SCREENS } from "./screens";
import "./styles.css";

function Root() {
  const route = useHashRoute();
  if (route[0] === "screens") {
    const hit = SCREENS.find((s) => s.feature === route[1] && s.screen === route[2]);
    if (hit) {
      const Screen = hit.component;
      return <Screen />;
    }
    return <ScreensIndex />;
  }
  return <App />;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
