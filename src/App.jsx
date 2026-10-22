
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Play, Pause, RotateCcw, Trophy, Volume2, VolumeX,
  ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Zap, Home
} from "lucide-react";
import "./App.css";

const SIZE = 20;
const INITIAL_SNAKE = [
  { x: 8, y: 10 },
  { x: 7, y: 10 },
  { x: 6, y: 10 },
];

function randomFood(snake) {
  let food;
  do {
    food = {
      x: Math.floor(Math.random() * SIZE),
      y: Math.floor(Math.random() * SIZE),
    };
  } while (snake.some(s => s.x === food.x && s.y === food.y));
  return food;
}

function readHighScore() {
  try {
    return Number(localStorage.getItem("snake-high-score") || 0);
  } catch {
    return 0;
  }
}

export default function App() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(() => randomFood(INITIAL_SNAKE));
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(readHighScore);
  const [status, setStatus] = useState("ready");
  const [soundOn, setSoundOn] = useState(true);
  const [speed, setSpeed] = useState(150);

  const snakeRef = useRef(snake);
  const directionRef = useRef(direction);
  const foodRef = useRef(food);
  const statusRef = useRef(status);
  const scoreRef = useRef(0);
  const soundRef = useRef(soundOn);
  const lastDirectionRef = useRef(direction);

  useEffect(() => { snakeRef.current = snake; }, [snake]);
  useEffect(() => { directionRef.current = direction; }, [direction]);
  useEffect(() => { foodRef.current = food; }, [food]);
  useEffect(() => { statusRef.current = status; }, [status]);
  useEffect(() => { soundRef.current = soundOn; }, [soundOn]);

  const tone = useCallback((frequency = 440, duration = 0.08) => {
    if (!soundRef.current) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      const audio = new AudioContextClass();
      const oscillator = audio.createOscillator();
      const gain = audio.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.06, audio.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + duration);
      oscillator.connect(gain);
      gain.connect(audio.destination);
      oscillator.start();
      oscillator.stop(audio.currentTime + duration);
      oscillator.onended = () => audio.close();
    } catch {
      // Audio is optional.
    }
  }, []);

  const startGame = useCallback(() => {
    const initial = [
      { x: 8, y: 10 },
      { x: 7, y: 10 },
      { x: 6, y: 10 },
    ];
    const initialFood = randomFood(initial);

    snakeRef.current = initial;
    directionRef.current = { x: 1, y: 0 };
    lastDirectionRef.current = { x: 1, y: 0 };
    foodRef.current = initialFood;
    scoreRef.current = 0;
    statusRef.current = "playing";

    setSnake(initial);
    setFood(initialFood);
    setDirection({ x: 1, y: 0 });
    setScore(0);
    setSpeed(150);
    setStatus("playing");
    tone(520, 0.1);
  }, [tone]);

  const changeDirection = useCallback((next) => {
    const current = directionRef.current;
    const previous = lastDirectionRef.current;

    // Prevent reversing into the snake's own body.
    if (next.x === -previous.x && next.y === -previous.y) return;

    // Avoid multiple contradictory turns before the next movement tick.
    if (next.x !== 0 && current.x !== 0) return;
    if (next.y !== 0 && current.y !== 0) return;

    directionRef.current = next;
    setDirection(next);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      const key = event.key.toLowerCase();
      const directions = {
        arrowup: { x: 0, y: -1 },
        w: { x: 0, y: -1 },
        arrowdown: { x: 0, y: 1 },
        s: { x: 0, y: 1 },
        arrowleft: { x: -1, y: 0 },
        a: { x: -1, y: 0 },
        arrowright: { x: 1, y: 0 },
        d: { x: 1, y: 0 },
      };

      if (key.startsWith("arrow") || key === " ") event.preventDefault();

      if (directions[key]) {
        if (statusRef.current === "ready") {
          startGame();
        }
        changeDirection(directions[key]);
      }

      if (key === " " || key === "enter") {
        if (statusRef.current === "ready" || statusRef.current === "over") {
          startGame();
        } else if (statusRef.current === "playing") {
          statusRef.current = "paused";
          setStatus("paused");
        } else if (statusRef.current === "paused") {
          statusRef.current = "playing";
          setStatus("playing");
        }
      }

      if (key === "p" && statusRef.current === "playing") {
        statusRef.current = "paused";
        setStatus("paused");
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [changeDirection, startGame]);

  useEffect(() => {
    if (status !== "playing") return;

    const timer = window.setInterval(() => {
      const currentSnake = snakeRef.current;
      const currentDirection = directionRef.current;
      const currentFood = foodRef.current;

      const head = {
        x: currentSnake[0].x + currentDirection.x,
        y: currentSnake[0].y + currentDirection.y,
      };

      const eating = head.x === currentFood.x && head.y === currentFood.y;
      const bodyToCheck = eating ? currentSnake : currentSnake.slice(0, -1);

      const hitWall =
        head.x < 0 || head.x >= SIZE ||
        head.y < 0 || head.y >= SIZE;

      const hitBody = bodyToCheck.some(
        part => part.x === head.x && part.y === head.y
      );

      if (hitWall || hitBody) {
        statusRef.current = "over";
        setStatus("over");
        tone(150, 0.3);
        return;
      }

      const nextSnake = [head, ...currentSnake];
      if (!eating) nextSnake.pop();

      snakeRef.current = nextSnake;
      lastDirectionRef.current = currentDirection;
      setSnake(nextSnake);

      if (eating) {
        const nextScore = scoreRef.current + 10;
        scoreRef.current = nextScore;
        setScore(nextScore);

        const nextFood = randomFood(nextSnake);
        foodRef.current = nextFood;
        setFood(nextFood);
        tone(680, 0.07);

        if (nextScore > highScore) {
          setHighScore(nextScore);
          try {
            localStorage.setItem("snake-high-score", String(nextScore));
          } catch {
            // High-score saving is optional.
          }
        }

        setSpeed(Math.max(65, 150 - Math.floor(nextScore / 50) * 8));
      }
    }, speed);

    return () => window.clearInterval(timer);
  }, [status, speed, highScore, tone]);

  const control = (next) => {
    if (status === "ready" || status === "over") startGame();
    changeDirection(next);
  };

  const togglePause = () => {
    if (status === "ready" || status === "over") return;
    const next = status === "playing" ? "paused" : "playing";
    statusRef.current = next;
    setStatus(next);
  };

  const cellClass = (x, y) => {
    const index = snake.findIndex(part => part.x === x && part.y === y);

    if (index === 0) return "cell snake-head";
    if (index > 0) return "cell snake-body";
    if (food.x === x && food.y === y) return "cell food";
    return "cell";
  };

  return (
    <main className="page">
      <header className="topbar">
        <button className="logo" onClick={startGame}>
          <span className="logo-icon">🐍</span>
          <span>SNAKE<span className="logo-accent">ZONE</span></span>
        </button>
        <div className="top-actions">
          <button className="icon-btn" onClick={() => setSoundOn(s => !s)} aria-label="Toggle sound">
            {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
          <span className="status-pill"><i /> ARCADE MODE</span>
        </div>
      </header>

      <section className="hero">
        <span className="eyebrow"><Zap size={14} /> CLASSIC ARCADE • NEW ENERGY</span>
        <h1>SLITHER.<br /><span>SNACK.</span> SURVIVE.</h1>
        <p>Eat the food. Grow your snake. Beat your best score.</p>
      </section>

      <section className="stats">
        <div className="stat-card">
          <span className="stat-icon">🎯</span>
          <div><small>CURRENT SCORE</small><strong>{String(score).padStart(3, "0")}</strong></div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🏆</span>
          <div><small>PERSONAL BEST</small><strong>{String(highScore).padStart(3, "0")}</strong></div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🐍</span>
          <div><small>SNAKE LENGTH</small><strong>{String(snake.length).padStart(2, "0")}</strong></div>
        </div>
      </section>

      <section className="game-layout">
        <div className="game-panel">
          <div className="game-header">
            <div><span className="live-dot" /> <strong>THE GRID</strong></div>
            <span className="game-mode">{status === "playing" ? "IN PROGRESS" : status === "paused" ? "PAUSED" : status === "over" ? "GAME OVER" : "READY TO PLAY"}</span>
          </div>

          <div className="board-wrap">
            <div className="board" style={{ "--size": SIZE }}>
              {Array.from({ length: SIZE * SIZE }, (_, i) => {
                const x = i % SIZE;
                const y = Math.floor(i / SIZE);
                return (
                  <div key={i} className={cellClass(x, y)}>
                    {snake[0].x === x && snake[0].y === y && (
                      <span className={`eyes ${direction.x === -1 ? "face-left" : direction.y === -1 ? "face-up" : direction.y === 1 ? "face-down" : ""}`}>
                        <i /><i />
                      </span>
                    )}
                    {food.x === x && food.y === y && <span className="food-dot">✦</span>}
                  </div>
                );
              })}

              {status !== "playing" && (
                <div className="overlay">
                  <div className="overlay-icon">{status === "over" ? "💥" : status === "paused" ? "⏸️" : "🐍"}</div>
                  <h2>{status === "over" ? "GAME OVER" : status === "paused" ? "PAUSED" : "READY TO SLITHER?"}</h2>
                  <p>{status === "over" ? `You scored ${score} points!` : status === "paused" ? "Take a breath. Your snake is waiting." : "Your next high score starts here."}</p>
                  <button className="primary-btn" onClick={status === "paused" ? togglePause : startGame}>
                    {status === "paused" ? <Play size={18} /> : status === "over" ? <RotateCcw size={18} /> : <Play size={18} />}
                    {status === "paused" ? "RESUME" : status === "over" ? "PLAY AGAIN" : "START GAME"}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="game-controls">
            <div className="keyboard-hint">
              <span className="keycap">↑</span>
              <span className="keycap">←</span>
              <span className="keycap">↓</span>
              <span className="keycap">→</span>
              <small>MOVE</small>
            </div>
            <button className="secondary-btn" onClick={togglePause} disabled={status === "ready" || status === "over"}>
              {status === "paused" ? <Play size={15} /> : <Pause size={15} />}
              {status === "paused" ? "RESUME" : "PAUSE"}
            </button>
            <button className="secondary-btn" onClick={startGame}><RotateCcw size={15} /> RESTART</button>
          </div>
        </div>

        <aside className="side-panel">
          <div className="side-card">
            <div className="side-heading"><span>🎮</span><h3>CONTROLS</h3></div>
            <div className="control-row"><span>Move</span><strong>↑ ↓ ← →</strong></div>
            <div className="control-row"><span>Alternative</span><strong>W A S D</strong></div>
            <div className="control-row"><span>Pause / Resume</span><strong>SPACE</strong></div>
          </div>

          <div className="side-card">
            <div className="side-heading"><span>⚡</span><h3>GAME RULES</h3></div>
            <div className="rule"><i className="rule-green" /><p>Eat glowing food to grow and earn 10 points.</p></div>
            <div className="rule"><i className="rule-pink" /><p>Don't hit the walls or your own tail.</p></div>
            <div className="rule"><i className="rule-yellow" /><p>Your snake speeds up as your score rises.</p></div>
          </div>

          <div className="side-card best-card">
            <Trophy size={24} />
            <small>YOUR PERSONAL BEST</small>
            <strong>{highScore}</strong>
            <span>{score >= highScore && score > 0 ? "NEW RECORD! KEEP GOING!" : "Can you beat your record?"}</span>
          </div>
        </aside>
      </section>

      <section className="mobile-controls">
        <button onClick={() => control({ x: 0, y: -1 })} aria-label="Up"><ArrowUp /></button>
        <div>
          <button onClick={() => control({ x: -1, y: 0 })} aria-label="Left"><ArrowLeft /></button>
          <button onClick={() => control({ x: 0, y: 1 })} aria-label="Down"><ArrowDown /></button>
          <button onClick={() => control({ x: 1, y: 0 })} aria-label="Right"><ArrowRight /></button>
        </div>
      </section>

      <footer>
        <span><span className="footer-snake">🐍</span> SNAKEZONE</span>
        <span>One more round. One more record.</span>
        <span>BUILT FOR ARCADE LOVERS</span>
      </footer>
    </main>
  );
}
