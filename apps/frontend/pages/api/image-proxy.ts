import { fileTypeFromBuffer } from "file-type";
import RollbarService from "../../services/rollbar";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    try {
        const url = req.query.url;
        return fetch(url).then(async (result) => {
            const body = await result.arrayBuffer();
            const buff = Buffer.from(body);
            const fileType = await fileTypeFromBuffer(buff);
            res.setHeader('Content-type', fileType.mime)
            return res.send(buff);
        });
    } catch (err) {
        RollbarService.error(`Issue when image-proxy get ${err?.message}, stack: ${err?.stack}`, req);
    }
};