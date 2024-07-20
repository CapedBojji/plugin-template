import { RunService } from "@rbxts/services";

import { $env } from "rbxts-transform-env";

export const CORE_GUI = game.GetService("CoreGui");
export const IS_EDIT = RunService.IsStudio() && !RunService.IsRunning();
export const PLUGIN_NAME = $env.string("PLUGIN_NAME") ?? "Plugin";
