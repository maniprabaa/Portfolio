/** @typedef {{ type: 'text', value: string }} TextBlock */
/** @typedef {{ type: 'image', url: string, alt?: string, caption?: string }} ImageBlock */
/** @typedef {TextBlock | ImageBlock} ContentBlock */

/**
 * @param {string | undefined | null} content
 * @returns {ContentBlock[]}
 */
export function legacyContentToBlocks(content) {
  if (!content) return [{ type: 'text', value: '' }];
  const parts = content
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
  if (parts.length === 0) return [{ type: 'text', value: '' }];
  return parts.map((value) => ({ type: 'text', value }));
}

/**
 * @param {{ contentBlocks?: ContentBlock[], content?: string }} project
 * @returns {ContentBlock[]}
 */
export function normalizeContentBlocks(project) {
  if (Array.isArray(project?.contentBlocks) && project.contentBlocks.length > 0) {
    return project.contentBlocks.map((block) => {
      if (block.type === 'image') {
        return {
          type: 'image',
          url: block.url || '',
          alt: block.alt || '',
          caption: block.caption || '',
        };
      }
      return { type: 'text', value: block.value || '' };
    });
  }
  return legacyContentToBlocks(project?.content);
}

/**
 * @param {ContentBlock[]} blocks
 * @returns {string}
 */
export function blocksToLegacyContent(blocks) {
  return blocks
    .filter((block) => block.type === 'text')
    .map((block) => block.value.trim())
    .filter(Boolean)
    .join('\n\n');
}

/**
 * @param {ContentBlock[]} blocks
 * @returns {ContentBlock[]}
 */
export function sanitizeContentBlocks(blocks) {
  return blocks.filter((block) => {
    if (block.type === 'text') return block.value.trim().length > 0;
    if (block.type === 'image') return Boolean(block.url?.trim());
    return false;
  });
}

/**
 * @param {ContentBlock[]} blocks
 * @param {number} index
 * @param {number} direction
 * @returns {ContentBlock[]}
 */
export function moveContentBlock(blocks, index, direction) {
  const nextIndex = index + direction;
  if (nextIndex < 0 || nextIndex >= blocks.length) return blocks;
  const next = [...blocks];
  [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
  return next;
}

/**
 * @param {ContentBlock[]} blocks
 * @param {number} index
 * @param {ContentBlock} block
 * @returns {ContentBlock[]}
 */
export function insertContentBlock(blocks, index, block) {
  const next = [...blocks];
  next.splice(index + 1, 0, block);
  return next;
}
