let server = require('../server');

describe("getFileName", function() {
    const request_slash = '/';
    const request_norm_url = '/public/css/items.css';

    it("Should return ./public/index.html", function(){
        let filename = server.getFileName(request_slash);
        expect(filename).toBe('./public/index.html');
    });

    it("Should return ./css/items.css", function () {
        let filename = server.getFileName(request_norm_url);
        expect(filename).toBe('./public/css/items.css');
    });
});

describe("FileServer", function () {
    const real_file = '/public/index.html';
    const fake_file = 'FAKE_FILE_NAME';

    it("Should return a file when asked for one that exists", function () {
        let file = "";
        server.getFile(real_file).then(f => {
                expect(f).not.toBeNull("no return file received");
            }
        )
    });
    //expect a rejection from the promise
    it("Should return an error when the file isn't found", async function () {
        try {
            await server.getFile(fake_file);
        } catch (err) {
            return;
        }
        throw new Error('Promise should have returned error');
    })
});