var ctx = document.createElement("canvas").getContext("2d");

/**
 * Updates the 'color' fields for texts and images to use only #xxxxxx notation.
 *
 * Reason: the standard control, now used, doesn't support other format.
 */
class Migration {
  convertColor(colorString) {
    if (
      colorString === undefined ||
      colorString === null ||
      colorString === ""
    ) {
      return colorString;
    }

    ctx.fillStyle = colorString;
    return ctx.fillStyle;
  }

  convertBlock(block) {
    // Convert background color, if any
    if (block.background !== undefined) {
      block.background = this.convertColor(block.background);
    }

    if (block.texts !== undefined) {
      Object.keys(block.texts).forEach((key) => {
        const element = block.texts[key];
        if (element.color !== undefined) {
          element.color = this.convertColor(element.color);
        }
      });
    }
  }

  up(template) {
    if (template.data !== undefined) {
      if (template.data.base !== undefined) {
        this.convertBlock(template.data.base);
      }
      if (template.data.lid !== undefined) {
        this.convertBlock(template.data.lid);
      }
    }
  }
}

export default new Migration();
