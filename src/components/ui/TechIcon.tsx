import type { ComponentType, SVGProps } from 'react';
import {
  SiPython,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiCplusplus,
  SiReact,
  SiFastapi,
  SiFlask,
  SiMui,
  SiStorybook,
  SiLangchain,
  SiPostgresql,
  SiJenkins,
  SiPandas,
  SiNumpy,
  SiGithub,
  SiNodedotjs,
  SiDocker,
  SiTailwindcss,
  SiVite,
  SiFramer,
  SiOpenai,
} from 'react-icons/si';
import {
  TbApi,
  TbBrandAws,
  TbDatabase,
  TbServer2,
  TbBraces,
  TbReportAnalytics,
  TbDeviceDesktopAnalytics,
  TbRobot,
  TbCloudComputing,
  TbLayoutDashboard,
  TbTools,
  TbFileCode,
  TbGitBranch,
  TbSitemap,
  TbLock,
  TbServerCog,
  TbCloud,
} from 'react-icons/tb';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

interface IconEntry {
  Icon: IconComponent;
  /** Brand color hex; used for inline accent (text/border), not background. */
  color: string;
}

// Lowercase, alphanum-only key -> icon
const map: Record<string, IconEntry> = {
  // Languages
  python: { Icon: SiPython, color: '#3776AB' },
  typescript: { Icon: SiTypescript, color: '#3178C6' },
  javascript: { Icon: SiJavascript, color: '#F7DF1E' },
  sql: { Icon: TbDatabase, color: '#336791' },
  cplusplus: { Icon: SiCplusplus, color: '#00599C' },
  cpp: { Icon: SiCplusplus, color: '#00599C' },
  htmlcss: { Icon: SiHtml5, color: '#E34F26' },
  html: { Icon: SiHtml5, color: '#E34F26' },
  css: { Icon: SiCss, color: '#1572B6' },

  // Frontend / Backend
  react: { Icon: SiReact, color: '#61DAFB' },
  fastapi: { Icon: SiFastapi, color: '#009688' },
  flask: { Icon: SiFlask, color: '#000000' },
  materialui: { Icon: SiMui, color: '#007FFF' },
  mui: { Icon: SiMui, color: '#007FFF' },
  storybook: { Icon: SiStorybook, color: '#FF4785' },
  restapis: { Icon: TbApi, color: '#0EA5E9' },
  rest: { Icon: TbApi, color: '#0EA5E9' },
  api: { Icon: TbApi, color: '#0EA5E9' },

  // Cloud / AWS family — react-icons dropped AWS brand SVGs, use Tabler's TbBrandAws
  aws: { Icon: TbBrandAws, color: '#FF9900' },
  amazonwebservices: { Icon: TbBrandAws, color: '#FF9900' },
  awslambda: { Icon: TbBrandAws, color: '#FF9900' },
  lambda: { Icon: TbBrandAws, color: '#FF9900' },
  s3: { Icon: TbCloud, color: '#569A31' },
  amazons3: { Icon: TbCloud, color: '#569A31' },
  ec2: { Icon: TbServerCog, color: '#FF9900' },
  amazonec2: { Icon: TbServerCog, color: '#FF9900' },
  iam: { Icon: TbLock, color: '#DD344C' },
  stepfunctions: { Icon: TbSitemap, color: '#FF4F8B' },

  // AI / Data
  langchain: { Icon: SiLangchain, color: '#1C3C3C' },
  postgresql: { Icon: SiPostgresql, color: '#4169E1' },
  postgres: { Icon: SiPostgresql, color: '#4169E1' },
  pandas: { Icon: SiPandas, color: '#150458' },
  numpy: { Icon: SiNumpy, color: '#013243' },
  openai: { Icon: SiOpenai, color: '#000000' },
  ai: { Icon: TbRobot, color: '#7C3AED' },
  aiagents: { Icon: TbRobot, color: '#7C3AED' },

  // Devops / Tools
  jenkins: { Icon: SiJenkins, color: '#D33833' },
  github: { Icon: SiGithub, color: '#181717' },
  nodejs: { Icon: SiNodedotjs, color: '#5FA04E' },
  node: { Icon: SiNodedotjs, color: '#5FA04E' },
  docker: { Icon: SiDocker, color: '#2496ED' },
  tailwind: { Icon: SiTailwindcss, color: '#06B6D4' },
  tailwindcss: { Icon: SiTailwindcss, color: '#06B6D4' },
  vite: { Icon: SiVite, color: '#646CFF' },
  framer: { Icon: SiFramer, color: '#0055FF' },
  framermotion: { Icon: SiFramer, color: '#0055FF' },

  // Service-card example tags (not strictly tech but conceptual)
  cicd: { Icon: TbGitBranch, color: '#4F46E5' },
  serverless: { Icon: TbCloudComputing, color: '#FD5750' },
  dashboards: { Icon: TbLayoutDashboard, color: '#0EA5E9' },
  internaltools: { Icon: TbTools, color: '#7C3AED' },
  webapps: { Icon: SiReact, color: '#61DAFB' },
  adminpanels: { Icon: TbDeviceDesktopAnalytics, color: '#0EA5E9' },
  analytics: { Icon: TbReportAnalytics, color: '#10B981' },
  reporting: { Icon: TbReportAnalytics, color: '#10B981' },
  datapipelines: { Icon: TbServer2, color: '#0EA5E9' },
  documentprocessing: { Icon: TbFileCode, color: '#7C3AED' },
  workflows: { Icon: TbSitemap, color: '#F59E0B' },

  // Misc fallbacks
  princexml: { Icon: TbFileCode, color: '#0EA5E9' },
};

const fallback: IconEntry = { Icon: TbBraces, color: '#9CA3AF' };

function key(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

interface TechIconProps {
  name: string;
  /** Override color; otherwise uses brand color */
  color?: string;
  size?: number;
  className?: string;
}

export function TechIcon({ name, color, size = 14, className = '' }: TechIconProps) {
  const entry = map[key(name)] ?? fallback;
  const Icon = entry.Icon;
  return (
    <Icon
      width={size}
      height={size}
      style={{ color: color ?? entry.color }}
      className={className}
      aria-hidden="true"
    />
  );
}

/** Brand color for a given tech (for borders/text accents matching the icon) */
export function techColor(name: string): string {
  return (map[key(name)] ?? fallback).color;
}
