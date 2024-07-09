const path = require('path');
const fs = require('fs');

const share = (req, res, next) => {
    const script_ = req.params.script_;
    const selected = path.join(__dirname, '../client/shared', `${script_}.js`);

    if (fs.existsSync(selected))
        fs.readFile(selected, 'utf-8', (err, data) => {
            if (err)
                next({ status: 500, message: { status: 500, message: "This script doesn't exists" }});
            else
                res.status(200).sendFile(selected);
        })
    else
        next({ status: 401, message: { status: 401, message: "This script doesn't exists" }});
}

module.exports = {
    share
};