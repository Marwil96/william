import React, { useEffect, useRef, useState, useCallback } from "react";

const GLYPHS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*+=-~<>[]{}|/\\";

// WM bitmap - '#' = on, ' ' = off
const WM_BITMAP = [
  "##                  ##       ##        ##",
  "##                  ##       ###      ###",
  "##                  ##       ####    ####",
  "##                  ##       ## ##  ## ##",
  "##                  ##       ##  ####  ##",
  "##                  ##       ##   ##   ##",
  "##                  ##       ##        ##",
  "##                  ##       ##        ##",
  "##       ##       ##         ##        ##",
  "##       ##       ##         ##        ##",
  " ##      ##      ##          ##        ##",
  " ##      ##      ##          ##        ##",
  " ##     ####     ##          ##        ##",
  "  ##    ####    ##           ##        ##",
  "  ##    ####    ##           ##        ##",
  "  ##   ##  ##   ##           ##        ##",
  "   ##  ##  ##  ##            ##        ##",
  "   ##  ##  ##  ##            ##        ##",
  "   ## ##    ## ##            ##        ##",
  "    ####    ####             ##        ##",
  "    ####    ####             ##        ##",
  "    ###      ###             ##        ##",
  "     ##      ##              ##        ##",
  "     ##      ##              ##        ##",
];

const BITMAP_ROWS = WM_BITMAP.length;
const BITMAP_COLS = Math.max(...WM_BITMAP.map((r) => r.length));

function randomGlyph(): string {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

function randomOpacity(): number {
  return 0.7 + Math.random() * 0.3;
}

// Push radius in grid cells
const PUSH_RADIUS = 4;
const PUSH_STRENGTH = 2.5;
const RETURN_SPEED = 0.08;

interface CellData {
  glyph: string;
  opacity: number;
  nextSwap: number;
  // Displacement from push interaction
  dx: number;
  dy: number;
}

export default function AsciiHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ cols: 0, rows: 0 });
  const cellDataRef = useRef<CellData[]>([]);
  const onCellsRef = useRef<number[]>([]);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  const measure = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    const targetHeight = rect.height;
    const targetWidth = rect.width;

    const cellH = Math.floor(targetHeight / BITMAP_ROWS);
    const cellW = Math.floor(cellH * 0.6);

    const scaledWidth = cellW * BITMAP_COLS;
    let finalCellW = cellW;
    let finalCellH = cellH;

    if (scaledWidth > targetWidth) {
      finalCellW = Math.floor(targetWidth / BITMAP_COLS);
      finalCellH = Math.floor(finalCellW / 0.6);
    }

    const cols = BITMAP_COLS;
    const rows = BITMAP_ROWS;

    setDimensions({ cols, rows });

    if (canvasRef.current) {
      const dpr = window.devicePixelRatio || 1;
      const canvasW = finalCellW * cols;
      const canvasH = finalCellH * rows;
      canvasRef.current.width = canvasW * dpr;
      canvasRef.current.height = canvasH * dpr;
      canvasRef.current.style.width = `${canvasW}px`;
      canvasRef.current.style.height = `${canvasH}px`;

      (canvasRef.current as any)._cellW = finalCellW;
      (canvasRef.current as any)._cellH = finalCellH;
      (canvasRef.current as any)._dpr = dpr;
    }

    const totalCells = cols * rows;
    const now = performance.now();
    const cells: CellData[] = [];
    const onCells: number[] = [];

    for (let i = 0; i < totalCells; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const isOn = WM_BITMAP[row]?.[col] === "#";

      cells.push({
        glyph: isOn ? randomGlyph() : " ",
        opacity: isOn ? randomOpacity() : 0,
        nextSwap: isOn ? now + 200 + Math.random() * 600 : Infinity,
        dx: 0,
        dy: 0,
      });

      if (isOn) onCells.push(i);
    }

    cellDataRef.current = cells;
    onCellsRef.current = onCells;
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // Mouse tracking
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseleave", handleLeave);
    return () => {
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseleave", handleLeave);
    };
  }, [dimensions]);

  // Animation loop
  useEffect(() => {
    if (dimensions.cols === 0) return;

    let animId: number;
    let lastRender = 0;

    const render = (time: number) => {
      animId = requestAnimationFrame(render);

      if (time - lastRender < 33) return;
      lastRender = time;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const cellW = (canvas as any)._cellW as number;
      const cellH = (canvas as any)._cellH as number;
      const dpr = (canvas as any)._dpr as number;
      const cells = cellDataRef.current;
      const onCells = onCellsRef.current;
      const cols = dimensions.cols;
      const mouse = mouseRef.current;

      // Convert mouse position to grid coordinates
      const mouseGridX = mouse.x / cellW;
      const mouseGridY = mouse.y / cellH;

      // Update glyphs and push displacement
      for (let k = 0; k < onCells.length; k++) {
        const i = onCells[k];
        const cell = cells[i];

        // Glyph swap
        if (time >= cell.nextSwap) {
          cell.glyph = randomGlyph();
          cell.opacity = randomOpacity();
          cell.nextSwap = time + 200 + Math.random() * 600;
        }

        const row = Math.floor(i / cols);
        const col = i % cols;

        // Push from mouse
        if (mouse.active) {
          const distX = col - mouseGridX;
          const distY = row - mouseGridY;
          const dist = Math.sqrt(distX * distX + distY * distY);

          if (dist < PUSH_RADIUS && dist > 0.1) {
            const force = (1 - dist / PUSH_RADIUS) * PUSH_STRENGTH;
            const nx = distX / dist;
            const ny = distY / dist;
            cell.dx += nx * force;
            cell.dy += ny * force;
          }
        }

        // Spring back to origin
        cell.dx *= 1 - RETURN_SPEED;
        cell.dy *= 1 - RETURN_SPEED;

        // Snap to zero when close enough
        if (Math.abs(cell.dx) < 0.01) cell.dx = 0;
        if (Math.abs(cell.dy) < 0.01) cell.dy = 0;
      }

      // Clear and draw
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      const fontSize = Math.floor(cellH * 0.85);
      ctx.font = `${fontSize}px Inconsolata, monospace`;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";

      for (let k = 0; k < onCells.length; k++) {
        const i = onCells[k];
        const cell = cells[i];
        const row = Math.floor(i / cols);
        const col = i % cols;

        ctx.globalAlpha = cell.opacity;
        ctx.fillStyle = "#F7F7F7";
        ctx.fillText(
          cell.glyph,
          col * cellW + cellW / 2 + cell.dx * cellW,
          row * cellH + cellH / 2 + cell.dy * cellH
        );
      }

      ctx.restore();
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [dimensions]);

  return (
    <div
      ref={containerRef}
      className="w-full flex items-center justify-center"
      style={{ height: "75vh" }}
    >
      <canvas ref={canvasRef} className="cursor-default" />
    </div>
  );
}
