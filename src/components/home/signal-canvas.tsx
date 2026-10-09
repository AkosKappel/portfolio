"use client";

import { useEffect, useRef, useState } from "react";

/*
  Stacked signal channels in the style of an EEG viewer. Left of the sweep line the
  trace is "cleaned", right of it you see the raw, noisy input. Everything is computed
  in the vertex shader, so the CPU only updates a few uniforms per frame.
*/

const CHANNELS = 6;
const SAMPLES = 420;
const REST_SWEEP = 0.62;
const LINE_WIDTH = 2.2;

const vertexShader = `#version 300 es
in float a_x;
in float a_side;
uniform float u_channel;
uniform float u_time;
uniform float u_sweep;
uniform vec2 u_size;
uniform float u_width;
out float v_side;
out float v_clean;

float hash(float n) { return fract(sin(n) * 43758.5453123); }
float noise(float x) {
  float i = floor(x);
  float f = fract(x);
  return mix(hash(i), hash(i + 1.0), f * f * (3.0 - 2.0 * f));
}

float cleanSignal(float x, float c) {
  float t = u_time;
  return 0.55 * sin(x * (9.0 + c * 1.3) + t * (0.9 + c * 0.07) + c * 1.7)
       + 0.28 * sin(x * (23.0 + c * 2.1) - t * 1.4 + c)
       + 0.12 * sin(x * 61.0 + t * 2.3 + c * 2.9);
}

float rawSignal(float x, float c) {
  float t = u_time;
  float hiss = (noise(x * 140.0 + t * 9.0 + c * 31.0) - 0.5) * 0.9;
  float drift = 0.35 * sin(x * 3.0 + t * 0.4 + c * 2.2);
  float d = (fract(x * 0.9 + t * 0.05 + c * 0.37) - 0.5) * 18.0;
  float blink = 1.4 * exp(-d * d) * step(2.5, c) * step(c, 3.5);
  return cleanSignal(x, c) + hiss + drift + blink;
}

vec2 toPixels(float x) {
  float k = 1.0 - smoothstep(u_sweep - 0.025, u_sweep + 0.025, x);
  float y = mix(rawSignal(x, u_channel), cleanSignal(x, u_channel), k);
  float lane = u_size.y / ${CHANNELS}.0;
  float baseline = (u_channel + 0.5) * lane;
  return vec2(x * u_size.x, baseline + y * lane * 0.3);
}

void main() {
  float eps = 1.0 / ${SAMPLES}.0;
  vec2 p = toPixels(a_x);
  vec2 tangent = normalize(toPixels(a_x + eps) - toPixels(a_x - eps) + vec2(1e-4, 0.0));
  vec2 normal = vec2(-tangent.y, tangent.x);
  vec2 pos = p + normal * a_side * u_width * 0.5;
  vec2 clip = pos / u_size * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
  v_side = a_side;
  v_clean = 1.0 - smoothstep(u_sweep - 0.025, u_sweep + 0.025, a_x);
}`;

const fragmentShader = `#version 300 es
precision mediump float;
in float v_side;
in float v_clean;
uniform vec3 u_raw;
uniform vec3 u_cleanColor;
out vec4 color;

void main() {
  float edge = 1.0 - smoothstep(0.55, 1.0, abs(v_side));
  vec3 rgb = mix(u_raw, u_cleanColor, v_clean);
  float alpha = mix(0.8, 1.0, v_clean) * edge;
  color = vec4(rgb * alpha, alpha);
}`;

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Could not create shader");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) ?? "Shader failed to compile");
  }
  return shader;
}

function createProgram(gl: WebGL2RenderingContext) {
  const program = gl.createProgram();
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, vertexShader));
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, fragmentShader));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program) ?? "Program failed to link");
  }
  return program;
}

/** Without a GPU, WebGL runs on the CPU; an endless animation would then slow the whole page. */
function isSoftwareRenderer(gl: WebGL2RenderingContext) {
  const info = gl.getExtension("WEBGL_debug_renderer_info");
  const renderer = String(gl.getParameter(info ? info.UNMASKED_RENDERER_WEBGL : gl.RENDERER));
  return /swiftshader|llvmpipe|software|basic render/i.test(renderer);
}

function readColor(name: string): [number, number, number] {
  const probe = document.createElement("span");
  probe.style.color = `var(${name})`;
  document.body.appendChild(probe);
  const [r, g, b] = getComputedStyle(probe)
    .color.match(/\d+(\.\d+)?/g)
    ?.map(Number) ?? [0, 0, 0];
  probe.remove();
  return [r / 255, g / 255, b / 255];
}

