import { Coins, Sparkles } from "lucide-react";
import { getusercredits } from "~/actions/tts";


export default async function Credits() {
    const result = await getusercredits();
    const credits = result.success ? result.credits : 0 ;
    return (
        <div className="dark:bg-zinc-900 bg-zinc-100 flex items-center gap-2 rounded-md px-2 py-1 w-full h-full items-center justify-center">
            <Coins className="h-4 w-4 " />
            <span className="text-sm font-medium text-white dark:text-zinc-100">{credits}</span>
        </div>
    );
}