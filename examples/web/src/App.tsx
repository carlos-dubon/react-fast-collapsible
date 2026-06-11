import { useState } from "react";
import { Collapsible } from "react-fast-collapsible";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const checks = [
  "No scrollHeight reads",
  "No layout thrashing",
  "Works with dynamic content",
];

export function App() {
  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
        <header className="flex flex-col items-center text-center">
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
            react-fast-collapsible
          </h1>
          <p className="mt-4 max-w-md text-balance text-muted-foreground">
            A minimal React component for smoothly revealing and hiding content.
          </p>
        </header>

        <Card className="mt-12">
          <CardHeader className="items-center justify-between">
            <div className="grid gap-1.5">
              <CardTitle>Playground</CardTitle>
              <CardDescription>Toggle the panel.</CardDescription>
            </div>
            <Button
              variant={open ? "secondary" : "default"}
              size="sm"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Collapse" : "Expand"}
              <ChevronDownIcon
                className={cn(
                  "transition-transform duration-300",
                  open && "rotate-180",
                )}
              />
            </Button>
          </CardHeader>
          <CardContent>
            <Collapsible
              open={open}
              innerClassName="rounded-lg border bg-muted/40 p-4"
            >
              <h3 className="text-sm font-medium">Content of any height</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                The panel grows and shrinks smoothly regardless of how much
                content lives inside it. The height is resolved by CSS grid, so
                nothing is measured in JavaScript.
              </p>
              <ul className="mt-3 grid gap-1.5">
                {checks.map((c) => (
                  <li
                    key={c}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <CheckIcon className="size-4 shrink-0 text-foreground" />
                    {c}
                  </li>
                ))}
              </ul>
            </Collapsible>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
