export interface Education {
  school: string;
  degree: string;
  period: string;
  detail: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  bullets: string;
}

export interface Project {
  name: string;
  period: string;
  desc: string;
}

export interface ResumeData {
  name: string;
  title: string;
  photo: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  educations: Education[];
  experiences: Experience[];
  projects: Project[];
  skills: string;
}

export function emptyEducation(): Education {
  return { school: '', degree: '', period: '', detail: '' };
}

export function emptyExperience(): Experience {
  return { company: '', role: '', period: '', bullets: '' };
}

export function emptyProject(): Project {
  return { name: '', period: '', desc: '' };
}

export function parseBullets(text: string): string[] {
  return text
    .split('\n')
    .map((s) => s.trim().replace(/^[-•·]\s*/, ''))
    .filter(Boolean);
}

export function parseSkills(text: string): string[] {
  return text
    .split(/[,，、|]/)
    .map((s) => s.trim())
    .filter(Boolean);
}
