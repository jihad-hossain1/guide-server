function modText(text) {
  return text.toLowerCase().trim();
}

async function modSlug(text, Model) {
  const findText = await Model.findOne({ name: modText(text) });
  const modify = text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");

  return findText ? `${modify}-${Math.floor(Math.random() * 100)}` : modify;
}

module.exports = { modSlug, modText };
