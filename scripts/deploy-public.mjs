import { execSync } from 'node:child_process';
import {
  cpSync,
  existsSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const dist = join(root, 'dist');
const cnameSource = join(root, 'public', 'CNAME');
const cnameTarget = join(dist, 'CNAME');
const branch = 'public';

function run(cmd, cwd = root) {
  execSync(cmd, { cwd, stdio: 'inherit', env: process.env });
}

function gitConfig(key) {
  try {
    return execSync(`git config ${key}`, { cwd: root, encoding: 'utf8' }).trim();
  } catch {
    return '';
  }
}

function copyDir(src, dest) {
  for (const name of readdirSync(src)) {
    const from = join(src, name);
    const to = join(dest, name);
    if (statSync(from).isDirectory()) {
      cpSync(from, to, { recursive: true });
    } else {
      cpSync(from, to);
    }
  }
}

console.log('→ 构建生产包…');
run('pnpm build');

if (!existsSync(dist)) {
  throw new Error('构建失败：未找到 dist 目录');
}

if (existsSync(cnameSource)) {
  const cname = readFileSync(cnameSource, 'utf8').trim();
  writeFileSync(cnameTarget, `${cname}\n`, 'utf8');
  console.log('→ 已写入 CNAME:', cname);
} else if (!existsSync(cnameTarget)) {
  throw new Error('缺少 CNAME：请在 public/CNAME 中配置域名');
}

const remote = execSync('git remote get-url origin', { cwd: root, encoding: 'utf8' }).trim();
const workDir = mkdtempSync(join(tmpdir(), 'cflmy-public-'));

try {
  console.log(`→ 发布到 ${branch} 分支…`);
  run('git init', workDir);
  run(`git checkout -b ${branch}`, workDir);

  const userName = gitConfig('user.name');
  const userEmail = gitConfig('user.email');
  if (userName) run(`git config user.name "${userName}"`, workDir);
  if (userEmail) run(`git config user.email "${userEmail}"`, workDir);

  copyDir(dist, workDir);

  run('git add -A', workDir);
  run(`git commit -m "deploy: ${new Date().toISOString().slice(0, 10)}"`, workDir);
  run(`git remote add origin "${remote}"`, workDir);
  run(`git push -f origin ${branch}`, workDir);
  console.log(`✓ 已推送到 origin/${branch}`);
} finally {
  rmSync(workDir, { recursive: true, force: true });
}
