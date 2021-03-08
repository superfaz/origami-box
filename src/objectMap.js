export default function objectMap(obj, action = () => { }) {
  if (obj === undefined || obj === null) {
    return;
  }

  return Object.keys(obj).map((key, index) => { return action(obj[key], key, index, obj) });
}
