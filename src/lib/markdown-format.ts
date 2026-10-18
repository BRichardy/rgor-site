type WrapResult = {
  value: string;
  selectionStart: number;
  selectionEnd: number;
};

export function wrapTextareaSelection(
  value: string,
  start: number,
  end: number,
  before: string,
  after: string,
  placeholder = "texto",
): WrapResult {
  const selected = value.slice(start, end);
  const inner = selected || placeholder;
  const next =
    value.slice(0, start) + before + inner + after + value.slice(end);
  const cursorStart = start + before.length;
  const cursorEnd = cursorStart + inner.length;
  return {
    value: next,
    selectionStart: cursorStart,
    selectionEnd: cursorEnd,
  };
}

export function prefixLine(
  value: string,
  start: number,
  end: number,
  prefix: string,
): WrapResult {
  const lineStart = value.lastIndexOf("\n", start - 1) + 1;
  const lineEnd = value.indexOf("\n", end);
  const blockEnd = lineEnd === -1 ? value.length : lineEnd;
  const line = value.slice(lineStart, blockEnd);
  const stripped = line.replace(/^#+\s*/, "").replace(/^-\s*/, "");
  const nextLine = `${prefix}${stripped}`;
  const next =
    value.slice(0, lineStart) + nextLine + value.slice(blockEnd);
  const cursor = lineStart + nextLine.length;
  return {
    value: next,
    selectionStart: cursor,
    selectionEnd: cursor,
  };
}
