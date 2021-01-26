import App from "./App.svelte";

import "./scss/_grid.scss";
import "./scss/_typography.scss";
import "./scss/_buttons.scss";
import "./scss/_cards.scss";
import "./scss/_forms.scss";
import "./scss/_globals.scss";

const app = new App({
  target: document.body,
});

export default app;
