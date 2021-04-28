const parser = require('fast-xml-parser');
const axios = require('axios').default;
const fs = require('fs');
const { subjects } = require('./subjects');

(async () => {
  const main = {};

  const index = Number(process.argv[2]) ?? 0;

  const {
    ['ns2:subject']: {
      courses: { course },
    },
  } = await getObj(subjects[index]);

  course.forEach(async ({ href: coursehref }, i) => {
    const {
      ['ns2:course']: {
        id,
        description,
        label,
        creditHours,
        parents: {
          subject: { text },
        },
      },
    } = await getObj(coursehref);
    const shortId = id.replace(/\s/g, '');
    main[shortId] = {
      description,
      creditHours,
      label,
      text,
    };

    fs.writeFileSync(`output${index}.json`, JSON.stringify(main));
  });
})();

async function getObj(link) {
  const resp = await axios.get(link);
  const options = {
    attributeNamePrefix: '',
    attrNodeName: false, //default is 'false'
    textNodeName: 'text',
    ignoreAttributes: false,
    ignoreNameSpace: false,
    allowBooleanAttributes: false,
    parseNodeValue: true,
    parseAttributeValue: false,
    trimValues: true,
    cdataPositionChar: '\\c',
    parseTrueNumberOnly: false,
    arrayMode: false, //"strict"
  };
  const obj = parser.getTraversalObj(resp.data, options);
  const parsed = parser.convertToJson(obj, options);
  return parsed;
}
