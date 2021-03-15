const parser = require('fast-xml-parser');
const axios = require('axios').default;
const fs = require('fs');
const { subjects } = require('./subjects');

console.log(subjects.length);
// const https = require('https')

(async () => {
    const main = {}
    // const arr = []
    // const term = await getObj('https://courses.illinois.edu/cisapp/explorer/catalog/2021/spring.xml')
    // console.log(obj['ns2:term'].subjects)
    // console.log(term['ns2:term'].subjects.subject)
    // term['ns2:term'].subjects.subject.forEach(async ({ text, href }, i) => {
    //     //         if (i == 1) {
    //     // const { ['ns2:subject']: { courses: { course } } } = await getObj(href)
    //     console.log(href)
    //     arr.push(href)
    //     //             course.forEach(async ({ href: coursehref }, i) => {
    //     //                 // if (i == 1) {
    //     //                     // console.log("here", coursehref)
    //     //                     const { ['ns2:course']: { id, description, creditHours, parents: { subject: { text } } } } = await getObj(coursehref)
    //     //                     // console.log(id)
    //     //                     const shortId = id.replace(/\s/g, '')
    //     //                     main[shortId] = {
    //     //                         description,
    //     //                         creditHours,
    //     //                         text
    //     //                     }
    //     //                     // console.log(main)
    //     //                     fs.writeFileSync('output.json', JSON.stringify(main));


    //     //                 // }
    //     //             })
    //     //             // console.log(field['ns2:subject'].courses.course)
    //     //         }

    //     // console.log(href)

    //     // console.log(arr)
    // });
    // console.log("HERERERE")

    const index = Number(process.argv[2]) ?? 0
    console.log(index, subjects[0])

    const { ['ns2:subject']: { courses: { course } } } = await getObj(subjects[index])



    course.forEach(async ({ href: coursehref }, i) => {
        console.log("here", coursehref)
        const { ['ns2:course']: { id, description, label, creditHours, parents: { subject: { text } } } } = await getObj(coursehref)
        console.log(id)
        const shortId = id.replace(/\s/g, '')
        main[shortId] = {
            description,
            creditHours,
            label,
            text
        }

        // console.log(main)
        fs.writeFileSync(`output${index}.json`, JSON.stringify(main));
    })

})();

async function getObj(link) {
    const resp = await axios.get(link)
    const options = {
        attributeNamePrefix: "",
        attrNodeName: false, //default is 'false'
        textNodeName: "text",
        ignoreAttributes: false,
        ignoreNameSpace: false,
        allowBooleanAttributes: false,
        parseNodeValue: true,
        parseAttributeValue: false,
        trimValues: true,
        cdataPositionChar: "\\c",
        parseTrueNumberOnly: false,
        arrayMode: false, //"strict"
    };
    const obj = parser.getTraversalObj(resp.data, options)
    const parsed = parser.convertToJson(obj, options)
    return parsed
}

