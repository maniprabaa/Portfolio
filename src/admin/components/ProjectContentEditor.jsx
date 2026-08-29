import { useRef, useState } from 'react';
import { ArrowDown, ArrowUp, ImagePlus, Plus, Trash2, Type } from 'lucide-react';
import { resolveAsset } from '../../config/baseUrl.js';
import { api } from '../../services/api.js';
import {
  insertContentBlock,
  moveContentBlock,
} from '../../lib/projectContent.js';
import {
  AdminButton,
  AdminField,
  AdminInput,
  AdminTextarea,
} from './AdminUi.jsx';

function BlockToolbar({ onAddText, onAddImageUrl, onUploadImage, uploading }) {
  const fileRef = useRef(null);

  return (
    <div className="flex flex-wrap gap-2">
      <AdminButton type="button" variant="ghost" onClick={onAddText}>
        <Type className="h-3.5 w-3.5" />
        Add Paragraph
      </AdminButton>
      <AdminButton type="button" variant="ghost" onClick={onAddImageUrl}>
        <ImagePlus className="h-3.5 w-3.5" />
        Add Image URL
      </AdminButton>
      <AdminButton
        type="button"
        variant="ghost"
        disabled={uploading}
        onClick={() => fileRef.current?.click()}
      >
        <ImagePlus className="h-3.5 w-3.5" />
        {uploading ? 'Uploading...' : 'Upload Image'}
      </AdminButton>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onUploadImage}
      />
    </div>
  );
}

function InsertActions({ index, onInsertText, onInsertImageUrl, onUploadImage, uploading }) {
  const fileRef = useRef(null);

  return (
    <div className="flex flex-wrap gap-2 border-t border-line/60 pt-3">
      <button
        type="button"
        onClick={() => onInsertText(index)}
        className="text-[10px] tracking-[0.15em] text-fg-3 transition hover:text-mint"
      >
        + Paragraph below
      </button>
      <button
        type="button"
        onClick={() => onInsertImageUrl(index)}
        className="text-[10px] tracking-[0.15em] text-fg-3 transition hover:text-mint"
      >
        + Image URL below
      </button>
      <button
        type="button"
        disabled={uploading}
        onClick={() => fileRef.current?.click()}
        className="text-[10px] tracking-[0.15em] text-fg-3 transition hover:text-mint disabled:opacity-50"
      >
        {uploading ? 'Uploading...' : '+ Upload image below'}
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onUploadImage(e, index)}
      />
    </div>
  );
}

export default function ProjectContentEditor({ blocks, onChange }) {
  const [uploadingState, setUploadingState] = useState(false);

  const updateBlock = (index, patch) => {
    onChange(blocks.map((block, i) => (i === index ? { ...block, ...patch } : block)));
  };

  const removeBlock = (index) => {
    if (blocks.length === 1) {
      onChange([{ type: 'text', value: '' }]);
      return;
    }
    onChange(blocks.filter((_, i) => i !== index));
  };

  const appendBlock = (block) => onChange([...blocks, block]);

  const insertBlock = (index, block) => onChange(insertContentBlock(blocks, index, block));

  const moveBlock = (index, direction) => onChange(moveContentBlock(blocks, index, direction));

  const handleUpload = async (event, insertIndex = null) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    setUploadingState(true);
    try {
      const { url } = await api.uploadFile(file);
      const block = { type: 'image', url, alt: '', caption: '' };
      if (insertIndex === null) {
        appendBlock(block);
      } else {
        insertBlock(insertIndex, block);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploadingState(false);
    }
  };

  const safeBlocks = blocks.length > 0 ? blocks : [{ type: 'text', value: '' }];

  return (
    <div className="space-y-4">
      <p className="text-xs leading-relaxed text-fg-3">
        Build your case study like a LinkedIn article. Add paragraphs and images in any order.
      </p>

      {safeBlocks.map((block, index) => (
        <div
          key={`${block.type}-${index}`}
          className="rounded-xl border border-line bg-void-2/60 p-4"
        >
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="text-[10px] tracking-[0.2em] text-fg-3">
              {block.type === 'text' ? 'PARAGRAPH' : 'IMAGE'} · {index + 1}
            </span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => moveBlock(index, -1)}
                disabled={index === 0}
                className="rounded border border-line p-1.5 text-fg-3 transition hover:border-mint/30 hover:text-mint disabled:opacity-30"
                aria-label="Move up"
              >
                <ArrowUp className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => moveBlock(index, 1)}
                disabled={index === safeBlocks.length - 1}
                className="rounded border border-line p-1.5 text-fg-3 transition hover:border-mint/30 hover:text-mint disabled:opacity-30"
                aria-label="Move down"
              >
                <ArrowDown className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => removeBlock(index)}
                className="rounded border border-red-500/30 p-1.5 text-red-300 transition hover:bg-red-500/10"
                aria-label="Remove block"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {block.type === 'text' ? (
            <AdminTextarea
              placeholder="Write a paragraph..."
              value={block.value}
              onChange={(e) => updateBlock(index, { value: e.target.value })}
              rows={4}
            />
          ) : (
            <div className="space-y-3">
              {block.url ? (
                <img
                  src={resolveAsset(block.url)}
                  alt={block.alt || 'Project image'}
                  className="max-h-56 w-full rounded-lg border border-line bg-void object-contain p-2"
                />
              ) : (
                <div className="flex h-32 items-center justify-center rounded-lg border border-dashed border-line text-xs text-fg-3">
                  Add an image URL or upload a file
                </div>
              )}
              <AdminField label="Image URL">
                <AdminInput
                  placeholder="/uploads/example.png"
                  value={block.url}
                  onChange={(e) => updateBlock(index, { url: e.target.value })}
                />
              </AdminField>
              <div className="grid gap-3 md:grid-cols-2">
                <AdminField label="Alt Text">
                  <AdminInput
                    placeholder="Describe the image"
                    value={block.alt || ''}
                    onChange={(e) => updateBlock(index, { alt: e.target.value })}
                  />
                </AdminField>
                <AdminField label="Caption">
                  <AdminInput
                    placeholder="Optional caption"
                    value={block.caption || ''}
                    onChange={(e) => updateBlock(index, { caption: e.target.value })}
                  />
                </AdminField>
              </div>
            </div>
          )}

          <InsertActions
            index={index}
            uploading={uploadingState}
            onInsertText={(i) => insertBlock(i, { type: 'text', value: '' })}
            onInsertImageUrl={(i) => insertBlock(i, { type: 'image', url: '', alt: '', caption: '' })}
            onUploadImage={handleUpload}
          />
        </div>
      ))}

      <BlockToolbar
        uploading={uploadingState}
        onAddText={() => appendBlock({ type: 'text', value: '' })}
        onAddImageUrl={() => appendBlock({ type: 'image', url: '', alt: '', caption: '' })}
        onUploadImage={(e) => handleUpload(e)}
      />

      {safeBlocks.length === 0 && (
        <button
          type="button"
          onClick={() => onChange([{ type: 'text', value: '' }])}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-line py-8 text-xs tracking-[0.15em] text-fg-3 transition hover:border-mint/30 hover:text-mint"
        >
          <Plus className="h-4 w-4" />
          Start writing
        </button>
      )}
    </div>
  );
}
