import { loadImage } from '@/utils/imageCompress';

const OUTPUT_SIZE = 400;
const JPEG_QUALITY = 0.85;

/** 居中裁剪为正方形并压缩，返回 JPEG data URL */
export async function processResumePhoto(file: File): Promise<string> {
  const img = await loadImage(file);
  const crop = Math.min(img.naturalWidth, img.naturalHeight);
  const sx = (img.naturalWidth - crop) / 2;
  const sy = (img.naturalHeight - crop) / 2;

  const canvas = document.createElement('canvas');
  canvas.width = OUTPUT_SIZE;
  canvas.height = OUTPUT_SIZE;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 不可用');

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, OUTPUT_SIZE, OUTPUT_SIZE);
  ctx.drawImage(img, sx, sy, crop, crop, 0, 0, OUTPUT_SIZE, OUTPUT_SIZE);

  return canvas.toDataURL('image/jpeg', JPEG_QUALITY);
}

export function resumeInitials(name: string): string {
  const n = name.trim();
  if (!n) return '照';
  return n.length >= 2 ? n.slice(-2) : n.slice(0, 1);
}

export function parsePhotoDataUrl(dataUrl: string): { data: Uint8Array; type: 'jpg' | 'png' } {
  const m = dataUrl.match(/^data:image\/(\w+);base64,(.+)$/);
  if (!m) throw new Error('无效的照片数据');

  const raw = m[1].toLowerCase();
  const type: 'jpg' | 'png' = raw === 'png' ? 'png' : 'jpg';
  const binary = atob(m[2]);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return { data: bytes, type };
}
