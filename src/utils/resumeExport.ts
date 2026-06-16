import {
  AlignmentType,
  Document,
  ImageRun,
  Packer,
  Paragraph,
  TextRun,
} from 'docx';
import type { ResumeData } from '@/types/resume';
import { parseBullets, parseSkills } from '@/types/resume';
import { getResumeTemplate } from '@/data/resumeTemplates';
import { parsePhotoDataUrl } from '@/utils/resumePhoto';

const FONT = '微软雅黑';

function heading(text: string, color: string) {
  return new Paragraph({
    spacing: { before: 240, after: 120 },
    children: [
      new TextRun({
        text,
        bold: true,
        size: 26,
        font: FONT,
        color,
      }),
    ],
  });
}

function body(text: string, opts?: { bold?: boolean; bullet?: boolean }) {
  return new Paragraph({
    spacing: { after: 80 },
    children: [
      new TextRun({
        text: opts?.bullet ? `• ${text}` : text,
        size: 22,
        font: FONT,
        bold: opts?.bold,
      }),
    ],
  });
}

function contactLine(data: ResumeData) {
  const parts = [data.phone, data.email, data.location, data.website].filter(Boolean);
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: parts.map(
      (p, i) =>
        new TextRun({
          text: (i > 0 ? '  |  ' : '') + p,
          size: 20,
          font: FONT,
          color: '4a5568',
        })
    ),
  });
}

function photoParagraph(dataUrl: string): Paragraph {
  const { data: imageData, type } = parsePhotoDataUrl(dataUrl);
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
    children: [
      new ImageRun({
        type,
        data: imageData,
        transformation: { width: 95, height: 118 },
      }),
    ],
  });
}

export async function exportResumeDocx(data: ResumeData, templateId: string): Promise<Blob> {
  const tpl = getResumeTemplate(templateId);
  const { headingColor, nameColor } = tpl.docx;

  const children: Paragraph[] = [];

  if (data.photo.trim()) {
    children.push(photoParagraph(data.photo.trim()));
  }

  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 },
      children: [
        new TextRun({
          text: data.name || '姓名',
          bold: true,
          size: 44,
          font: FONT,
          color: nameColor === 'ffffff' ? '1a365d' : nameColor,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 },
      children: [
        new TextRun({
          text: data.title || '意向岗位',
          size: 24,
          font: FONT,
          color: tpl.docx.accentColor,
        }),
      ],
    }),
    contactLine(data)
  );

  if (data.summary.trim()) {
    children.push(heading('个人简介', headingColor), body(data.summary.trim()));
  }

  const edus = data.educations.filter((e) => e.school.trim());
  if (edus.length) {
    children.push(heading('教育经历', headingColor));
    edus.forEach((e) => {
      children.push(body(`${e.school}    ${e.period}`, { bold: true }), body(e.degree));
      if (e.detail.trim()) children.push(body(e.detail.trim()));
    });
  }

  const exps = data.experiences.filter((e) => e.company.trim());
  if (exps.length) {
    children.push(heading('工作经历', headingColor));
    exps.forEach((e) => {
      children.push(body(`${e.company}    ${e.period}`, { bold: true }), body(e.role));
      parseBullets(e.bullets).forEach((b) => children.push(body(b, { bullet: true })));
    });
  }

  const projs = data.projects.filter((p) => p.name.trim());
  if (projs.length) {
    children.push(heading('项目经历', headingColor));
    projs.forEach((p) => {
      children.push(body(`${p.name}    ${p.period}`, { bold: true }));
      if (p.desc.trim()) children.push(body(p.desc.trim()));
    });
  }

  const skills = parseSkills(data.skills);
  if (skills.length) {
    children.push(heading('专业技能', headingColor), body(skills.join(' · ')));
  }

  const doc = new Document({
    sections: [{ children }],
  });

  return Packer.toBlob(doc);
}

export async function exportResumePdf(element: HTMLElement, fileName: string): Promise<void> {
  const html2pdf = (await import('html2pdf.js')).default;
  await html2pdf()
    .set({
      margin: [8, 8, 8, 8],
      filename: fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff' } as Record<string, unknown>,
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    })
    .from(element)
    .save();
}
