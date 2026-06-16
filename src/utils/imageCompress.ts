export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export type ImageOutputFormat = 'image/jpeg' | 'image/webp' | 'image/png';

export interface CompressOptions {
  maxWidth: number;
  quality: number;
  format: ImageOutputFormat;
}

export interface CompressResult {
  blob: Blob;
  dataUrl: string;
  width: number;
  height: number;
}

export function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('图片加载失败'));
    };
    img.src = url;
  });
}

export function compressImage(
  img: HTMLImageElement,
  options: CompressOptions
): Promise<CompressResult> {
  const { maxWidth, quality, format } = options;

  let w = img.naturalWidth;
  let h = img.naturalHeight;
  if (maxWidth > 0 && w > maxWidth) {
    h = Math.round((h * maxWidth) / w);
    w = maxWidth;
  }

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) return Promise.reject(new Error('Canvas 不可用'));

  if (format === 'image/jpeg') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);
  }
  ctx.drawImage(img, 0, 0, w, h);

  const q = format === 'image/png' ? undefined : quality;

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('压缩失败'));
          return;
        }
        const dataUrl = canvas.toDataURL(format, q);
        resolve({ blob, dataUrl, width: w, height: h });
      },
      format,
      q
    );
  });
}

export function extForFormat(format: ImageOutputFormat): string {
  if (format === 'image/jpeg') return 'jpg';
  if (format === 'image/webp') return 'webp';
  return 'png';
}
