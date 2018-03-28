export const nextDragItemSelector = (list) => list.find(dragitem => dragitem.dropzone === null);
export const tenantsSelector = (list, dropzone) => list.filter(dragitem => dragitem.dropzone === dropzone);
export const dragItemSelector = (list, id) => list.find(dragitem => dragitem.label === id);
export const dragItemIndexSelector = (list, id) => list.findIndex(dragitem => dragitem.label === id);

