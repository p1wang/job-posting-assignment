const jobTypeTable = {
  "Full Time": 1,
  "Part Time": 2,
  Contract: 3,
  Permanent: 4,
  Seasonal: 5,
  Temporary: 6,
};

export const jobTypeMapper = (item) => jobTypeTable[item];

const jobCategoryTable = {
  Training: 1,
  "Business Development": 2,
  "Product Management": 3,
  Support: 4,
  Marketing: 5,
  "Human Resources": 6,
  Sales: 7,
  Legal: 8,
  Services: 9,
  Engineering: 10,
  "Research and Development": 11,
  Accounting: 12,
};

export const jobCategoryMapper = (item) => jobCategoryTable[item];

const industryTable = {
  "Consumer Services": 1,
  Miscellaneous: 2,
  "Health Care": 3,
  "Public Utilities": 4,
  Finance: 5,
  "Consumer Durables": 6,
  "Capital Goods": 7,
  "Basic Industries": 8,
  "Consumer Non-Durables": 9,
  Technology: 10,
  Transportation: 11,
  Energy: 12,
};

export const industryMapper = (item) => industryTable[item];
