import os from 'os';
import path from 'path';
import * as url from 'url';

// Change this to bump to a newer version of mint's client
export const TARGET_MINT_VERSION = 'v0.0.11';

// package installation location
export const INSTALL_PATH = url.fileURLToPath(new URL('.', import.meta.url));

export const HOME_DIR = os.homedir();

export const DOT_MINTLIFY = path.join(HOME_DIR, '.mintlify');

export const VERSION_PATH = path.join(DOT_MINTLIFY, 'mint', 'mint-version.txt');

export const CLIENT_PATH = path.join(DOT_MINTLIFY, 'mint', 'client');

export const MINT_PATH = path.join(DOT_MINTLIFY, 'mint');

// command execution location
export const CMD_EXEC_PATH = process.cwd();

export const SUPPORTED_MEDIA_EXTENSIONS = [
  'jpeg',
  'jpg',
  'jfif',
  'pjpeg',
  'pjp',
  'png',
  'svg',
  'svgz',
  'ico',
  'webp',
  'gif',
  'apng',
  'avif',
  'bmp',
  'mp4',
];
