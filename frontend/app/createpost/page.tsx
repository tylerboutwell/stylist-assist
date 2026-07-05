"use client";

import {useContext, useEffect, useState} from "react";
import Navbar from "@/components/Navbar";
import {useRouter} from "next/navigation";
import {API_URL, apiFetch} from "@/lib/api";
import AuthContext from "@/context/AuthContext";
import {ImagePlus} from "lucide-react";

export default function CreatePostPage() {
  const [image, setImage] = useState<File | null>(null);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const router = useRouter();
  const {user, loading: authLoad} = useContext(AuthContext)

  useEffect(() => {
    if (!user && !authLoad) {
      router.push('/get-started')}
  }, [user, authLoad, router])

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
      return null
    }

  const handleSubmit = async () => {
    if (!image) {
      alert("Please upload an image");
      return;
    }

    setLoading(true);

    try {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("prompt", prompt)

    const res = await apiFetch(`${API_URL}/api/posts/`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Bad request response:", data);
      setAiResponse("Error uploading image.");
      return;
    }
    setAiResponse(data.caption);
  } catch (err) {
    console.error(err);
    setAiResponse("Error generating response.");
  } finally {
    setLoading(false);
  }
  };

  return (
      <main className="min-h-screen">
        <Navbar/>
        <div className="flex flex-col items-center px-4">
          <h1 className="text-4xl font-bold mb-6 text-center">
            Generate a Social Media Post
          </h1>

          <div className="w-full max-w-xl bg-white rounded-2xl p-6 shadow-lg flex flex-col gap-6">
            {/* Image Upload */}
            <div className="flex flex-col items-center">
              <label
                  htmlFor="image-upload"
                  className="
    w-64 h-64
    border-2 border-dashed border-neutral-300
    rounded-xl
    flex flex-col items-center justify-center
    cursor-pointer
    bg-neutral-50
    hover:bg-neutral-100
    hover:border-rose-400
    transition
  "
              >
                {previewUrl ? (
                    <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-xl"
                    />
                ) : (
                    <>
                      <ImagePlus size={48} className="text-neutral-400 mb-3"/>
                      <p className="font-medium text-neutral-700">
                        Click to upload
                      </p>
                      <p className="text-sm text-neutral-500">
                        PNG or JPG
                      </p>
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
            </div>

            {/* Prompt Input */}
            <input
                type="text"
                placeholder="Mention anything you'd like included"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="p-3 rounded bg-neutral-50 border border-neutral-200 w-full"
            />

            {/* Generate Button */}
            <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full p-3 rounded-xl bg-rose-500 text-white hover:bg-rose-600 font-semibold transition"
            >
              {loading ? "Generating..." : "Generate Post"}
            </button>

            {/* AI Response */}
            {aiResponse && (
                <div className="mt-4 p-4 rounded-lg bg-neutral-50 border border-neutral-200">
                  <h2 className="font-semibold mb-2 text-lg">AI Generated Caption</h2>
                  <p className="whitespace-pre-wrap">{aiResponse}</p>
                </div>
            )}
          </div>
        </div>
      </main>
);
}