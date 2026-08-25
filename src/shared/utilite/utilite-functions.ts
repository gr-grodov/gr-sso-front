export function blurActiveElement() {
  console.log(document.activeElement);
  
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
}