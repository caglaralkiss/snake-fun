/**
 * Create a document from given template.
 *
 * @param template HTML template
 */
export function render(template: string): Document {
    const parser = new DOMParser();

    return parser.parseFromString(template, 'text/html');
}
