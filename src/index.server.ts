import { PLUGIN_NAME } from "config";
import { mountIris } from "ui/iris/functions/mount";

const toolbar = plugin.CreateToolbar(PLUGIN_NAME);
mountIris({
	component: (plugin, input) => {},
	plugin,
	toolbar,
	useCoreGui: true,
}).awaitStatus();
