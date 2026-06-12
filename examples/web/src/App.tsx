import { useState } from "react";
import { Collapsible } from "react-fast-collapsible";
import { CheckIcon, ChevronDownIcon, CopyIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const easings = ["ease", "ease-in-out", "ease-out", "linear"];

const faqs = [
  {
    q: "How does it animate to an unknown height?",
    a: "A CSS grid row transitions from 0fr to 1fr. The browser resolves 1fr to the content’s natural size and animates the track, so no JavaScript ever measures the height.",
  },
  {
    q: "Does it cause layout thrashing?",
    a: "No. Nothing reads scrollHeight or any other layout property when you toggle, so there is no forced synchronous reflow. You only flip the open boolean.",
  },
  {
    q: "Is it accessible?",
    a: "When collapsed, the content is marked inert, so it leaves the tab order and the accessibility tree until it opens again.",
  },
  {
    q: "How big is it?",
    a: "Under a kilobyte minified and gzipped, with zero runtime dependencies.",
  },
];

const checks = [
  "No scrollHeight reads",
  "No layout thrashing",
  "Works with dynamic content",
];

export function App() {
  const [open, setOpen] = useState(true);
  const [duration, setDuration] = useState(300);
  const [easing, setEasing] = useState("ease");
  const [animateOpacity, setAnimateOpacity] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    void navigator.clipboard.writeText("npm install react-fast-collapsible");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-16 sm:py-24">
        <header className="flex flex-col items-center text-center">
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
            react-fast-collapsible
          </h1>
          <p className="mt-4 max-w-md text-balance text-muted-foreground">
            A minimal React component for smoothly revealing and hiding content.
          </p>
          <div className="mt-6 flex items-center gap-2 rounded-lg bg-muted/60 p-1 pl-3">
            <code className="font-mono text-sm">
              npm install react-fast-collapsible
            </code>
            <Button
              variant="ghost"
              size="icon"
              className="size-7 rounded-sm"
              onClick={copy}
              aria-label="Copy install command"
            >
              {copied ? <CheckIcon /> : <CopyIcon />}
            </Button>
          </div>
        </header>

        <Card className="mt-12">
          <CardHeader className="items-center justify-between">
            <div className="grid gap-1.5">
              <CardTitle>Playground</CardTitle>
              <CardDescription>
                Toggle the panel and tune the transition.
              </CardDescription>
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
              duration={duration}
              easing={easing}
              animateOpacity={animateOpacity}
              innerClassName="rounded-lg border bg-muted/40 p-4 mb-6"
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

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <Label>Duration</Label>
                  <span className="font-mono text-xs tabular-nums text-muted-foreground">
                    {duration}ms
                  </span>
                </div>
                <Slider
                  value={duration}
                  min={100}
                  max={1200}
                  step={50}
                  onValueChange={(value) => setDuration(value as number)}
                />
              </div>
              <div className="grid gap-3">
                <Label>Easing</Label>
                <Select
                  value={easing}
                  onValueChange={(value) => setEasing(value as string)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {easings.map((e) => (
                      <SelectItem key={e} value={e}>
                        {e}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between sm:col-span-2">
                <div className="grid gap-1">
                  <Label>Fade opacity</Label>
                  <span className="text-xs text-muted-foreground">
                    Animate opacity alongside height.
                  </span>
                </div>
                <Switch
                  checked={animateOpacity}
                  onCheckedChange={setAnimateOpacity}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <section className="mt-8">
          <h2 className="px-1 text-sm font-medium">Frequently asked</h2>
          <div className="mt-3 rounded-xl border bg-card p-1.5">
            {faqs.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={item.q}>
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 rounded-md px-3 py-3 text-left text-sm font-medium transition-colors hover:bg-muted/60"
                  >
                    {item.q}
                    <ChevronDownIcon
                      className={cn(
                        "size-4 shrink-0 text-muted-foreground transition-transform duration-300",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>
                  <Collapsible
                    open={isOpen}
                    innerClassName="px-3 pb-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    {item.a}
                  </Collapsible>
                </div>
              );
            })}
          </div>
        </section>

        <footer className="mt-12 flex items-center justify-center gap-3 text-sm text-muted-foreground">
          <a
            className="transition-colors hover:text-foreground"
            href="https://github.com/carlos-dubon/react-fast-collapsible"
          >
            GitHub
          </a>
          <Separator orientation="vertical" className="h-4" />
          <a
            className="transition-colors hover:text-foreground"
            href="https://www.npmjs.com/package/react-fast-collapsible"
          >
            npm
          </a>
          <Separator orientation="vertical" className="h-4" />
          <span>MIT</span>
        </footer>
      </div>
    </div>
  );
}
