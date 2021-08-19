'use strict'

// Core Modules
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');

const exists = promisify(fs.exists);
const lstat = promisify(fs.lstat);
const mkdir = promisify(fs.mkdir);
const openFile = promisify(fs.open);
const readDir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const unlink = promisify(fs.unlink);
const writeFile = promisify(fs.write);

/**
 * Delete all files in indicated directory
 * @param {string} dir - The sting path to the directory to be cleaned
 * @returns {Promise<void>}
 */
async function cleanDir(dir) {
  let files;
  try {
    files = await readDir(dir);
  } catch (err) {
    return;
  }

  for (const file of files) {
    try {
      // Test if the item is a file or folder and remove
      if (await lstat(path.join(dir, file)).isDirectory()) {
        await rimraf(path.join(dir, file));
      } else {
        await unlink(path.join(dir, file));
      }
    } catch (err) {
      // Do we actually care about errors in this process? Possibly
    }
  }
}

async function ensurePath(workspaceRoot, dir) {
  if (await exists(path.join(workspaceRoot, dir))) {
    return;
  }

  const parts = dir.split('/').filter((part) => part.length > 0);
  const accumulator = [];
  for (const part of parts) {
    accumulator.push(part);
    if (await exists(path.join(workspaceRoot, accumulator.join('/')))) {
      continue;
    }

    await mkdir(path.join(workspaceRoot, accumulator.join('/')));
  }
}

/**
 * Remove directory recursively
 * @param {string} dir_path
 * @see https://stackoverflow.com/a/42505874/3027390
 */
async function rimraf(dir_path) {
  if (fs.existsSync(dir_path)) {
    fs.readdirSync(dir_path).forEach(function(entry) {
      const entry_path = path.join(dir_path, entry);
      if (fs.lstatSync(entry_path).isDirectory()) {
        rimraf(entry_path);
      } else {
        fs.unlinkSync(entry_path);
      }
    });
    fs.rmdirSync(dir_path);
  }
}

async function openAllJsFilesByPattern(dir, pattern) {
  const fileNames = (await readDir(dir)).filter((fileName) => pattern.test(fileName));

  const out = [];
  for (const fileName of fileNames) {
    const model = require(path.join(dir, fileName));
    out.push(model);
  }

  return out;
}

async function openAllJson(dir) {
  const fileNames = (await readDir(dir)).filter((fileName) => /.json$/.test(fileName));

  const out = {};
  for (const fileName of fileNames) {
    const content = await readFile(path.join(dir, fileName), 'utf8');
    const parts = fileName.split('.');

    out[parts[0]] = JSON.parse(content);
  }

  return out;
}

async function write(filePath, fileName, content) {
  const buffer = new Uint8Array(Buffer.from(content));

  try {
    const file = await openFile(path.join(filePath, fileName), 'w');

    await writeFile(file, buffer, 0, buffer.length, null);
  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  cleanDir,
  ensurePath,
  openAllJson,
  openAllJsFilesByPattern,
  write
};
