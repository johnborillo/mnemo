"use client";

import { CreateMLCEngine } from "@mlc-ai/web-llm";
import { useEffect, useState } from "react";

export default function WebLLM() {
  const [engine, setEngine] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState("");

  useEffect(() => {
    async function initWebLLM() {
      const initProgressCallback = (progress) => {
        setLoadingProgress(progress.text);
        console.log("Model loading progress:", progress);
      };

      const mlcEngine = await CreateMLCEngine("TinyLlama-1.1B-Chat-v1.0-q4f16_1-MLC-1k", { initProgressCallback });
      setEngine(mlcEngine);
    }

    initWebLLM();
  }, []);


  return (
    <div>
      {engine ? (
        <p>WebLLM Engine Loaded!</p>
      ) : (
        <p>Loading WebLLM Engine: {loadingProgress}</p>
      )}
    </div>
  );
}
