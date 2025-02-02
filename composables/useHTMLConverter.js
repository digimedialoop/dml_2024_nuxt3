// composables/useHtmlConverter.js
export function useHtmlConverter() {
  // Methode für die HTML-Konvertierung
  const convertToHTML = (data, prepend) => {
    let html = "";
    let firstParagraph = true;

    if (Array.isArray(data)) {
      data.forEach((item) => {
        switch (item.type) {
          case "heading":
            if (item.children && item.children[0] && item.children[0].text) {
              html += `<h${item.level} role="heading" aria-level="${item.level}">`;

              item.children.forEach((c) => {
                if (c.bold) {
                  html += `<b>${c.text}</b>`;
                } else if (c.underline) {
                  html += `<u>${c.text}</u>`;
                } else if (c.italic) {
                  html += `<i>${c.text}</i>`;
                } else {
                  html += `${c.text}`;
                }
              });
              html += `</h${item.level}>`;
            }
            break;
          case "paragraph":
            if (item.children && item.children[0] && item.children[0].text) {
              html += `<p>`;
              if (firstParagraph && prepend !== undefined) {
                html += `<b>${prepend}</b>`;
                firstParagraph = false;
              }
              item.children.forEach((c) => {
                if (c.type === "text") {
                  if (c.bold) {
                    html += `<b>${c.text}</b>`;
                  } else if (c.underline) {
                    html += `<u>${c.text}</u>`;
                  } else if (c.italic) {
                    html += `<i>${c.text}</i>`;
                  } else {
                    html += `${c.text}`;
                  }
                } else if (c.type === "link") {
                  html += `<a href="${c.url}">${c.children[0].text}</a>`;
                }
              });
              html += `</p>`;
            }
            break;
          case "list":
            if (Array.isArray(item.children)) {
              let op = "ul";
              if (item.format === "ordered") {
                op = "ol";
              }
              html += `<${op}>`;
              item.children.forEach((listItem) => {
                if (
                  listItem.children &&
                  listItem.children[0] &&
                  listItem.children[0].text
                ) {
                  html += `<li><span>`;
                  listItem.children.forEach((c) => {
                    if (c.bold) {
                      html += `<b>${c.text}</b>`;
                    } else if (c.underline) {
                      html += `<u>${c.text}</u>`;
                    } else if (c.italic) {
                      html += `<i>${c.text}</i>`;
                    } else {
                      html += `${c.text}`;
                    }
                  });
                  html += `</span></li>`;
                }
              });
              html += `</${op}>`;
            }
            break;
          default:
            break;
        }
      });
    }

    return html;
  };

  // Neue Funktion: Extrahiert reinen Text aus den Strapi Rich Text-Daten
  const convertToText = (data) => {
    let text = "";
    if (Array.isArray(data)) {
      data.forEach((item) => {
        if (item.children && Array.isArray(item.children)) {
          item.children.forEach((child) => {
            if (child.text) {
              text += child.text + " ";
            }
          });
        }
      });
    }
    return text.trim();
  };

  return { convertToHTML, convertToText };
}
