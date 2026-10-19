
import { useEffect, useRef, useState } from "react";
import "./App.css";

export default function App() {
  const canvasRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState("Ready");
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(1);

  const imageRef = useRef(null);
  const rafRef = useRef(null);
  const runIdRef = useRef(0);

  useEffect(() => {
    const image = new Image();
    image.src = "/maa11.jpg";

    image.onload = () => {
      imageRef.current = image;
      setReady(true);
      renderInitial();
    };

    image.onerror = () => {
      setPhase("Image not found: add public/maa11.jpg");
    };

    function renderInitial() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#fff8ed";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  function startAnimation() {
    const image = imageRef.current;
    const canvas = canvasRef.current;
    if (!image || !canvas) return;

    cancelAnimationFrame(rafRef.current);
    const runId = ++runIdRef.current;
    const ctx = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    const W = canvas.width;
    const H = canvas.height;

    // Prepare the original artwork.
    const sourceCanvas = document.createElement("canvas");
    sourceCanvas.width = W;
    sourceCanvas.height = H;

    const sourceCtx = sourceCanvas.getContext("2d", {
      willReadFrequently: true,
    });

    const scale = Math.min(
      (W - 30) / image.naturalWidth,
      (H - 30) / image.naturalHeight
    );

    const dw = image.naturalWidth * scale;
    const dh = image.naturalHeight * scale;
    const dx = (W - dw) / 2;
    const dy = (H - dh) / 2;

    sourceCtx.fillStyle = "#ffffff";
    sourceCtx.fillRect(0, 0, W, H);
    sourceCtx.drawImage(image, dx, dy, dw, dh);

    const original = sourceCtx.getImageData(0, 0, W, H);
    const lineArt = new ImageData(W, H);
    const colorArt = new ImageData(W, H);

    // Remove the cyan background and keep the dark outlines.
    for (let i = 0; i < original.data.length; i += 4) {
      const r = original.data[i];
      const g = original.data[i + 1];
      const b = original.data[i + 2];
      const darkness = 255 - (r + g + b) / 3;

      const alpha = Math.max(
        0,
        Math.min(255, (darkness - 18) * 3.2)
      );

      lineArt.data[i] = 43;
      lineArt.data[i + 1] = 28;
      lineArt.data[i + 2] = 22;
      lineArt.data[i + 3] = alpha;

      // A warm golden ink version for the color stage.
      colorArt.data[i] = 190;
      colorArt.data[i + 1] = 116;
      colorArt.data[i + 2] = 25;
      colorArt.data[i + 3] = alpha;
    }

    const lineCanvas = document.createElement("canvas");
    lineCanvas.width = W;
    lineCanvas.height = H;
    lineCanvas.getContext("2d").putImageData(lineArt, 0, 0);

    const goldCanvas = document.createElement("canvas");
    goldCanvas.width = W;
    goldCanvas.height = H;
    goldCanvas.getContext("2d").putImageData(colorArt, 0, 0);

    const duration = 9000 / speed;
    const colorDuration = 4500 / speed;
    let start = 0;

    setRunning(true);
    setProgress(0);
    setPhase("Drawing Maa Durga…");

    function frame(now) {
      if (runIdRef.current !== runId) return;
      if (!start) start = now;

      const elapsed = now - start;
      const drawP = Math.min(elapsed / duration, 1);
      const colorP = Math.max(
        0,
        Math.min((elapsed - duration) / colorDuration, 1)
      );

      // Animated sacred background.
      const bg = ctx.createLinearGradient(
        0, 0, W, H
      );
      bg.addColorStop(0, `rgb(${255 - colorP * 10}, ${248 - colorP * 22}, ${230 - colorP * 30})`);
      bg.addColorStop(0.5, `rgb(255, ${245 - colorP * 35}, ${225 - colorP * 45})`);
      bg.addColorStop(1, `rgb(255, ${231 - colorP * 20}, ${197 - colorP * 10})`);

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Moving golden light behind the artwork.
      const pulse = 0.5 + 0.5 * Math.sin(now / 350);
      const glow = ctx.createRadialGradient(
        W / 2, H * 0.42, 10,
        W / 2, H * 0.42, W * 0.58
      );
      glow.addColorStop(0, `rgba(255, 191, 48, ${0.05 + pulse * colorP * 0.23})`);
      glow.addColorStop(0.55, `rgba(255, 121, 24, ${colorP * 0.09})`);
      glow.addColorStop(1, "rgba(255, 150, 30, 0)");

      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);

      // Draw the artwork from top to bottom.
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, W, H * drawP);
      ctx.clip();
      ctx.drawImage(lineCanvas, 0, 0);
      ctx.restore();

      if (drawP >= 1) {
        // Automatic golden color stage.
        ctx.save();
        ctx.globalAlpha = colorP * 0.88;
        ctx.globalCompositeOperation = "source-over";
        ctx.drawImage(goldCanvas, 0, 0);
        ctx.restore();

        // Preserve dark ink details above the color.
        ctx.save();
        ctx.globalAlpha = 1;
        ctx.drawImage(lineCanvas, 0, 0);
        ctx.restore();
      }

      // Sparkles and rays appear during the color stage.
      if (drawP >= 1) {
        const amount = Math.floor(colorP * 30);

        for (let i = 0; i < amount; i++) {
          const x = (i * 137 + 41) % W;
          const y = (i * 193 + 73) % H;
          const twinkle = 0.4 + 0.6 * Math.abs(
            Math.sin(now / 250 + i)
          );

          ctx.globalAlpha = colorP * twinkle;
          ctx.fillStyle = "#ffd65a";
          ctx.beginPath();
          ctx.arc(x, y, 1 + twinkle * 2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.globalAlpha = 1;
      }

      const totalP = drawP * 0.7 + colorP * 0.3;
      setProgress(Math.round(totalP * 100));

      if (colorP < 1) {
        setPhase(drawP < 1 ? "Drawing outlines…" : "Adding divine colours and light…");
        rafRef.current = requestAnimationFrame(frame);
      } else {
        setPhase("Jai Maa Durga! 🙏");
        setProgress(100);
        setRunning(false);
      }
    }

    rafRef.current = requestAnimationFrame(frame);
  }

  return (
    <main className="page">
      <div className="om">ॐ</div>
      <p className="eyebrow">DIVINE DRAWING EXPERIENCE</p>
      <h1>Maa Durga</h1>
      <p className="subtitle">
        Draw • Colour • Glow • Celebrate
      </p>

      <section className="card">
        <div className="art-frame">
          <canvas
            ref={canvasRef}
            width={700}
            height={850}
          />
          {!ready && (
            <div className="loading">
              Loading Maa Durga…
            </div>
          )}
        </div>

        <div className="progress-info">
          <span>{phase}</span>
          <span>{progress}%</span>
        </div>

        <div className="progress-track">
          <div style={{ width: `${progress}%` }} />
        </div>

        <div className="controls">
          <label>
            Animation speed
            <select
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              disabled={running}
            >
              <option value={0.6}>Slow</option>
              <option value={1}>Normal</option>
              <option value={1.5}>Fast</option>
            </select>
          </label>

          <button
            onClick={startAnimation}
            disabled={!ready || running}
          >
            {running ? "Please wait…" : "✨ Start Drawing"}
          </button>
        </div>
      </section>

      <footer>॥ जय माता दी ॥</footer>
    </main>
  );
}
