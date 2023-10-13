import { useEffect, useState } from "react"
import { invoke } from "@tauri-apps/api/tauri"
import { Eye, EyeOff } from "lucide-react"
import QRCode from "react-qr-code"

import { Menu } from "@/components/menu"

import { TailwindIndicator } from "./components/tailwind-indicator"
import { ThemeProvider } from "./components/theme-provider"
import DashboardPage from "./dashboard/page"
import { cn } from "./lib/utils"

function App() {
  const [ip, setIP] = useState("")
  const [port, setPort] = useState<number>()
  const [path, setPath] = useState("")
  const [isBlur, setIsBlur] = useState(false)

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setIP(await invoke("greet"))
  }

  const portt = !port || port === 0 || port === 80 ? "" : `:${port}`
  const pathh = !path || path === "" ? "" : `/${path}`
  const url = `${ip}${portt}${pathh}`

  console.log(ip)

  useEffect(() => {
    greet()
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="h-screen overflow-clip">
        <Menu />
        <div
          className={cn(
            "flex h-screen flex-col items-center justify-center overflow-auto border-t bg-background pb-8",
            // "scrollbar-none"
            "scrollbar scrollbar-track-transparent scrollbar-thumb-accent scrollbar-thumb-rounded-md"
          )}
        >
          <div className="flex items-center">
            <div className="group relative z-0 mb-6 w-full">
              <input
                value={port}
                onChange={(e) => setPort(e.target.valueAsNumber)}
                type="number"
                name="port"
                id="port"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                placeholder=" "
                required
              />
              <label
                htmlFor="port"
                className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
              >
                Port
              </label>
            </div>
            <div className="mx-3 text-xl font-bold">/</div>
            <div className="group relative z-0 mb-6 w-full">
              <input
                value={path}
                onChange={(e) => setPath(e.target.value)}
                type="text"
                name="path"
                id="path"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                placeholder=" "
                required
              />
              <label
                htmlFor="path"
                className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
              >
                Path
              </label>
            </div>
          </div>
          <QRCode value={url} size={256} />
          <div className="mt-5 flex items-center">
            <div className={cn("mr-1", isBlur ? "blur-sm" : "")}>{url}</div>
            <button onClick={() => setIsBlur((o) => !o)}>
              {isBlur ? <Eye /> : <EyeOff />}
            </button>
          </div>
        </div>
      </div>
      <TailwindIndicator />
    </ThemeProvider>
  )
}

export default App
