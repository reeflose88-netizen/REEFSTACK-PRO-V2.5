/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Globe,
  Smartphone,
  Database,
  Gamepad2,
  Bot,
  Palette,
  CreditCard,
  Cloud,
  Activity,
  ShieldAlert,
  Sparkles,
  Wand2,
  Boxes,
  Users,
  FileText,
  Languages,
  WifiOff,
  Puzzle,
  Lightbulb,
  FileSpreadsheet,
  Hammer,
  CheckSquare,
  Rocket,
  Megaphone,
  TrendingUp,
  HelpCircle,
  Code2,
  Lock,
  Compass,
  ArrowRight
} from 'lucide-react';

const iconsMap: Record<string, React.ComponentType<any>> = {
  Globe,
  Smartphone,
  Database,
  Gamepad2,
  Bot,
  Palette,
  CreditCard,
  Cloud,
  Activity,
  ShieldAlert,
  Sparkles,
  Wand2,
  Boxes,
  Users,
  FileText,
  Languages,
  WifiOff,
  Puzzle,
  Lightbulb,
  FileSpreadsheet,
  Hammer,
  CheckSquare,
  Rocket,
  Megaphone,
  TrendingUp,
  HelpCircle,
  Code2,
  Lock,
  Compass,
  ArrowRight
};

export function IconResolver({ name, className = "w-5 h-5", id }: { name: string; className?: string; id?: string }) {
  const IconComponent = iconsMap[name] || HelpCircle;
  return <IconComponent className={className} id={id} />;
}
