/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface StackLayer {
  id: number;
  name: string;
  category: string;
  technology: string;
  subtitle: string;
  tags: string[];
  features: string[];
  color: string; // Tailwind border/text/shadow color classes
  iconName: string;
  codeSnippet: string;
}

export interface Upgrade {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
  details: string;
}

export interface ExpandedFeature {
  name: string;
  description: string;
}

export interface ExpandedLayer {
  letter: string;
  name: string;
  color: string;
  features: ExpandedFeature[];
}

export interface Step {
  number: number;
  title: string;
  action: string;
  description: string;
  details: string;
  iconName: string;
}

export interface ProjectUseCase {
  title: string;
  style?: string;
  iconName: string;
  description: string;
  suggestedStack: {
    frontend: string;
    mobile?: string;
    backend: string;
    gameEngine?: string;
    ai: string;
    ui: string;
    payments: string;
  };
}

export interface DiagramNode {
  id: string;
  label: string;
  type: 'user' | 'frontend' | 'mobile' | 'api' | 'backend' | 'ai' | 'payments' | 'storage' | 'deployment' | 'game';
  description: string;
  techs?: string[];
}

export interface DiagramConnection {
  from: string;
  to: string;
  label?: string;
  animated?: boolean;
}
