import { initialize, svg2png } from "https://esm.sh/svg2png-wasm@1.4.0";

await initialize(Deno.readFile("./svg2png_wasm_bg.wasm"));

function getSvg(color: string) {
  color = color.replace(/^#/, "");
  if (!/^([a-z]{6}|[a-z]{8}|[a-z]{4}|[a-z]{3})$/i.test(color)) {
    color = "000000";
  }
  return `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="512" height="512" fill="#${color}"/>
</svg>`;
}

Deno.serve(async (req) => {
  return new Response(
    await svg2png(getSvg(new URL(req.url).pathname.slice(1))),
    { headers: { "content-type": "image/png" } },
  );
});
