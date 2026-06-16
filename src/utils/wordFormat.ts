import JSZip from 'jszip';

const W = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main';

export type LineRule = 'auto' | 'exact';

export interface WordFormatOptions {
  fontEastAsia: string;
  fontAscii: string;
  fontSizeHalfPt: number;
  lineRule: LineRule;
  lineValue: number;
  firstLineIndentChars: number;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  applyToHeadings: boolean;
}

export type PresetId = 'thesis' | 'official' | 'custom';

export interface PresetConfig {
  id: PresetId;
  label: string;
  options: WordFormatOptions;
}

/** 1 cm ≈ 567 twips */
export function cmToTwips(cm: number) {
  return Math.round((cm / 2.54) * 1440);
}

export const FONT_OPTIONS = [
  { label: '宋体', eastAsia: '宋体', ascii: 'Times New Roman' },
  { label: '微软雅黑', eastAsia: '微软雅黑', ascii: 'Calibri' },
  { label: '仿宋', eastAsia: '仿宋_GB2312', ascii: '仿宋_GB2312' },
  { label: '黑体', eastAsia: '黑体', ascii: 'Arial' },
  { label: 'Times New Roman', eastAsia: '宋体', ascii: 'Times New Roman' },
] as const;

export const SIZE_OPTIONS = [
  { label: '五号 (10.5pt)', halfPt: 21 },
  { label: '小四 (12pt)', halfPt: 24 },
  { label: '四号 (14pt)', halfPt: 28 },
  { label: '三号 (16pt)', halfPt: 32 },
] as const;

export const LINE_OPTIONS = [
  { label: '单倍行距', rule: 'auto' as LineRule, value: 240 },
  { label: '1.5 倍行距', rule: 'auto' as LineRule, value: 360 },
  { label: '双倍行距', rule: 'auto' as LineRule, value: 480 },
  { label: '固定 28 磅（公文）', rule: 'exact' as LineRule, value: 560 },
] as const;

export const PRESETS: PresetConfig[] = [
  {
    id: 'thesis',
    label: '论文格式',
    options: {
      fontEastAsia: '宋体',
      fontAscii: 'Times New Roman',
      fontSizeHalfPt: 24,
      lineRule: 'auto',
      lineValue: 360,
      firstLineIndentChars: 200,
      marginTop: cmToTwips(2.54),
      marginBottom: cmToTwips(2.54),
      marginLeft: cmToTwips(3.17),
      marginRight: cmToTwips(3.17),
      applyToHeadings: false,
    },
  },
  {
    id: 'official',
    label: '公文格式',
    options: {
      fontEastAsia: '仿宋_GB2312',
      fontAscii: '仿宋_GB2312',
      fontSizeHalfPt: 32,
      lineRule: 'exact',
      lineValue: 560,
      firstLineIndentChars: 200,
      marginTop: cmToTwips(3.7),
      marginBottom: cmToTwips(3.5),
      marginLeft: cmToTwips(2.8),
      marginRight: cmToTwips(2.6),
      applyToHeadings: false,
    },
  },
  {
    id: 'custom',
    label: '自定义',
    options: {
      fontEastAsia: '宋体',
      fontAscii: 'Times New Roman',
      fontSizeHalfPt: 24,
      lineRule: 'auto',
      lineValue: 360,
      firstLineIndentChars: 200,
      marginTop: cmToTwips(2.54),
      marginBottom: cmToTwips(2.54),
      marginLeft: cmToTwips(3.17),
      marginRight: cmToTwips(3.17),
      applyToHeadings: false,
    },
  },
];

function wAttr(el: Element, name: string, value: string) {
  el.setAttributeNS(W, `w:${name}`, value);
}

function getOrCreateChild(parent: Element, localName: string): Element {
  for (let i = 0; i < parent.children.length; i++) {
    const c = parent.children[i];
    if (c.localName === localName) return c;
  }
  const el = parent.ownerDocument!.createElementNS(W, `w:${localName}`);
  parent.insertBefore(el, parent.firstChild);
  return el;
}

