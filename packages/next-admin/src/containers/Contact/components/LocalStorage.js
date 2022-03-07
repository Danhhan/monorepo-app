const CHECKED_KEY = 'checked_key';
const storeItem = carers => {
  localStorage.setItem(CHECKED_KEY, JSON.stringify(carers));
};
const removeDuplicate = (carers, items) => {
  const newItems = [];
  const newCarers = [...carers];
  items.forEach(item => {
    newCarers.forEach(carer => {
      if (carer?.id === item?.id) {
        newItems.push(item);
      }
    });
  });
  newItems.forEach(item => {
    newCarers.splice(item, 1);
  });
  return newCarers;
};
const handleDataItem = carers => {
  const items = getItem();
  let newCarersChecked = [];
  if (items && carers) {
    const newItems = removeDuplicate(carers, items);
    newCarersChecked = [...items, ...newItems];
  } else if (carers) {
    newCarersChecked = [...carers];
  }
  return newCarersChecked;
};
const getItem = () => {
  const ls = JSON.parse(localStorage.getItem(CHECKED_KEY));
  const carersChecked = ls
    ? Object.keys(ls).map(key => (Number(key), ls[key]))
    : [];
  return carersChecked;
};
const removeItem = carers => {
  const items = getItem();

  if (carers.length > 1) {
    const newItems = [];
    items.forEach(item => {
      carers.forEach(carer => {
        if (carer.id === item.id) {
          newItems.push(item);
        }
      });
    });
    newItems.forEach(item => {
      items.splice(item, 1);
    });
    storeItem(items);
  } else {
    const newItems = [];
    items.forEach(item => {
      carers.forEach(carer => {
        if (carer.id !== item.id) {
          newItems.push(item);
        }
      });
    });
    storeItem(newItems);
  }
};
const removeAllItem = () => {
  localStorage.removeItem(CHECKED_KEY);
};
export { storeItem, getItem, removeItem, handleDataItem, removeAllItem };
