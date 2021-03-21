const newKeys = { top: "0", front: "1", back: "2", left: "3", right: "4" };

/**
 * Updates the 'face' field for texts and images.
 */
class Migration {
  check(data) {
    if (data === undefined) {
      return;
    }

    Object.keys(data).forEach((key) => {
      const element = data[key];
      if (element.face === undefined) {
        return;
      }

      if (newKeys[element.face] !== undefined) {
        element.face = newKeys[element.face];
      }
    });
  }

  up(template) {
    if (template.data !== undefined) {
      if (template.data.base !== undefined) {
        this.check(template.data.base.texts);
        this.check(template.data.base.images);
      }
      if (template.data.lid !== undefined) {
        this.check(template.data.lid.texts);
        this.check(template.data.lid.images);
      }
    }
  }
}

export default new Migration();
