import Iris, { State } from "@rbxts/iris";

import { CORE_GUI } from "config";
import type Input from "package/modules/iris/input";

export interface MountProps<T> {
	component: (plugin: Plugin, input: Input, props?: T) => void;
	plugin: Plugin;
	props?: T;
	toolbar: PluginToolbar;
}

export async function mountIris<T>(props: MountProps<T>): Promise<void> {
	// Create Iris button
	const button = props.toolbar.CreateButton("Iris", "Open Iris", "rbxassetid://7201770790");

	// Create the Iris container
	const irisContainer = new Instance("Folder");
	irisContainer.Name = "Iris";
	irisContainer.Parent = CORE_GUI;

	// Handle the input
	const input = (await import("package/modules/iris/input")) as Input;
	input.SinkFrame.Parent = irisContainer;
	Iris.Internal._utility.UserInputService = input;
	Iris.UpdateGlobalConfig({
		UseScreenGUIs: false,
	});

	// Initialize Iris
	Iris.Init(irisContainer);

	// Render the component
	const toggle = State(false);
	Iris.Connect(() => {
		Iris.ShowDemoWindow();
		props.component(props.plugin, input, props.props);
	});

	// Handle the button click
	button.Click.Connect(() => {
		toggle.set(!toggle.get());
		Iris.Disabled = !toggle.get();
		button.SetActive(toggle.get());
	});

	// Handle plugin unload
	props.plugin.Unloading.Connect(() => {
		Iris.Shutdown();
		for (const connection of input._connections) connection.Disconnect();
		input.SinkFrame.Destroy();
		toggle.set(false);
		button.SetActive(false);
		Iris.Disabled = true;
	});
}
