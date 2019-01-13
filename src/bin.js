#!/usr/bin/env node
import args from 'node-args';
import { readSafeSync, parseSafeSync } from './utls/common';
import { process } from './index';

const filename = args.file || args.f;
const input = args.input || args.i;
const data = args.data || args.d || {};

const inputContent = readSafeSync(input) || '{}';
const inputData = parseSafeSync(inputContent) || {};
const parsedData = parseSafeSync(data) || {};
const yamlFile = readSafeSync(filename, 'utf8');

const payload = {
  ...inputData,
  ...parsedData,
  ...args,
};

console.log(process(yamlFile, payload));