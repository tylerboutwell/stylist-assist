"use client";

import { useState } from "react";

export default function CreatePostPage() {
  const [image, setImage] = useState<File | null>(null);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");

  const handleSubmit = async () => {
    if (!image) {
      alert("Please upload an image");
      return;
    }

    setLoading(true);

    // Fake AI response for now
    setTimeout(() => {
      setAiResponse(
        "✨ Your AI-generated caption will appear here! Add hashtags, a fun description, and a call-to-action for your post."
      );
      setLoading(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white flex flex-col items-center px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Generate a Social Media Post
      </h1>

      <div className="w-full max-w-xl bg-neutral-900 rounded-2xl p-6 shadow-lg flex flex-col gap-6">
        {/* Image Upload */}
        <div className="flex flex-col items-center">
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="w-64 h-64 object-cover rounded-lg mb-4 border border-neutral-700"
            />
          ) : (
            <div className="w-64 h-64 flex items-center justify-center bg-neutral-800 rounded-lg border border-dashed border-neutral-700 text-neutral-400 mb-4">
              No image selected
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="text-sm text-neutral-300"
          />
        </div>

        {/* Prompt Input */}
        <input
          type="text"
          placeholder="Optional: style, mood, hashtags..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="p-3 rounded bg-neutral-800 border border-neutral-700 text-white w-full"
        />

        {/* Generate Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full p-3 rounded-xl bg-white text-black font-semibold hover:bg-neutral-200 transition"
        >
          {loading ? "Generating..." : "Generate Post"}
        </button>

        {/* AI Response */}
        {aiResponse && (
          <div className="mt-4 p-4 bg-neutral-800 rounded-lg border border-neutral-700">
            <h2 className="font-semibold mb-2 text-lg">AI Generated Caption</h2>
            <p className="whitespace-pre-wrap text-neutral-200">{aiResponse}</p>
          </div>
        )}
      </div>
    </main>
  );
}