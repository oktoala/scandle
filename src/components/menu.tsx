"use client"

import { useCallback } from "react"
import { WindowTitlebar } from "tauri-controls"

import { Menubar, MenubarMenu } from "@/components/ui/menubar"

export function Menu() {
  const closeWindow = useCallback(async () => {
    const { appWindow } = await import("@tauri-apps/plugin-window")

    appWindow.close()
  }, [])

  return (
    <WindowTitlebar
    // controlsOrder="platform"
    // windowControlsProps={{ platform: "macos", className: "" }}
    >
      <Menubar className="rounded-none border-b border-none pl-2 lg:pl-3">
        <MenubarMenu>
          <div className="font-bold">scandle</div>
        </MenubarMenu>
        {/* <MenuModeToggle /> */}
      </Menubar>
    </WindowTitlebar>
  )
}
