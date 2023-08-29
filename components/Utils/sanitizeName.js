import { transliterate as slugify } from "transliteration";
const sanitize = require("sanitize-filename");

const sanitizeName = name => {
  const sanitizedName = sanitize(slugify(name))
    .replace(/\s+/g, "_")
    .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "");

  return sanitizedName || "";
};

export default sanitizeName;
