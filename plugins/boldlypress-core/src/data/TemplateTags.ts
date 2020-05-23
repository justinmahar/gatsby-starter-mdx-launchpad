export class TemplateTags {
  constructor(public tags: { [key: string]: string }) {}

  public render(template: string, depth = 0): string {
    // If we've rerendered 10 or more times, there's probably a cyclical reference.
    // Return what we have which will likely contain the tag that's cyclical.
    // Also print an error.
    if (depth >= 10) {
      console.error('Warning: Cyclical reference detected in template "' + template + '"');
      return template;
    }

    // Replace template tags with their values.
    let foundMatch = false;
    Object.keys(this.tags).forEach((key: string) => {
      const tag = TemplateTags.createTag(key);
      const value = this.tags[key];
      if (template.indexOf(tag) >= 0) {
        foundMatch = true;
        template = template.replace(tag, value);
      }
    });

    // If we made a replacement, then there's a possibility another template tag was put in its place.
    // Re-render the template to replace those tags. We track the depth to prevent cyclical references.
    if (foundMatch) {
      template = this.render(template, depth + 1);
    }

    return template;
  }

  static createTag(tagName: string): string {
    return `{${tagName}}`;
  }
}
