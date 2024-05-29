/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-prototype-builtins */
const multipart = require('parse-multipart-data');

interface IbodyData {
    avatar: string,
    firstName: string,
    lastName: string,
    email: string,
    file: Buffer
}

const flattenObject = (ob) => {
    const toReturn = {};
    for (const i in ob) {
        if (!ob?.hasOwnProperty(i)) continue;
        if ((typeof ob[i]) == 'object' && ob[i] !== null && !Buffer.isBuffer(ob[i]) ) {
            const flatObject = flattenObject(ob[i]);
            for (const x in flatObject) {
                if (!flatObject?.hasOwnProperty(x)) continue;
                toReturn[x] = flatObject[x];
            }
        } else {
            toReturn[i] = ob[i];
        }
    }
    return toReturn;
};

const multiPartForm = async (request): Promise<IbodyData> => {
    const content = request?.headers['content-type']?.split(';')[0];
    if(content.trim() === 'multipart/form-data') {
        const boundary = request?.headers['content-type']?.split(';')[1]?.split('=')[1];
        const arrayBuffer = Buffer.from(request?.body, 'binary');
        const parts = multipart.parse(arrayBuffer, boundary);
        const vars = parts.map((item) => {
            let fieldName = null;
            let value = null;
            let newItem = "{";
            let json;
            if(item?.type?.match('octet|image')) {
                fieldName = item.name.toString('utf8');
                value = item.data;    
                newItem+='"'+fieldName+'": null';
                newItem+="}"
                json = JSON.parse(newItem);
                json.file = value;
            } else {
                fieldName = item.name.toString('utf8');
                value = item.data.toString('utf8');
                newItem+='"'+fieldName+'":"'+value+'"';
                newItem+="}"
                json = JSON.parse(newItem);
            }
            return json;
        });
        const flat = flattenObject(vars);
        const f: IbodyData = {
            avatar: flat['avatar'] || undefined,
            firstName: flat['firstName'] || undefined,
            lastName: flat['lastName'] || undefined,
            email: flat['email'] || undefined,
            file: flat['file'] || undefined
        };
        return f;
    }
};

export default multiPartForm
