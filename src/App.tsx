import { useEffect, useState } from "react"
import { invoke } from "@tauri-apps/api/tauri"
import { useCopyToClipboard } from "@uidotdev/usehooks"
import { Copy, Eye, EyeOff } from "lucide-react"
import QRCode from "react-qr-code"

import { Menu } from "@/components/menu"

import { ThemeProvider } from "./components/theme-provider"
import { Toaster } from "./components/ui/toaster"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./components/ui/tooltip"
import { useToast } from "./components/ui/use-toast"
import { cn } from "./lib/utils"

function App() {
  const [ip, setIP] = useState("")
  const [port, setPort] = useState<number>(0)
  const [path, setPath] = useState("")
  const [isBlur, setIsBlur] = useState(true)

  const [, copyToClipboard] = useCopyToClipboard()

  const { toast } = useToast()

  async function greet() {
    setIP(await invoke("greet"))
  }

  const portt = !port || port === 0 || port === 80 ? "" : `:${port}`
  const pathh = !path || path === "" ? "" : `/${path}`
  const url = `${ip}${portt}${pathh}`

  useEffect(() => {
    greet()
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <Toaster />
      <TooltipProvider>
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
                  onChange={(e) => setPort(e.target.valueAsNumber ?? 0)}
                  type="number"
                  name="port"
                  id="port"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-orange-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-orange-500"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="port"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-orange-600 dark:text-gray-400 peer-focus:dark:text-orange-500"
                >
                  Port
                </label>
              </div>
              <div className="mx-3 text-xl font-bold">/</div>
              <div className="group relative z-0 mb-6 w-full">
                <input
                  value={path}
                  onChange={(e) => setPath(e.target.value ?? "")}
                  type="text"
                  name="path"
                  id="path"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-orange-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-orange-500"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="path"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-orange-600 dark:text-gray-400 peer-focus:dark:text-orange-500"
                >
                  Path
                </label>
              </div>
            </div>
            <QRCode value={url} size={256} />
            <div className="mt-5 flex items-center">
              <div className={cn("", isBlur ? "blur-sm" : "")}>{url}</div>
              <Tooltip>
                <TooltipTrigger
                  className="mx-2"
                  onClick={() => setIsBlur((o) => !o)}
                >
                  {isBlur ? <Eye /> : <EyeOff />}
                </TooltipTrigger>
                <TooltipContent>Lihat</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger
                  onClick={() => {
                    copyToClipboard(url)
                    toast({
                      description: "Berhasil di copy ( ╹▽╹ )",
                    })
                  }}
                >
                  <Copy />
                </TooltipTrigger>
                <TooltipContent>Copy ke Clipboard</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </TooltipProvider>
      {/* <TailwindIndicator /> */}
    </ThemeProvider>
  )
}

export default App
