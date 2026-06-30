import { computed, type MaybeRefOrGetter, toValue } from 'vue';
import type { ResumeData } from '@/types/resume';
import { parseBullets, parseSkills } from '@/types/resume';

export function useResumeContent(data: MaybeRefOrGetter<ResumeData>) {
  const educations = computed(() =>
    toValue(data).educations.filter((e) => e.school.trim())
  );
  const experiences = computed(() =>
    toValue(data).experiences.filter((e) => e.company.trim())
  );
  const projects = computed(() =>
    toValue(data).projects.filter((p) => p.name.trim())
  );
  const skills = computed(() => parseSkills(toValue(data).skills));

  function bullets(text: string) {
    return parseBullets(text);
  }

  return { educations, experiences, projects, skills, bullets };
}