function isHeadingParagraph(p: Element): boolean {
  const pPrList = p.getElementsByTagNameNS(W, 'pPr');
  if (!pPrList.length) return false;
  const pPr = pPrList[0];

  const pStyle = pPr.getElementsByTagNameNS(W, 'pStyle')[0];
  if (pStyle) {
    const val = pStyle.getAttributeNS(W, 'val') ?? '';
    if (/heading|title|标题/i.test(val)) return true;
  }

  if (pPr.getElementsByTagNameNS(W, 'outlineLvl').length) return true;
  return false;
}

function applyParagraphFormat(p: Element, opt: WordFormatOptions) {
  const pPr = getOrCreateChild(p, 'pPr');

  const spacing = getOrCreateChild(pPr, 'spacing');
  wAttr(spacing, 'line', String(opt.lineValue));
  wAttr(spacing, 'lineRule', opt.lineRule);
  wAttr(spacing, 'before', '0');
  wAttr(spacing, 'after', '0');

  if (opt.firstLineIndentChars > 0) {
    const ind = getOrCreateChild(pPr, 'ind');
    wAttr(ind, 'firstLineChars', String(opt.firstLineIndentChars));
  }
}

function applyRunFormat(r: Element, opt: WordFormatOptions) {
  const rPr = getOrCreateChild(r, 'rPr');

  const fonts = getOrCreateChild(rPr, 'rFonts');
  wAttr(fonts, 'ascii', opt.fontAscii);
  wAttr(fonts, 'eastAsia', opt.fontEastAsia);
  wAttr(fonts, 'hAnsi', opt.fontAscii);
  wAttr(fonts, 'cs', opt.fontEastAsia);

  const sz = getOrCreateChild(rPr, 'sz');
  wAttr(sz, 'val', String(opt.fontSizeHalfPt));

  const szCs = getOrCreateChild(rPr, 'szCs');
  wAttr(szCs, 'val', String(opt.fontSizeHalfPt));
}

function applyMargins(root: Document | Element, opt: WordFormatOptions) {
  const sectPrs = root.getElementsByTagNameNS(W, 'sectPr');
  for (let i = 0; i < sectPrs.length; i++) {
    const pgMar = getOrCreateChild(sectPrs[i], 'pgMar');
    wAttr(pgMar, 'top', String(opt.marginTop));
    wAttr(pgMar, 'bottom', String(opt.marginBottom));
    wAttr(pgMar, 'left', String(opt.marginLeft));
    wAttr(pgMar, 'right', String(opt.marginRight));
  }
}

function applyToXml(xml: string, opt: WordFormatOptions): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'application/xml');
  if (doc.querySelector('parsererror')) {
    throw new Error('XML 解析失败');
  }

  const paragraphs = doc.getElementsByTagNameNS(W, 'p');
  for (let i = 0; i < paragraphs.length; i++) {
    const p = paragraphs[i];
    if (!opt.applyToHeadings && isHeadingParagraph(p)) continue;

    applyParagraphFormat(p, opt);
    const runs = p.getElementsByTagNameNS(W, 'r');
    for (let j = 0; j < runs.length; j++) {
      applyRunFormat(runs[j], opt);
    }
  }

  applyMargins(doc, opt);
  return new XMLSerializer().serializeToString(doc);
}

const XML_PARTS = [
  'word/document.xml',
  'word/styles.xml',
  'word/header1.xml',
  'word/header2.xml',
  'word/footer1.xml',
  'word/footer2.xml',
];

export async function formatDocx(file: File, options: WordFormatOptions): Promise<Blob> {
  if (!file.name.toLowerCase().endsWith('.docx')) {
    throw new Error('仅支持 .docx 格式，请将 .doc 另存为 .docx');
  }

  const zip = await JSZip.loadAsync(file);
  if (!zip.file('word/document.xml')) {
    throw new Error('无效的 Word 文档');
  }

  for (const path of XML_PARTS) {
    const entry = zip.file(path);
    if (!entry) continue;
    const xml = await entry.async('string');
    zip.file(path, applyToXml(xml, options));
  }

  return zip.generateAsync({
    type: 'blob',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });
}

export function defaultDownloadName(fileName: string) {
  const base = fileName.replace(/\.docx$/i, '');
  return `${base}-已排版.docx`;
}
