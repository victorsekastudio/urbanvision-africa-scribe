
export const truncateHtmlContent = (html: string, percentage: number = 0.4): string => {
  if (!html) return '';
  
  // Create a temporary DOM element to parse HTML safely
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  
  // Get text content length for calculation
  const textContent = tempDiv.textContent || tempDiv.innerText || '';
  const targetLength = Math.floor(textContent.length * percentage);
  
  if (textContent.length <= targetLength) {
    return html; // Return original if already short enough
  }
  
  // Find a good break point in the text content
  let breakPoint = targetLength;
  for (let i = targetLength; i < Math.min(targetLength + 200, textContent.length); i++) {
    if (textContent[i] === '.' && textContent[i + 1] === ' ') {
      breakPoint = i + 1;
      break;
    }
  }
  
  // Walk through the DOM and truncate at the text break point
  let currentLength = 0;
  const truncatedDiv = document.createElement('div');
  
  const walkNodes = (sourceNode: Node, targetNode: Node): boolean => {
    for (const child of Array.from(sourceNode.childNodes)) {
      if (currentLength >= breakPoint) {
        return false; // Stop processing
      }
      
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.textContent || '';
        const remainingLength = breakPoint - currentLength;
        
        if (text.length <= remainingLength) {
          // Add entire text node
          targetNode.appendChild(child.cloneNode(true));
          currentLength += text.length;
        } else {
          // Truncate text node
          const truncatedText = text.substring(0, remainingLength);
          const textNode = document.createTextNode(truncatedText);
          targetNode.appendChild(textNode);
          currentLength += truncatedText.length;
          return false; // Stop processing
        }
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        // Clone element and process its children
        const clonedElement = child.cloneNode(false) as Element;
        targetNode.appendChild(clonedElement);
        
        if (!walkNodes(child, clonedElement)) {
          return false; // Stop processing
        }
      }
    }
    return true;
  };
  
  walkNodes(tempDiv, truncatedDiv);
  return truncatedDiv.innerHTML;
};
