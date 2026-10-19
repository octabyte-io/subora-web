import { cn } from "@/lib/utils";
import { SCENES, type SceneId } from "./scenes";

/**
 * A post's cover: one of its mocks, shown as a picture. It is decoration
 * here, so it is hidden from screen readers and can't take focus; the post's
 * words say the same.
 */
export function SceneCover({ scene, className }: { scene: SceneId; className?: string }) {
  return (
    <div aria-hidden="true" inert className={cn("pointer-events-none select-none", className)}>
      {SCENES[scene].render()}
    </div>
  );
}

/**
 * The cover as a thumbnail for a list: the mock drawn smaller, cut to a fixed
 * shape and faded out at the foot. `zoom` is how much smaller, from 0 to 1.
 * The mocks use container queries, so they lay out for the width they are
 * drawn at before they are scaled.
 */
export function SceneThumb({ scene, zoom, className }: { scene: SceneId; zoom: number; className?: string }) {
  return (
    <div
      aria-hidden="true"
      inert
      className={cn(
        "pointer-events-none aspect-[4/3] overflow-hidden rounded-xl bg-slate/[0.06] px-3 pt-3 select-none",
        "[mask-image:linear-gradient(to_bottom,black_70%,transparent)]",
        className,
      )}
    >
      <div className="origin-top-left" style={{ width: `${100 / zoom}%`, transform: `scale(${zoom})` }}>
        {SCENES[scene].render()}
      </div>
    </div>
  );
}
