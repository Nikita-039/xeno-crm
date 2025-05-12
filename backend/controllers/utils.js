export const buildMongoQuery = (rules) => {
  const andConditions = [];
  const orConditions = [];

  rules.forEach(rule => {
    const condition = {};
    const field = rule.field;

    const value = field === 'lastActive'
      ? new Date(Date.now() - parseInt(rule.value) * 24 * 60 * 60 * 1000) 
      : Number(rule.value);

    switch (rule.operator) {
      case '>': condition[field] = { $gt: value }; break;
      case '<': condition[field] = { $lt: value }; break;
      case '=': condition[field] = value; break;
    }

    if (rule.logic === 'OR') {
      orConditions.push(condition);
    } else {
      andConditions.push(condition);
    }
  });

  if (orConditions.length && andConditions.length) {
    return { $and: [{ $or: orConditions }, ...andConditions] };
  } else if (orConditions.length) {
    return { $or: orConditions };
  } else if (andConditions.length) {
    return { $and: andConditions };
  } else {
    return {};
  }
};
