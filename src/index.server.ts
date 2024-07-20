import Log from "@rbxts/log";

import { PLUGIN_NAME } from "config";
import { setupLogger } from "package/functions/setup-logger";
import { mountIris } from "ui/iris/functions/mount";
import { createApp, reactConfig } from "ui/react/react-config";

const toolbar = plugin.CreateToolbar(PLUGIN_NAME);
setupLogger();
mountIris({
	component: (plugin, input) => {},
	plugin,
	toolbar,
	useCoreGui: false,
}).awaitStatus();

reactConfig();
createApp().catch(err => {
	Log.Fatal("Failed to create React app", err);
});
