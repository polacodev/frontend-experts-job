import Fuse from 'fuse.js';

export const buildArray = (list) => {
  return list.map((item) => ({
    _id: item._id,
    name: item.name,
    email: item.email,
    cellphone: item.cellphone,
    workarea: item.workarea,
    status: item.status,
    description: item.description,
    knowledge: item.knowledge,
  }));
};

export const fuse = (text, list) => {
  const options = {
    // isCaseSensitive: false,
    // includeScore: false,
    // includeMatches: true,
    // shouldSort: true,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    // threshold: 0.6,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    keys: ['name', 'email', 'workarea'],
  };
  const response = new Fuse(list, options);
  const pattern = text;
  return response.search(pattern);
};

export const stars = [
  { id: 'lvl-1' },
  { id: 'lvl-2' },
  { id: 'lvl-3' },
  { id: 'lvl-4' },
  { id: 'lvl-5' },
];
