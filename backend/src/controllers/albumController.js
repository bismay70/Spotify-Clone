import albumModel from '../models/albumModel.js'
import { uploadMedia } from '../utils/mediaUpload.js'

const addAlbum = async (req, res) => {
    try {
        const name = req.body.name;
        const desc = req.body.desc;
        const bgColor = req.body.bgColor;
        const imageFile = req.file;
        const imageUpload = await uploadMedia({ req, file: imageFile, resourceType: "image" });

        const albumData = {
            name,
            desc,
            bgColor,
            image: imageUpload.secure_url
        }

        const album = new albumModel(albumData);
        await album.save();

        res.json({ success: true, message: "Album Added" })

    } catch (error) {
        res.json({ success: false })
    }
}

const listAlbum = async (req, res) => {
    try {
        const allAlbums = await albumModel.find({});
        res.json({ success: true, albums: allAlbums });

    } catch (error) {
        res.json({ success: false });
    }
}

const removeAlbum = async (req, res) => {
    try {
        await albumModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Album removed" });
    } catch (error) {
        res.json({ success: false });
    }
}

export { addAlbum, listAlbum, removeAlbum }