export function SignalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sweepLineRef = useRef<HTMLDivElement>(null);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", { antialias: true, premultipliedAlpha: true });
    if (!gl) {
      setSupported(false);
      return;
    }

    let program: WebGLProgram;
    try {
      program = createProgram(gl);
    } catch (error) {
      console.error(error);
      setSupported(false);
      return;
    }

    // Two vertices per sample (one on each side of the line) form a triangle strip.
    const vertices = new Float32Array(SAMPLES * 4);
    for (let i = 0; i < SAMPLES; i++) {
      const x = i / (SAMPLES - 1);
      vertices.set([x, -1, x, 1], i * 4);
    }
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const xLocation = gl.getAttribLocation(program, "a_x");
    const sideLocation = gl.getAttribLocation(program, "a_side");
    gl.enableVertexAttribArray(xLocation);
    gl.vertexAttribPointer(xLocation, 1, gl.FLOAT, false, 8, 0);
    gl.enableVertexAttribArray(sideLocation);
    gl.vertexAttribPointer(sideLocation, 1, gl.FLOAT, false, 8, 4);

    // biome-ignore lint/correctness/useHookAtTopLevel: WebGL method, not a React hook
    gl.useProgram(program);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    const uniform = (name: string) => gl.getUniformLocation(program, name);
    const u = {
      channel: uniform("u_channel"),
      time: uniform("u_time"),
      sweep: uniform("u_sweep"),
      size: uniform("u_size"),
      width: uniform("u_width"),
      raw: uniform("u_raw"),
      clean: uniform("u_cleanColor"),
    };

    const applyColors = () => {
      gl.uniform3fv(u.raw, readColor("--raw"));
      gl.uniform3fv(u.clean, readColor("--clean"));
    };
    applyColors();

    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(u.size, canvas.width, canvas.height);
      gl.uniform1f(u.width, LINE_WIDTH * dpr);
    };
    resize();

    // A still frame that only redraws when the pointer moves the filter.
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches || isSoftwareRenderer(gl);
    let sweep = still ? REST_SWEEP : 0;
    let target = REST_SWEEP;
    let time = 0;
    let last = performance.now();
    let frame = 0;
    let visible = true;
    let ready = false;

    const draw = () => {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(u.time, time);
      gl.uniform1f(u.sweep, sweep);
      for (let channel = 0; channel < CHANNELS; channel++) {
        gl.uniform1f(u.channel, channel);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, SAMPLES * 2);
      }
      if (sweepLineRef.current) sweepLineRef.current.style.left = `${sweep * 100}%`;
    };

    const tick = (now: number) => {
      const delta = Math.min((now - last) / 1000, 0.05);
      last = now;
      time += delta;
      sweep += (target - sweep) * (1 - Math.exp(-delta * 3.2));
      draw();
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (still || !ready || frame || !visible || document.hidden) return;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      target = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
      if (still) {
        sweep = target;
        draw();
      }
    };
    const onPointerLeave = () => {
      target = REST_SWEEP;
      if (still) {
        sweep = target;
        draw();
      }
    };

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    intersection.observe(canvas);
    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw();
    });
    resizeObserver.observe(canvas);
    const themeObserver = new MutationObserver(() => {
      applyColors();
      draw();
    });
    themeObserver.observe(document.documentElement, { attributeFilter: ["data-theme"] });
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);
    const surface = canvas.parentElement ?? canvas;
    surface.addEventListener("pointermove", onPointerMove);
    surface.addEventListener("pointerleave", onPointerLeave);

    draw();
    // Start animating once the page has loaded and the main thread is idle.
    const idle =
      window.requestIdleCallback ?? ((callback: () => void) => setTimeout(callback, 200));
    const begin = () =>
      idle(() => {
        ready = true;
        start();
      });
    if (document.readyState === "complete") begin();
    else window.addEventListener("load", begin, { once: true });

    return () => {
      stop();
      window.removeEventListener("load", begin);
      intersection.disconnect();
      resizeObserver.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      surface.removeEventListener("pointermove", onPointerMove);
      surface.removeEventListener("pointerleave", onPointerLeave);
      gl.deleteBuffer(buffer);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(program);
    };
  }, []);

  if (!supported) return null;

  return (
    <div className="relative h-full w-full touch-pan-y">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
      <div
        ref={sweepLineRef}
        className="pointer-events-none absolute inset-y-0 w-px bg-ink/25"
        style={{ left: `${REST_SWEEP * 100}%` }}
        aria-hidden
      />
    </div>
  );
}
