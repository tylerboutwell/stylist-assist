"use client";

import { Suspense, useContext, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { API_URL, apiFetch } from "@/lib/api";
import AuthContext from "@/context/AuthContext";
import { ImagePlus, X, Copy, Check, Sparkles } from "lucide-react";
import WelcomeMessage from "@/components/WelcomeMessage";

export default function CreatePostPage() {
  const [image, setImage] = useState<File | null>(null);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const { user, loading: authLoad } = useContext(AuthContext);

  useEffect(() => {
    if (!user && !authLoad) {
      router.push("/");
    }
  }, [user, authLoad, router]);

  useEffect(() => {
    if (!image) {
      setPreviewUrl(null);
      return;
    }
    const objUrl = URL.createObjectURL(image);
    setPreviewUrl(objUrl);
    return () => URL.revokeObjectURL(objUrl);
  }, [image]);

  if (!user) {
    return null;
  }

  const handleSubmit = async () => {
    setError("");

    if (!image) {
      setError("Please upload a photo first.");
      return;
    }

    setLoading(true);
    setAiResponse("");

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("prompt", prompt);

      const res = await apiFetch(`${API_URL}/api/posts/`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Something went wrong generating your caption. Please try again.");
        return;
      }
      setAiResponse(data.caption);
    } catch (err) {
      setError("Something went wrong generating your caption. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(aiResponse);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <main className="min-h-screen">
      <Navbar />

      <Suspense fallback={null}>
        <WelcomeMessage />
      </Suspense>

      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Generate a social post
          </h1>
          <p className="mt-2 text-neutral-600">
            Upload a photo, add any details, and get a ready-to-post caption.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Form column */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
            <label
              htmlFor="image-upload"
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
                const file = e.dataTransfer.files?.[0];
                if (file) setImage(file);
              }}
              className={`relative flex aspect-square w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed transition ${
                dragActive
                  ? "border-rose-400 bg-rose-50"
                  : "border-neutral-300 bg-neutral-50 hover:border-rose-300 hover:bg-neutral-100"
              }`}
            >
              {previewUrl ? (
                <>
                  <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setImage(null);
                    }}
                    aria-label="Remove image"
                    className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-neutral-900/70 text-white backdrop-blur transition hover:bg-neutral-900"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </>
              ) : (
                <>
                  <ImagePlus size={40} className="mb-3 text-neutral-400" />
                  <p className="font-medium text-neutral-700">
                    {dragActive ? "Drop your photo" : "Click or drag a photo here"}
                  </p>
                  <p className="mt-1 text-sm text-neutral-500">PNG or JPG, up to 8MB</p>
                </>
              )}
            </label>

            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="hidden"
            />

            <label htmlFor="prompt" className="mb-1.5 mt-6 block text-sm font-medium text-neutral-700">
              Anything you&apos;d like included?
            </label>
            <input
              id="prompt"
              type="text"
              placeholder="e.g. balayage, low-maintenance, first-time client"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-[15px] text-neutral-900 outline-none transition focus:border-rose-400 focus:bg-white focus:ring-4 focus:ring-rose-500/10"
            />

            {error && (
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-rose-500 px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                "Generating…"
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate caption
                </>
              )}
            </button>
          </div>

          {/* Result column — desktop shows it beside the form; on mobile it
              simply flows below since the grid collapses to one column */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="mb-4 text-sm font-semibold text-neutral-900">Your caption</p>

            {loading ? (
              <div className="animate-pulse space-y-3">
                <div className="h-4 w-full rounded bg-neutral-100" />
                <div className="h-4 w-5/6 rounded bg-neutral-100" />
                <div className="h-4 w-4/6 rounded bg-neutral-100" />
              </div>
            ) : aiResponse ? (
              <div>
                <p className="whitespace-pre-wrap rounded-xl bg-neutral-50 p-4 text-sm leading-relaxed text-neutral-700">
                  {aiResponse}
                </p>
                <button
                  onClick={handleCopy}
                  className="mt-4 flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied" : "Copy caption"}
                </button>
              </div>
            ) : (
              <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-neutral-200 text-center">
                <p className="max-w-[220px] text-sm text-neutral-500">
                  Upload a photo and generate to see your caption here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}