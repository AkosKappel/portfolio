import {
  ClipboardList,
  Code,
  FlaskConical,
  Gauge,
  type LucideIcon,
  Rocket,
  Target,
} from "lucide-react";
import type { WorkflowStep } from "@/content/types";

export const workflowIcons: Record<WorkflowStep["id"], LucideIcon> = {
  define: Target,
  plan: ClipboardList,
  build: Code,
  test: FlaskConical,
  ship: Rocket,
  run: Gauge,
};
