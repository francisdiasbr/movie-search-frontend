// Review editors type single line breaks; the backend stores paragraphs
// separated by a blank line.
export default (text: string): string => text.replace(/\n/g, '\n\n').trim();
