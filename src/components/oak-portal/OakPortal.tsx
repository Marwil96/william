import { CSSProperties, useEffect, useRef } from "react";
import { PortalSettings, Simulation, pixelRatio, startPortalLoop } from "./interaction";

type OakPortalProps = {
  fragment: string;
  settings: PortalSettings;
  resolution: number;
  maxPixelRatio?: number;
  createSimulation?: () => Simulation;
  label: string;
  className?: string;
  style?: CSSProperties;
};

const VERTEX = `#version 300 es
in vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
  console.error(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
  return null;
}

function link(gl: WebGL2RenderingContext, fragment: string) {
  const vertexShader = compile(gl, gl.VERTEX_SHADER, VERTEX);
  const fragmentShader = compile(gl, gl.FRAGMENT_SHADER, fragment);
  const program = gl.createProgram();
  if (!vertexShader || !fragmentShader || !program) return null;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);
  if (gl.getProgramParameter(program, gl.LINK_STATUS)) return program;
  console.error(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
  return null;
}

function locate(gl: WebGL2RenderingContext, program: WebGLProgram) {
  const at = (name: string) => gl.getUniformLocation(program, name);
  return {
    res: at("u_res"),
    time: at("u_time"),
    windTime: at("u_wtime"),
    wind: at("u_wind"),
    gust: at("u_gust"),
    grain: at("u_grain"),
    dpr: at("u_dpr"),
    pointer: at("u_pointer"),
    stir: at("u_stir"),
    burst: at("u_burst"),
    look: at("u_look"),
    push: at("u_push"),
    sim: at("u_sim"),
  };
}

export function OakPortal({
  fragment,
  settings,
  resolution,
  maxPixelRatio,
  createSimulation,
  label,
  className,
  style,
}: OakPortalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const settingsRef = useRef(settings);
  const resolutionRef = useRef(resolution);

  useEffect(() => {
    settingsRef.current = settings;
    resolutionRef.current = resolution;
  }, [settings, resolution]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl2", {
      alpha: false,
      antialias: false,
      preserveDrawingBuffer: true,
    });
    if (!canvas || !gl) return;

    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    let locations: ReturnType<typeof locate> | null = null;
    const simulate = createSimulation?.();

    const setup = () => {
      program = link(gl, fragment);
      if (!program) return;
      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 3, -1, -1, 3]),
        gl.STATIC_DRAW
      );
      const position = gl.getAttribLocation(program, "a_position");
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      gl.useProgram(program);
      locations = locate(gl, program);
    };

    const loop = startPortalLoop(
      canvas,
      () => settingsRef.current.speed,
      (frame) => {
        if (!locations) return;
        const { time, windTime, width, height, pointer } = frame;
        const s = settingsRef.current;
        const ratio = pixelRatio(resolutionRef.current, maxPixelRatio);
        const w = Math.max(1, Math.round(width * ratio));
        const h = Math.max(1, Math.round(height * ratio));
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
        }
        const aspect = width / Math.max(height, 1);

        gl.viewport(0, 0, w, h);
        gl.uniform2f(locations.res, w, h);
        gl.uniform1f(locations.time, time);
        gl.uniform1f(locations.windTime, windTime);
        gl.uniform1f(locations.wind, s.wind);
        gl.uniform1f(locations.gust, s.gust);
        gl.uniform1f(locations.grain, s.grain);
        gl.uniform1f(locations.dpr, ratio);
        gl.uniform3f(
          locations.pointer,
          (pointer.x - 0.5) * aspect,
          pointer.y,
          pointer.presence
        );
        gl.uniform1f(locations.stir, pointer.stir);
        gl.uniform3f(
          locations.burst,
          (pointer.burstX - 0.5) * aspect,
          pointer.burstY,
          pointer.burstAge
        );
        gl.uniform1f(locations.push, s.push);
        gl.uniform2f(
          locations.look,
          pointer.lookX * s.parallax,
          pointer.lookY * s.parallax
        );
        if (simulate) gl.uniform4fv(locations.sim, simulate(frame, aspect));
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      },
      Boolean(simulate)
    );

    const onLost = (event: Event) => {
      event.preventDefault();
      loop.stop();
      program = null;
      buffer = null;
      locations = null;
    };
    const onRestored = () => {
      setup();
      loop.start();
    };

    setup();
    canvas.addEventListener("webglcontextlost", onLost);
    canvas.addEventListener("webglcontextrestored", onRestored);

    return () => {
      loop.dispose();
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, [fragment, maxPixelRatio, createSimulation]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={label}
      className={`select-none [-webkit-touch-callout:none] ${className ?? ""}`}
      style={style}
      onContextMenu={(event) => event.preventDefault()}
    />
  );
}
