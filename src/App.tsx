import { useEffect, useState, useRef } from "react";
import useStorage from "./hooks/useStorage";
import useKey from "./hooks/useKey";
import html2canvas from "html2canvas";

type Pixel = HTMLButtonElement;

function App(): React.ReactElement {
    const [numbering, setNumbering] = useState<boolean>(false);
    const [noSpaceBetweenPixels, setNoSpaceBetweenPixels] = useState<boolean>(false);
    const [pixels, setPixels] = useState<number[]>([...Array(25 * 25).fill(0)]);
    const pixelStorage = useStorage<number[]>("pixels")
    const numberEnabledStorage = useStorage<boolean>("numbering_enabled")
    const noSpaceBetweenStorage = useStorage<boolean>("no_space_between_enabled")
    const resetBtnRef = useRef<HTMLButtonElement>(null);
    const pixelGridRef = useRef<HTMLDivElement>(null);

    const exportAsImage = () => {
        if (pixelGridRef.current) {
            html2canvas(pixelGridRef.current, {
                width: pixelGridRef.current.clientWidth + 80,
                height: pixelGridRef.current.clientHeight + 80,
                x: -40,
                y: -40
            }).then((canvas) => {
                const resizedCanvas = document.createElement("canvas");
                resizedCanvas.width = 556;
                resizedCanvas.height = 556;
                const context = resizedCanvas.getContext("2d");

                if (context) {
                    context.drawImage(canvas, 0, 0, 556, 556);
                }
                
                const link = document.createElement("a");
                link.href = resizedCanvas.toDataURL("image/png");
                link.download = "qr.png";
                link.click();
            });
        }
    };
    
    useKey('Ctrl+i', (e) => {
        e.preventDefault();
        const exmplePixels = [1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,0,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,0,1,1,0,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,0,1,1,0,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,0,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,0,1,1,1,0,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,1,0,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        setPixels(exmplePixels);
        pixelStorage.setData(exmplePixels);
    });
    
    useKey('Alt+i', (e) => {
        e.preventDefault();
        const exmplePixels = [1,1,1,1,1,1,1,0,1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,0,0,0,0,1,0,0,0,1,0,1,1,0,1,1,0,1,0,0,0,0,0,1,1,0,1,1,1,0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,1,1,1,0,1,1,0,1,1,1,0,1,0,0,1,1,0,0,1,1,1,1,0,1,0,1,1,1,0,1,1,0,1,1,1,0,1,0,1,1,0,0,1,0,1,1,0,0,1,0,1,1,1,0,1,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,0,1,0,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,1,1,0,1,0,0,1,0,1,0,1,0,1,1,1,0,1,1,0,0,1,1,1,1,0,0,0,1,0,1,0,1,1,0,1,0,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0,0,1,0,0,1,0,1,0,0,0,0,1,0,1,1,1,0,0,1,0,1,0,1,0,0,0,1,0,1,1,1,1,0,0,1,0,1,0,1,0,1,1,1,0,0,1,1,1,0,0,0,0,0,1,1,1,1,0,1,0,1,1,1,1,0,1,1,0,0,1,0,0,0,0,1,0,0,0,1,1,0,0,1,0,1,0,1,0,0,0,1,0,1,1,0,0,0,0,1,0,1,1,1,1,0,0,0,0,1,0,0,1,0,0,1,1,0,0,0,0,1,0,1,1,0,1,0,1,0,0,1,1,0,1,0,1,1,0,1,0,1,0,1,0,0,1,0,0,0,1,0,1,1,1,1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,1,1,0,0,1,0,1,0,1,0,0,0,1,1,1,1,0,1,1,1,1,1,1,1,0,0,0,1,1,0,1,1,1,1,0,1,0,1,0,1,1,0,1,0,0,0,0,0,1,0,1,0,0,1,0,1,1,1,1,0,0,0,1,1,1,1,1,1,0,1,1,1,0,1,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1,0,1,1,1,0,1,1,1,0,1,0,0,0,1,1,1,0,0,0,0,1,0,1,0,1,1,0,1,1,0,1,1,1,0,1,0,0,1,0,1,0,0,1,0,1,0,1,0,0,1,0,0,1,1,0,0,0,0,0,1,0,0,0,0,0,1,1,1,1,0,0,1,0,0,1,1,0,0,1,1,1,1,1,1,1,0,0,0,1,1,1,0,0,1,1,0,1,0,1,0,1,1,1];
        setPixels(exmplePixels);
        pixelStorage.setData(exmplePixels);
    });

    useKey("e", () => {
        exportAsImage();
    });

    useKey("c", () => {
        setPixels([...Array(25 * 25).fill(0)]);
        pixelStorage.remove();
    });

    useKey("n", () => {
        setNumbering(!numbering);
        numberEnabledStorage.setData(!numbering);
    });

    useKey("i", () => {
        setNoSpaceBetweenPixels(!noSpaceBetweenPixels);
        noSpaceBetweenStorage.setData(!noSpaceBetweenPixels);
    });

    useKey("r", () => {
        const newPixels = [...pixels];
        const index = Array.from(document.querySelectorAll(".pixel")).indexOf(
            document.activeElement as Pixel
        );
        newPixels[index] = newPixels[index] === 2 ? 0 : 2
        setPixels(newPixels);
        pixelStorage.setData(newPixels);
    });

    useKey("b", () => {
        const newPixels = [...pixels];
        const index = Array.from(document.querySelectorAll(".pixel")).indexOf(
            document.activeElement as Pixel
        );
        newPixels[index] = newPixels[index] === 1 ? 0 : 1
        setPixels(newPixels);
        pixelStorage.setData(newPixels);
    });
    
    useKey("g", () => {
        const newPixels = [...pixels];
        const index = Array.from(document.querySelectorAll(".pixel")).indexOf(
            document.activeElement as Pixel
        );
        newPixels[index] = newPixels[index] === 3 ? 0 : 3
        setPixels(newPixels);
        pixelStorage.setData(newPixels);
    });

    useKey("y", () => {
        const newPixels = [...pixels];
        const index = Array.from(document.querySelectorAll(".pixel")).indexOf(
            document.activeElement as Pixel
        );
        newPixels[index] = newPixels[index] === 4 ? 0 : 4
        setPixels(newPixels);
        pixelStorage.setData(newPixels);
    });

    useKey("w", () => {
        const newPixels = [...pixels];
        const index = Array.from(document.querySelectorAll(".pixel")).indexOf(
            document.activeElement as Pixel
        );
        newPixels[index] = 0;
        setPixels(newPixels);
        pixelStorage.setData(newPixels);
    });

    

    function focusFirstPixel() {
        if (!document.activeElement?.classList.contains("pixel")) {
            document.querySelectorAll<Pixel>(".pixel")[0]?.focus();
            return;
        }
    }

    useKey("Tab", () => {
        focusFirstPixel();
    });

    useKey('Ctrl+ArrowRight', () => {
        alert('waiitt..');
    });

    useKey("ArrowRight", () => {
        if (document.activeElement?.nextElementSibling === null) {
            document.querySelectorAll<Pixel>(".pixel")[0]?.focus();
            return;
        }
        (document.activeElement?.nextElementSibling as Pixel)?.focus();
    });
    useKey("ArrowLeft", () => {
        if (document.activeElement?.previousElementSibling === null) {
            document.querySelectorAll<Pixel>(".pixel")[pixels.length - 1]?.focus();
            return;
        }
        (document.activeElement?.previousElementSibling as Pixel)?.focus();
    });
    useKey("ArrowDown", () => {
        const index = Array.from(document.querySelectorAll(".pixel")).indexOf(
            document.activeElement as Pixel
        );
        const nextRow = document.querySelectorAll<Pixel>(".pixel")[index + 25];
        if (!nextRow) {
            if (index === pixels.length - 1) {
                document.querySelectorAll<Pixel>(".pixel")[0]?.focus();
                return;
            }
            document.querySelectorAll<Pixel>(".pixel")[(index % 25) + 1]?.focus();
            return;
        }
        nextRow?.focus();
    });
    useKey("ArrowUp", () => {
        const index = Array.from(document.querySelectorAll(".pixel")).indexOf(
            document.activeElement as Pixel
        );
        const previousRow = document.querySelectorAll<Pixel>(".pixel")[index - 25];
        if (!previousRow) {
            if (index === 0) {
                document.querySelectorAll<Pixel>(".pixel")[pixels.length - 1]?.focus();
                return;
            }
            document.querySelectorAll<Pixel>(".pixel")[index + 599]?.focus();
            return;
        }
        previousRow?.focus();
    });

    useEffect(() => {
        const savedPixels = pixelStorage.storedValue as number[];
        const isNumberSavedEnabled = numberEnabledStorage.storedValue as boolean;
        const isSpaceBetweenSavedEnabled = noSpaceBetweenStorage.storedValue as boolean;

        if (savedPixels) {
            setPixels(savedPixels);
        }

        if(isNumberSavedEnabled) {
            setNumbering(isNumberSavedEnabled);
        }
        
        if (isSpaceBetweenSavedEnabled) {
            setNoSpaceBetweenPixels(isSpaceBetweenSavedEnabled);
        }
    }, [pixelStorage, numberEnabledStorage, noSpaceBetweenStorage]);

    return (
        <main className="h-[100dvh] grid place-items-center relative">
            <div className="flex flex-col absolute top-4 right-4 gap-2">
                <button
                    ref={resetBtnRef}
                    onClick={() => {
                        setPixels([...Array(25 * 25).fill(0)]);
                        pixelStorage.remove();
                    }}
                    className="bg-slate-200 hover:bg-slate-300 active:bg-slate-400 focus:ring text-black px-4 py-2 rounded-lg"
                >
                    Clear cells <code>(c)</code>
                </button>
                
                <button
                    onClick={() => {
                        setNumbering(!numbering);
                        numberEnabledStorage.setData(!numbering);
                    }}
                    className="bg-slate-200 hover:bg-slate-300 active:bg-slate-400 focus:ring text-black px-4 py-2 rounded-lg"
                >
                    {numbering ? "Disable" : "Enable"} cell numbering <code>(n)</code>
                </button>
                
                <button
                    onClick={() => {
                        setNoSpaceBetweenPixels(!noSpaceBetweenPixels);
                        noSpaceBetweenStorage.setData(!noSpaceBetweenPixels);
                    }}
                    className="bg-slate-200 hover:bg-slate-300 active:bg-slate-400 focus:ring text-black px-4 py-2 rounded-lg"
                >
                    {noSpaceBetweenPixels ? "Show" : "Hide"} cell grid <code>(i)</code>
                </button>
                <button
                    onClick={exportAsImage}
                    className="bg-slate-200 hover:bg-slate-300 active:bg-slate-400 focus:ring text-black px-4 py-2 rounded-lg"
                >
                    Export as PNG
                </button>
            </div>
            
            <div className="h-[95dvh] aspect-square bg-slate-100 bg-opacity-50 shadow-lg rounded-xl p-3">
                <div ref={pixelGridRef} className="p-3 rounded-lg">
                    <div className={"grid grid-cols-[repeat(25,minmax(0,1fr))] grid-rows-[repeat(25,minmax(0,1fr))] bg-slate-200 " + (noSpaceBetweenPixels ? "gap-0" : "gap-[1px]")}>
                        {pixels.map((_, i) => (
                            <button
                                onClick={() => {
                                    const newPixels = [...pixels];
                                    newPixels[i] = newPixels[i] === 0 ? 1 : 0;
                                    setPixels(newPixels);
                                    pixelStorage.setData(newPixels);
                                }}
                                key={i}
                                className={
                                    "pixel aspect-square focus:ring-4 ring-blue-500 outline-0 text-xs focus:z-20 " +
                                    (pixels[i] === 1 ? "bg-black text-white" : (pixels[i] === 2 ? "bg-red-500 text-white" : (pixels[i] === 3 ? "bg-green-500 text-white" : (pixels[i] === 4 ? "bg-yellow-500 text-white" : "bg-white text-black"))))
                                }
                            >{numbering ? i : ''}</button>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default App;