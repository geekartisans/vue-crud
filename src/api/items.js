export const all = async (cb) => {
  try {
    const response = await fetch('/static/items.json');
    const result = await response.json();
    cb(null, result);
  } catch (err) {
    cb(err);
  }
};

export default {
  all,
};
