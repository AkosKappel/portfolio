"use client";

import { useEffect, useRef } from "react";

/*
  A light field of particles along the left and right edges of the page, drifting
  upwards and moving aside around the pointer. Positions are computed in the vertex
  shader from a fixed seed per particle, so each frame only updates a few uniforms.
*/

const COUNT = 220;
/** Share of the page width each side's band covers; the centre stays clear for content. */
const BAND = 0.24;
const POINTER_RADIUS = 150;
const AWAY = -1e5;

const vertexShader = `#version 300 es
in vec4 a_seed;
uniform vec2 u_size;
uniform float u_time;
uniform float u_scroll;
uniform vec2 u_pointer;
uniform float u_dpr;
out float v_alpha;

void main() {
  bool left = a_seed.x < 0.5;
  float depth = left ? a_seed.x * 2.0 : (a_seed.x - 0.5) * 2.0;
  float x = depth * depth * ${BAND};
  x = left ? x : 1.0 - x;

  float speed = 4.0 + a_seed.z * 12.0;
  float travel = u_time * speed + u_scroll * (0.1 + a_seed.z * 0.25);
  float span = u_size.y + 40.0 * u_dpr;
  vec2 p = vec2(
    x * u_size.x + sin(u_time * 0.25 + a_seed.w * 6.2832) * 14.0 * u_dpr,
    mod(a_seed.y * span - travel * u_dpr, span) - 20.0 * u_dpr
  );

  vec2 away = p - u_pointer;
  float push = smoothstep(${POINTER_RADIUS}.0 * u_dpr, 0.0, length(away));
  p += normalize(away + 1e-4) * push * 70.0 * u_dpr;

  vec2 clip = p / u_size * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
  gl_PointSize = (2.5 + a_seed.z * 4.5) * u_dpr;
  v_alpha = (0.3 + 0.45 * a_seed.w) * (1.0 - depth * 0.6) + push * 0.4;
}`;

const fragmentShader = `#version 300 es
precision mediump float;
in float v_alpha;
uniform vec3 u_color;
out vec4 color;

void main() {
  float alpha = smoothstep(0.5, 0.1, length(gl_PointCoord - 0.5)) * v_alpha;
  color = vec4(u_color * alpha, alpha);
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

function accentColor(): [number, number, number] {
  const probe = document.createElement("span");
  probe.style.color = "var(--accent)";
  document.body.appendChild(probe);
  const [r, g, b] = getComputedStyle(probe)
    .color.match(/\d+(\.\d+)?/g)
    ?.map(Number) ?? [0, 0, 0];
  probe.remove();
  return [r / 255, g / 255, b / 255];
}

/** Runs only on wide screens with a fine pointer and without a reduced-motion request. */
const ENABLED_QUERY =
  "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const query = matchMedia(ENABLED_QUERY);
    if (!canvas) return;

    let teardown: (() => void) | null = null;

    const setup = () => {
      const gl = canvas.getContext("webgl2", { antialias: false, premultipliedAlpha: true });
      if (!gl || isSoftwareRenderer(gl)) return null;

      let program: WebGLProgram;
      try {
        program = createProgram(gl);
      } catch (error) {
        console.error(error);
        return null;
      }

      const seeds = new Float32Array(COUNT * 4);
      for (let i = 0; i < seeds.length; i++) seeds[i] = Math.random();
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, seeds, gl.STATIC_DRAW);
      const vao = gl.createVertexArray();
      gl.bindVertexArray(vao);
      const seedLocation = gl.getAttribLocation(program, "a_seed");
      gl.enableVertexAttribArray(seedLocation);
      gl.vertexAttribPointer(seedLocation, 4, gl.FLOAT, false, 0, 0);

      // biome-ignore lint/correctness/useHookAtTopLevel: WebGL method, not a React hook
      gl.useProgram(program);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      const uniform = (name: string) => gl.getUniformLocation(program, name);
      const u = {
        size: uniform("u_size"),
        time: uniform("u_time"),
        scroll: uniform("u_scroll"),
        pointer: uniform("u_pointer"),
        dpr: uniform("u_dpr"),
        color: uniform("u_color"),
      };

      let dpr = 1;
      const resize = () => {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(window.innerWidth * dpr);
        canvas.height = Math.round(window.innerHeight * dpr);
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(u.size, canvas.width, canvas.height);
        gl.uniform1f(u.dpr, dpr);
      };
      resize();
      const applyColor = () => gl.uniform3fv(u.color, accentColor());
      applyColor();

      // The pointer eases towards its target so particles glide aside instead of jumping.
      const pointer = { x: AWAY, y: AWAY };
      const target = { x: AWAY, y: AWAY };
      let time = 0;
      let last = performance.now();
      let frame = 0;

      const tick = (now: number) => {
        const delta = Math.min((now - last) / 1000, 0.05);
        last = now;
        time += delta;
        const ease = 1 - Math.exp(-delta * 8);
        pointer.x += (target.x - pointer.x) * ease;
        pointer.y += (target.y - pointer.y) * ease;
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.uniform1f(u.time, time);
        gl.uniform1f(u.scroll, window.scrollY);
        gl.uniform2f(u.pointer, pointer.x * dpr, pointer.y * dpr);
        gl.drawArrays(gl.POINTS, 0, COUNT);
        frame = requestAnimationFrame(tick);
      };
      const start = () => {
        if (frame || document.hidden) return;
        last = performance.now();
        frame = requestAnimationFrame(tick);
      };
      const stop = () => {
        cancelAnimationFrame(frame);
        frame = 0;
      };

      const onPointerMove = (event: PointerEvent) => {
        if (target.x === AWAY) {
          pointer.x = event.clientX;
          pointer.y = event.clientY;
        }
        target.x = event.clientX;
        target.y = event.clientY;
      };
      const onPointerLeave = () => {
        target.x = pointer.x = AWAY;
        target.y = pointer.y = AWAY;
      };
      const onVisibility = () => (document.hidden ? stop() : start());
      const themeObserver = new MutationObserver(applyColor);
      themeObserver.observe(document.documentElement, {
        attributeFilter: ["data-theme", "data-palette"],
      });
      window.addEventListener("resize", resize);
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onPointerLeave);
      document.addEventListener("visibilitychange", onVisibility);
      canvas.dataset.active = "";
      start();

      return () => {
        stop();
        delete canvas.dataset.active;
        themeObserver.disconnect();
        window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", onPointerMove);
        document.documentElement.removeEventListener("pointerleave", onPointerLeave);
        document.removeEventListener("visibilitychange", onVisibility);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.deleteBuffer(buffer);
        gl.deleteVertexArray(vao);
        gl.deleteProgram(program);
      };
    };

    const update = () => {
      if (query.matches && !teardown) teardown = setup();
      else if (!query.matches && teardown) {
        teardown();
        teardown = null;
      }
    };

    // Start once the page has loaded and the main thread is idle, so it never delays content.
    let idleHandle = 0;
    const idle =
      window.requestIdleCallback ?? ((callback: () => void) => setTimeout(callback, 200));
    const begin = () => {
      idleHandle = idle(update) as number;
    };
    if (document.readyState === "complete") begin();
    else window.addEventListener("load", begin, { once: true });
    query.addEventListener("change", update);

    return () => {
      window.removeEventListener("load", begin);
      (window.cancelIdleCallback ?? clearTimeout)(idleHandle);
      query.removeEventListener("change", update);
      teardown?.();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-0 transition-opacity duration-700 data-active:opacity-100 print:hidden"
    />
  );
}
