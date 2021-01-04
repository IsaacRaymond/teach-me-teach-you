const {Storage} = require('@google-cloud/storage')

function googleDownload(fileName, res){
  const bucketName = 'tmty_images';
  const filename = fileName

  // const srcFilename = 'Remote file to download, e.g. file.txt';
  // const destFilename = 'Local destination for file, e.g. ./local/path/to/file.txt';

  // Creates a client
  const storage = new Storage();

  async function downloadFile() {
    const options = {
      // The path to which the file should be downloaded, e.g. "./file.txt"
      destination: destFilename,
    };

    // Downloads the file
    await storage.bucket(bucketName).file(srcFilename).download(options);

    console.log(
      `gs://${bucketName}/${srcFilename} downloaded to ${destFilename}.`
    )
  }

  downloadFile().catch(console.error)
}

module.exports = googleDownload
