function renderMarkdown(text) {
  if (!text) return "";

  // Trim trailing whitespace and newlines
  text = text.trim();

  let html = text
    // Headers
    .replace(
      /^### (.*$)/gim,
      '<h3 style="margin: 1px 0px; font-size: 18px; font-weight: 600;">$1</h3>'
    )
    .replace(
      /^## (.*$)/gim,
      '<h2 style="margin: 1px 0px; font-size: 18px; font-weight: 600;">$1</h2>'
    )
    .replace(
      /^# (.*$)/gim,
      '<h1 style="margin: 1px 0px; font-size: 19px; font-weight: 700;">$1</h1>'
    )

    // Code blocks
    .replace(
      /```(?:\w+)?\n([\s\S]*?)```/g,
      '<pre style="background: rgba(0,0,0,0.3); padding: 8px; border-radius: 5px; margin: 1px 0; overflow-x: auto;"><code style="color: #e4f6ffff; font-family: \'Courier New\', monospace; font-size: 14px;">$1</code></pre>'
    )

    // Bold text
    .replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight: bold;">$1</strong>')
    .replace(/__(.*?)__/g, '<strong style="font-weight: bold;">$1</strong>')

    // Italic text
    .replace(/\*(.*?)\*/g, '<em style="font-style: italic;">$1</em>')
    .replace(/_(.*?)_/g, '<em style="font-style: italic;">$1</em>')

    // Inline code
    .replace(
      /`([^`]+)`/g,
      "<code style=\"background: rgba(0,0,0,0.3); padding: 3px 4px; border-radius: 3px; color: #f0f0f0; font-family: 'Courier New', monospace; font-size: 13px;\">$1</code>"
    )

    // Links
    .replace(
      / \[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" style="color:rgba(44, 94, 151, 1); text-decoration: underline;" target="_blank">$1</a>'
    );

  // Unordered lists
  html = html.replace(/((?:^\s*[\*\-\+]\s+.*\n?)+)/gm, (match) => {
    const items = match
      .trim()
      .split("\n")
      .map((item) => item.replace(/^\s*[\*\-\+]\s+/, "").trim())
      .filter((item) => item.length > 0)
      .map((item) => `<li>${item}</li>`)
      .join("");
    return `<ul>${items}</ul>`;
  });

  // Ordered lists
  html = html.replace(/((?:^\s*\d+\.\s+.*\n?)+)/gm, (match) => {
    const items = match
      .trim()
      .split("\n")
      .map((item) => item.replace(/^\s*\d+\.\s+/, "").trim())
      .filter((item) => item.length > 0)
      .map((item) => `<li>${item}</li>`)
      .join("");
    return `<ol>${items}</ol>`;
  });

  // Line breaks - convert newlines to <br>, but handle spacing intelligently
  html = html.replace(/\n\n+/g, "<br><br>"); // Double newlines = paragraph spacing
  html = html.replace(/\n/g, "<br>"); // Single newlines = line break

  // Remove excessive breaks after lists (lists already have natural spacing)
  html = html.replace(/(<\/ul>)<br>/g, "$1"); // Remove break after unordered list
  html = html.replace(/(<\/ol>)<br>/g, "$1"); // Remove break after ordered list

  // Clean up excessive breaks (more than 3 consecutive)
  html = html.replace(/(<br>){4,}/g, "<br><br>");

  return html;
}
