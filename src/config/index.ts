import { RunService } from "@rbxts/services";

export const CORE_GUI = game.GetService("CoreGui");
export const IS_EDIT = RunService.IsStudio() && !RunService.IsRunning();
